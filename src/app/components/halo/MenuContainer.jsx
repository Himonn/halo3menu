import Menu from "@/app/components/halo/Menu";
import Lobby from "@/app/components/halo/Lobby";
import React, { useEffect, useState } from "react";
import { YButton, StartButton, AButton, BButton, XButton } from "@/app/components/halo/XboxIcons";

const MENU_DATA = {
    main: {
        items: ['start solo game', 'campaign', 'matchmaking', 'custom games', 'forge', 'theater'],
        links: {
            0: 'campaign', // Start Solo Game -> Campaign Lobby for now
            1: 'campaign',
            2: 'matchmaking', // Dynamic background trigger
            3: 'custom_games',
            4: 'forge',
            5: 'theater'
        }
    },
    campaign: {
        type: 'lobby',
        props: {
            title: "CAMPAIGN LOBBY",
            subtitle: "SWITCH LOBBY",
            variant: "custom",
            network: "XBOX LIVE (FRIENDS ONLY)",
            gameType: "CAMPAIGN",
            difficulty: "NORMAL",
            mapName: "SIERRA 117",
            options: [
                { label: "START GAME" },
                { label: "CAMPAIGN LOBBY", icon: XButton }
            ]
        }
    },
    matchmaking: { // Special handling via isLobby check mostly for background
        type: 'lobby',
        props: {
            title: "MATCHMAKING LOBBY",
            subtitle: "SWITCH LOBBY",
            variant: "matchmaking",
            network: "XBOX LIVE (FRIENDS ONLY)",
            playlist: "SOCIAL SLAYER",
            options: [
                { label: "START MATCHMAKING" },
                { label: "Edit Matchmaking Options", icon: XButton }
            ]
        }
    },
    custom_games: {
        type: 'lobby',
        props: {
            title: "CUSTOM GAMES LOBBY",
            subtitle: "SWITCH LOBBY",
            variant: "custom",
            network: "XBOX LIVE (FRIENDS ONLY)",
            gameType: "VIP",
            mapName: "VALHALLA",
            options: [
                { label: "START GAME" },
                { label: "GAME OPTIONS", icon: XButton }
            ]
        }
    },
    forge: {
        type: 'lobby',
        props: {
            title: "FORGE LOBBY",
            subtitle: "SWITCH LOBBY",
            variant: "custom",
            network: "XBOX LIVE (FRIENDS ONLY)",
            gameType: "FORGE",
            mapName: "SANDTRAP",
            options: [
                { label: "START FORGE" },
                { label: "FORGE OPTIONS", icon: XButton }
            ]
        }
    },
    theater: {
        type: 'lobby',
        props: {
            title: "THEATER LOBBY",
            subtitle: "SWITCH LOBBY",
            variant: "custom",
            network: "LOCAL",
            gameType: "FILM",
            mapName: "THE ARK",
            options: [
                { label: "START FILM" },
                { label: "THEATER OPTIONS", icon: XButton }
            ]
        }
    },
    // Submenus - currently unreachable if links point directly to lobby, but kept for reference
    mission_select: {
        items: ['sierra 117', 'crow\'s nest', 'tsavo highway', 'the storm', 'floodgate', 'the ark', 'the covenant', 'cortana', 'halo'],
        links: {}
    },
    difficulty: {
        items: ['easy', 'normal', 'heroic', 'legendary'],
        links: {}
    }
};

const MenuContainer = ({ setBackgroundIndex }) => {
    const [isSmallViewport, setIsSmallViewport] = useState(false);
    const [menuStack, setMenuStack] = useState(['main']);
    const [playerName, setPlayerName] = useState('Master Chief');
    const [playerColor, setPlayerColor] = useState('#78866b');

    const currentMenuKey = menuStack[menuStack.length - 1];
    const currentMenu = MENU_DATA[currentMenuKey] || MENU_DATA['main'];
    const isLobby = currentMenu.type === 'lobby';

    const handleUpdatePlayer = (name, color) => {
        setPlayerName(name);
        setPlayerColor(color);
    };

    const handleSwitchLobby = (lobbyKey) => {
        setMenuStack(prev => {
            // Replace the current lobby with the new one
            const newStack = [...prev];
            newStack[newStack.length - 1] = lobbyKey;
            return newStack;
        });
    };

    // Effect to switch background when entering/leaving lobby
    useEffect(() => {
        if (setBackgroundIndex) {
            if (isLobby) {
                setBackgroundIndex(5); // Index of mp_bg.mp4
            } else {
                setBackgroundIndex(0); // Default background (e.g. bg_0_hd.mp4)
            }
        }
    }, [isLobby, setBackgroundIndex]);

    useEffect(() => {
        function handleResize() {
            setIsSmallViewport(window.innerWidth < 768);
        }

        function handleKeyDown(event) {
            if (event.key === 'Backspace' || event.key === 'Escape') {
                if (isLobby) {
                    // Start/Back buttons in lobby usually handle this, but global back support:
                    setMenuStack(prev => {
                        if (prev.length > 1) {
                            return prev.slice(0, -1);
                        }
                        return prev;
                    });
                } else {
                    setMenuStack(prev => {
                        if (prev.length > 1) {
                            return prev.slice(0, -1);
                        }
                        return prev;
                    });
                }
            }
        }

        window.addEventListener('resize', handleResize);
        document.addEventListener('keydown', handleKeyDown);

        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isLobby]);

    const handleSelect = (index) => {
        const nextMenuKey = currentMenu.links && currentMenu.links[index];
        if (nextMenuKey && MENU_DATA[nextMenuKey]) {
            setMenuStack(prev => [...prev, nextMenuKey]);
        }
    };

    const handleBack = () => {
        setMenuStack(prev => {
            if (prev.length > 1) {
                return prev.slice(0, -1);
            }
            return prev;
        });
    };

    const containerStyle = isLobby
        ? "absolute top-0 left-0 w-full h-full bg-black/40 pt-20" // Full screen overlay for lobby
        : (isSmallViewport
            ? "absolute bottom-0 w-full min-w-[350px] bg-opacity-50 bg-[#050b1b] pt-1 pb-1"
            : "absolute bottom-0 left-40 min-w-[350px] bg-opacity-50 bg-[#050b1b] pt-1 pb-1");

    return (
        <div className={containerStyle}>
            {isLobby ? (
                <div className="flex flex-col h-full justify-between">
                    <Lobby
                        playerName={playerName}
                        playerColor={playerColor}
                        onUpdatePlayer={handleUpdatePlayer}
                        onBack={handleBack}
                        onSwitchLobby={handleSwitchLobby}
                        {...currentMenu.props}
                    />
                    {/* Lobby Footer */}
                    <div className="w-full bg-[#050b1b]/90 border-t border-white/30 pt-1 pb-1">
                        <div className={`pl-8 flex flex-row items-center text-white gap-6 w-full`}>
                            <div className="flex flex-row items-center gap-2">
                                <StartButton className="w-6 h-6" />
                                <span className="font-bold">Settings</span>
                            </div>
                            <div className="flex flex-row items-center gap-2">
                                <AButton className="w-6 h-6" />
                                <span className="font-bold">Select</span>
                            </div>
                            <div className="flex flex-row items-center gap-2">
                                <BButton className="w-6 h-6" />
                                <span className="font-bold">Leave</span>
                            </div>
                            <div className="flex flex-row items-center gap-2">
                                <YButton className="w-6 h-6" />
                                <span className="font-bold">Friends</span>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    <Menu items={currentMenu.items} onSelect={handleSelect} />
                    <ul>
                        <li className={`mt-1 border-b-[1px] border-white border-opacity-30`} key={'gap2'} style={{ height: '1px' }}></li>
                        <div className={`pl-2 flex flex-row items-center pt-1 pb-1 text-white gap-4 w-full`}>
                            <div className="flex flex-row items-center gap-2">
                                <StartButton className="w-6 h-6" />
                                <span className="font-bold">SETTINGS</span>
                            </div>
                            <div className="flex flex-row items-center gap-2">
                                <YButton className="w-6 h-6" />
                                <span className="font-bold">FRIENDS</span>
                            </div>
                        </div>
                        <li className={`mt-1 border-b-[1px] border-white mb-10 border-opacity-30`} key={'gap3'} style={{ height: '1px' }}></li>
                    </ul>
                </>
            )}
        </div>
    );
};

export default MenuContainer;

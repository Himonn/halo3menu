import React, { useState, useEffect } from 'react';
import { XButton, AButton, BButton, StartButton, SpeakerIcon, ConnectionIcon, RankIcon } from './XboxIcons';
import PlayerSettings from './PlayerSettings';
import NetworkSelector from './NetworkSelector';

const BaseLobby = ({
    title,
    subtitle = "SWITCH LOBBY",
    menuItems = [],
    children,
    roster = [],
    playerName,
    playerColor,
    onUpdatePlayer,
    onSwitchLobby,
    currentNetwork = "XBOX LIVE (FRIENDS ONLY)",
    onNetworkChange,
    variant = "custom", // 'matchmaking' | 'custom'
    defaultIndex = 0,
    isModalOpen = false
}) => {
    // Default Roster Logic
    const defaultRoster = [
        { name: playerName || 'Player', color: playerColor || '#768087', isLocal: true, status: 'Leader', serviceTag: 'S-117', rank: 43, voice: true, connection: 4 },
        { name: 'SlayerPro', color: '#993333', isLocal: false, status: 'Member', serviceTag: 'A-052', rank: 35, voice: false, connection: 3 },
        { name: 'NoobMaster', color: '#336699', isLocal: false, status: 'Member', serviceTag: 'B-312', rank: 12, voice: false, connection: 4 },
        { name: 'CortanaFan', color: '#993399', isLocal: false, status: 'Member', serviceTag: 'C-009', rank: 50, voice: false, connection: 2 },
    ];

    const activeRoster = roster && roster.length > 0 ? roster : defaultRoster;

    // Navigation State
    const [navRegion, setNavRegion] = useState('left'); // 'left', 'right'
    const [leftIndex, setLeftIndex] = useState(defaultIndex);
    const [rightIndex, setRightIndex] = useState(0);

    // Common Modals State
    const [showSettings, setShowSettings] = useState(false);
    const [showLobbySwitcher, setShowLobbySwitcher] = useState(false);

    // Network State
    const [showNetworkSelector, setShowNetworkSelector] = useState(false);
    const NETWORK_OPTIONS = [
        'LOCAL',
        'SYSTEM LINK',
        'XBOX LIVE (FRIENDS ONLY)',
        'XBOX LIVE (OPEN PARTY)'
    ];
    const [networkIndex, setNetworkIndex] = useState(2);

    // Lobby Switcher Data
    const LOBBY_OPTIONS = [
        { label: 'Campaign', key: 'campaign', description: "Take your party directly to Campaign to defeat the Covenant, save the galaxy, and finish the fight!" },
        { label: 'Matchmaking', key: 'matchmaking', description: "Take your party to Xbox LIVE and into the frenetic action of live combat, objective-based missions, and dangerous military exercises." },
        { label: 'Custom Games', key: 'custom_games', description: "Take your party to combat and objective-based missions that you select and design. Your rules, your maps, your game." },
        { label: 'Forge', key: 'forge', description: "Take your party to collaborate in real time to edit and play variations of your favorite maps, from the subtle to the insane." },
        { label: 'Theater', key: 'theater', description: "Take your party to view and replay films and footage of your Halo 3 exploits, from Campaign, to Multiplayer, to Forge Mode." }
    ];
    const [switcherIndex, setSwitcherIndex] = useState(0);

    // Handle Keyboard Navigation
    useEffect(() => {
        if (showSettings || isModalOpen || showNetworkSelector) return;

        function handleKeyDown(event) {
            // Priority 2: Lobby Switcher
            if (showLobbySwitcher) {
                event.stopPropagation();
                if (event.key === 'ArrowUp') setSwitcherIndex(p => Math.max(0, p - 1));
                else if (event.key === 'ArrowDown') setSwitcherIndex(p => Math.min(LOBBY_OPTIONS.length - 1, p + 1));
                else if (event.key === 'Enter' || event.key === 'a') {
                    if (onSwitchLobby) onSwitchLobby(LOBBY_OPTIONS[switcherIndex].key);
                    setShowLobbySwitcher(false);
                } else if (event.key === 'Escape' || event.key === 'b') {
                    setShowLobbySwitcher(false);
                }
                return;
            }

            // Priority 3: Main Navigation
            // Check if a child modal (passed via children) is active? 
            // The parent component should handle capturing input if its specific modal is open.
            // But we can't easily know here. We rely on the parent to stopPropagation if it's handling input.

            if (event.key === 'ArrowUp') {
                if (navRegion === 'left') setLeftIndex(p => Math.max(0, p - 1));
                else setRightIndex(p => Math.max(0, p - 1));
            } else if (event.key === 'ArrowDown') {
                if (navRegion === 'left') setLeftIndex(p => Math.min(menuItems.length - 1, p + 1));
                else setRightIndex(p => Math.min(roster.length - 1, p + 1));
            } else if (event.key === 'ArrowRight') {
                if (navRegion === 'left') setNavRegion('right');
            } else if (event.key === 'ArrowLeft') {
                if (navRegion === 'right') setNavRegion('left');
            } else if (event.key === 'Enter' || event.key === 'a') {
                handleSelection();
            }
        }

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [navRegion, leftIndex, rightIndex, showSettings, isModalOpen, showLobbySwitcher, showNetworkSelector, switcherIndex, networkIndex, menuItems, roster, onSwitchLobby, onNetworkChange]);


    const handleSelection = () => {
        if (navRegion === 'right') {
            const selectedPlayer = roster[rightIndex];
            if (selectedPlayer && selectedPlayer.isLocal) {
                setShowSettings(true);
            }
        } else {
            // Left column selection
            const item = menuItems[leftIndex];
            if (item) {
                if (item.action === 'switch_lobby') {
                    setShowLobbySwitcher(true);
                } else if (item.action === 'network') {
                    setShowNetworkSelector(true);
                } else if (item.onClick) {
                    item.onClick();
                }
            }
        }
    };


    return (
        <div className="flex flex-row w-full h-full text-white font-halo-regular">
            {/* Left Column */}
            <div className="flex flex-col w-[60%] pl-8 pt-4 bg-gradient-to-r from-black via-black/90 to-transparent">
                <h1 className="text-4xl font-halo-regular tracking-wider mb-1 uppercase text-white">{title}</h1>

                {/* Menu Items */}
                <div className="text-[#8db6ef] text-lg uppercase leading-tight mb-8 font-bold flex flex-col items-start w-full">

                    {/* Render standard menu items */}
                    {menuItems.map((item, idx) => {
                        const isSelected = navRegion === 'left' && leftIndex === idx;

                        // Special styling for Switch Lobby (header-like) or Network
                        if (item.type === 'header_action') {
                            return (
                                <div
                                    key={idx}
                                    className={`cursor-pointer w-full flex items-center relative mb-1 
                                        ${isSelected || showLobbySwitcher ? 'bg-orange-500 text-white opacity-100' : 'opacity-80'}
                                        ${showLobbySwitcher && item.action === 'switch_lobby' ? 'z-50' : 'z-20'}
                                    `}
                                    onClick={() => {
                                        setNavRegion('left');
                                        setLeftIndex(idx);
                                        if (item.action === 'switch_lobby') setShowLobbySwitcher(true);
                                    }}
                                >
                                    <span className="px-1">{item.label}</span>
                                    {/* Lobby Switcher Flyout */}
                                    {showLobbySwitcher && item.action === 'switch_lobby' && (
                                        <div className="absolute left-[280px] top-[-10px] flex flex-row shadow-2xl z-50">
                                            <div className="flex flex-col bg-black/90 border border-white/20 min-w-[200px]">
                                                {LOBBY_OPTIONS.map((opt, optIdx) => (
                                                    <div
                                                        key={opt.key}
                                                        className={`px-3 py-1 text-lg flex items-center cursor-pointer uppercase font-bold tracking-wide
                                                            ${optIdx === switcherIndex ? 'bg-orange-500 text-white' : 'text-[#8db6ef] hover:bg-white/5'}
                                                        `}
                                                        onMouseEnter={() => setSwitcherIndex(optIdx)}
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            if (onSwitchLobby) onSwitchLobby(opt.key);
                                                            setShowLobbySwitcher(false);
                                                        }}
                                                    >
                                                        {opt.label}
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="w-[300px] bg-[#050b1b]/95 border-t border-b border-r border-white/20 p-3 text-white normal-case text-base font-normal leading-tight h-auto flex items-center">
                                                {LOBBY_OPTIONS[switcherIndex].description}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        }

                        // Standard Items (Network, Game, Map, etc.)
                        return (
                            <div
                                key={idx}
                                className={`cursor-pointer opacity-80 flex flex-row items-center w-full min-w-[300px] mb-0.5
                                    ${isSelected ? 'bg-[#d97d48] text-white opacity-100' : ''}
                                `}
                                onClick={() => {
                                    setNavRegion('left');
                                    setLeftIndex(idx);
                                    handleSelection(); // or let double click trigger? standard usually single click updates selection/context
                                    if (item.action === 'network') setShowNetworkSelector(true);
                                    else if (item.onClick) item.onClick();
                                }}
                            >
                                <div className={`pl-2 ${isSelected ? 'font-bold tracking-wide' : ''}`}>
                                    {item.action === 'network' ? `NETWORK: ${currentNetwork}` : item.label}
                                </div>
                            </div>
                        );
                    })}

                    {/* Separator if needed, usually managed by layout */}
                    <div className="h-4"></div>
                </div>

                {/* Status / Variant Info */}
                <div className="mb-6 text-[#8db6ef]">
                    {variant === 'matchmaking' ? (
                        <p className="text-lg">Ready</p>
                    ) : (
                        <p className="text-lg">Custom games are currently disabled. Switch the mode to Matchmaking.</p>
                    )}
                    <p className="text-lg">This party is open to friends.</p>
                </div>

                {/* Render Children (Preview Areas, etc.) */}
                {children}

                {/* Online Count */}
                <div className="mt-auto mb-2 text-[#8db6ef]">
                    <p className="text-lg">1328 Gamers Online</p>
                </div>

            </div>

            {/* Right Column: Player Roster */}
            <div className="flex flex-col w-[40%] pr-8 pt-8">
                <div className="text-right text-[#8db6ef] text-lg mb-1">{activeRoster.length} Players (16 max)</div>
                <div className="bg-[#050b1b]/80 border-t border-b border-white/30">
                    {activeRoster.map((player, idx) => {
                        const isSelected = navRegion === 'right' && rightIndex === idx;
                        const rowStyle = {
                            backgroundColor: player.color,
                            backgroundImage: isSelected
                                ? `linear-gradient(to right, rgba(255,255,255,0.2), rgba(255,255,255,0.0))`
                                : `linear-gradient(to right, rgba(0,0,0,0.4), rgba(0,0,0,0.7))`
                        };
                        return (
                            <div key={idx} className={`flex flex-row items-center h-12 px-2 transition-all cursor-pointer border-t border-b border-white/10 ${isSelected ? 'border-white/50 brightness-110' : 'brightness-75'}`} style={rowStyle}>
                                <div className="w-6 flex justify-center"><SpeakerIcon className="w-4 h-4" active={player.voice} /></div>
                                <div className="w-10 flex justify-center"><div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center shadow-lg bg-black/40"><div className="w-4 h-4 rounded-full bg-white/20"></div></div></div>
                                <div className="flex flex-col flex-1 pl-2">
                                    <span className="text-white text-lg font-bold leading-none tracking-wide drop-shadow-md shadow-black">{player.name}</span>
                                    <span className="text-white/80 text-xs font-bold tracking-wider uppercase drop-shadow-md">{player.serviceTag}</span>
                                </div>
                                <div className="w-8 flex justify-center"><RankIcon className="w-6 h-6" rank={player.rank} /></div>
                                <div className="w-6 flex justify-center"><ConnectionIcon className="w-4 h-4" quality={player.connection} /></div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Overlays */}
            {showSettings && (
                <PlayerSettings
                    currentPlayerName={playerName}
                    currentPlayerColor={playerColor}
                    onSave={(n, c) => { onUpdatePlayer(n, c); setShowSettings(false); }}
                    onCancel={() => setShowSettings(false)}
                />
            )}

            {showLobbySwitcher && <div className="fixed inset-0 bg-black/20 backdrop-blur-md z-40" onClick={() => setShowLobbySwitcher(false)} />}

            {showNetworkSelector && (
                <NetworkSelector
                    currentNetwork={currentNetwork}
                    onSelect={(n) => {
                        if (onNetworkChange) onNetworkChange(n);
                        setShowNetworkSelector(false);
                    }}
                    onBack={() => setShowNetworkSelector(false)}
                />
            )}
        </div>
    );
};

export default BaseLobby;

import React, { useState, useEffect } from 'react';
import { XButton, AButton, BButton, YButton, SpeakerIcon, ConnectionIcon, RankIcon } from './XboxIcons';
import WorldMap from './WorldMap';
import PlayerSettings from './PlayerSettings';
import MapSelector from './MapSelector';
import NetworkSelector from './NetworkSelector';
import MissionSelector from './MissionSelector';

const Lobby = ({
    playerName,
    playerColor,
    onUpdatePlayer,
    onBack,
    onSwitchLobby,
    title = "MATCHMAKING LOBBY",
    subtitle = "SWITCH LOBBY",
    variant = "matchmaking", // 'matchmaking' | 'custom'
    network = "XBOX LIVE (FRIENDS ONLY)",
    playlist = "SOCIAL SLAYER",
    gameType = "VIP",
    mapName = "VALHALLA",
    difficulty, // Difficulty prop (optional, mostly for Campaign)
    options = [
        { label: "START MATCHMAKING" },
        { label: "Edit Matchmaking Options", icon: XButton }
    ]
}) => {
    // Navigation State
    // navRegion: 'left' (Header + Options) or 'right' (Roster)
    const [navRegion, setNavRegion] = useState('left');

    const isCampaign = gameType === 'CAMPAIGN' || title.includes('CAMPAIGN');

    // Header Items Count Logic:
    // Matchmaking: 3 (Subtitle, Network, Playlist)
    // Custom: 4 (Subtitle, Network, Game, Map)
    // Campaign: 5 (Subtitle, Network, Game, Difficulty, Map)
    let HEADER_ITEMS_COUNT = 3;
    if (variant === 'custom') {
        HEADER_ITEMS_COUNT = isCampaign ? 5 : 4;
    }
    const LEFT_COLUMN_TOTAL = HEADER_ITEMS_COUNT + options.length;

    // Difficulty State
    const [currentDifficulty, setCurrentDifficulty] = useState(difficulty || "NORMAL");
    const [showDifficultySelector, setShowDifficultySelector] = useState(false);
    const DIFFICULTY_OPTIONS = ['EASY', 'NORMAL', 'HEROIC', 'LEGENDARY'];
    const [difficultyIndex, setDifficultyIndex] = useState(
        DIFFICULTY_OPTIONS.includes(difficulty) ? DIFFICULTY_OPTIONS.indexOf(difficulty) : 1
    );

    // Network State
    const [currentNetwork, setCurrentNetwork] = useState(network || "XBOX LIVE (FRIENDS ONLY)");
    const [showNetworkSelector, setShowNetworkSelector] = useState(false);
    const NETWORK_OPTIONS = [
        'LOCAL',
        'SYSTEM LINK',
        'XBOX LIVE (FRIENDS ONLY)',
        'XBOX LIVE (OPEN PARTY)'
    ];

    const [networkIndex, setNetworkIndex] = useState(
        NETWORK_OPTIONS.includes(currentNetwork) ? NETWORK_OPTIONS.indexOf(currentNetwork) : 2 // Default to Friends Only
    );

    // Map Selector State
    const [currentMapName, setCurrentMapName] = useState(mapName);
    const [showMapSelector, setShowMapSelector] = useState(false);
    const [currentMissionName, setCurrentMissionName] = useState('ARRIVAL');
    const [showMissionSelector, setShowMissionSelector] = useState(false);

    // leftIndex mapping:
    // Matchmaking: 0=Subtitle, 1=Network, 2=Playlist
    // Custom: 0=Subtitle, 1=Network, 2=Game, 3=Map
    // Campaign: 0=Subtitle, 1=Network, 2=Game, 3=Difficulty, 4=Map

    const [leftIndex, setLeftIndex] = useState(HEADER_ITEMS_COUNT); // Default to first option

    // rightIndex: Roster index
    const [rightIndex, setRightIndex] = useState(0);

    const [showSettings, setShowSettings] = useState(false);
    const [showLobbySwitcher, setShowLobbySwitcher] = useState(false);

    // Mock roster data
    // status: 'Leader' or 'Member'
    // serviceTag: 4 char ID
    // rank: 1-50 or military rank index
    const roster = [
        { name: playerName, color: playerColor, isLocal: true, status: 'Leader', serviceTag: 'S-117', rank: 43, voice: true, connection: 4 },
        { name: 'SlayerPro', color: '#993333', isLocal: false, status: 'Member', serviceTag: 'A-052', rank: 35, voice: false, connection: 3 },
        { name: 'NoobMaster', color: '#336699', isLocal: false, status: 'Member', serviceTag: 'B-312', rank: 12, voice: false, connection: 4 },
        { name: 'CortanaFan', color: '#993399', isLocal: false, status: 'Member', serviceTag: 'C-009', rank: 50, voice: false, connection: 2 },
    ];

    // Lobby Switcher Options
    const LOBBY_OPTIONS = [
        { label: 'Campaign', key: 'campaign', description: "Take your party directly to Campaign to defeat the Covenant, save the galaxy, and finish the fight!" },
        { label: 'Matchmaking', key: 'matchmaking', description: "Take your party to Xbox LIVE and into the frenetic action of live combat, objective-based missions, and dangerous military exercises." },
        { label: 'Custom Games', key: 'custom_games', description: "Take your party to combat and objective-based missions that you select and design. Your rules, your maps, your game." },
        { label: 'Forge', key: 'forge', description: "Take your party to collaborate in real time to edit and play variations of your favorite maps, from the subtle to the insane." },
        { label: 'Theater', key: 'theater', description: "Take your party to view and replay films and footage of your Halo 3 exploits, from Campaign, to Multiplayer, to Forge Mode." }
    ];
    const [switcherIndex, setSwitcherIndex] = useState(0);


    useEffect(() => {
        // Sync state prop if it changes (though usually Lobby remounts)
        if (difficulty) setCurrentDifficulty(difficulty);
    }, [difficulty]);

    useEffect(() => {
        if (mapName) setCurrentMapName(mapName);
    }, [mapName]);

    useEffect(() => {
        if (showSettings || showMapSelector) return; // Disable lobby nav when modal is open

        function handleKeyDown(event) {
            // Lobby Switcher Navigation
            if (showLobbySwitcher) {
                if (event.key === 'ArrowUp') {
                    setSwitcherIndex(prev => Math.max(0, prev - 1));
                } else if (event.key === 'ArrowDown') {
                    setSwitcherIndex(prev => Math.min(LOBBY_OPTIONS.length - 1, prev + 1));
                } else if (event.key === 'Enter' || event.key === 'a') {
                    if (onSwitchLobby) {
                        onSwitchLobby(LOBBY_OPTIONS[switcherIndex].key);
                    }
                    setShowLobbySwitcher(false);
                } else if (event.key === 'Escape' || event.key === 'Backspace') {
                    setShowLobbySwitcher(false);
                }
                return;
            }

            // Difficulty Selector Navigation
            if (showDifficultySelector) {
                if (event.key === 'ArrowUp') {
                    setDifficultyIndex(prev => Math.max(0, prev - 1));
                } else if (event.key === 'ArrowDown') {
                    setDifficultyIndex(prev => Math.min(DIFFICULTY_OPTIONS.length - 1, prev + 1));
                } else if (event.key === 'Enter' || event.key === 'a') {
                    setCurrentDifficulty(DIFFICULTY_OPTIONS[difficultyIndex]);
                    setShowDifficultySelector(false);
                } else if (event.key === 'Escape' || event.key === 'Backspace') {
                    setShowDifficultySelector(false);
                }
                return;
            }

            // Network Selector Navigation
            if (showNetworkSelector) {
                if (event.key === 'ArrowUp') {
                    setNetworkIndex(prev => Math.max(0, prev - 1));
                } else if (event.key === 'ArrowDown') {
                    setNetworkIndex(prev => Math.min(NETWORK_OPTIONS.length - 1, prev + 1));
                } else if (event.key === 'Enter' || event.key === 'a') {
                    setCurrentNetwork(NETWORK_OPTIONS[networkIndex]);
                    setShowNetworkSelector(false);
                } else if (event.key === 'Escape' || event.key === 'Backspace') {
                    setShowNetworkSelector(false);
                }
                return;
            }

            // Main Lobby Navigation
            if (event.key === 'ArrowUp') {
                if (navRegion === 'left') {
                    setLeftIndex(prev => Math.max(0, prev - 1));
                } else {
                    setRightIndex(prev => Math.max(0, prev - 1));
                }
            } else if (event.key === 'ArrowDown') {
                if (navRegion === 'left') {
                    setLeftIndex(prev => Math.min(LEFT_COLUMN_TOTAL - 1, prev + 1));
                } else {
                    setRightIndex(prev => Math.min(roster.length - 1, prev + 1));
                }
            } else if (event.key === 'ArrowRight') {
                if (navRegion === 'left') {
                    setNavRegion('right');
                }
            } else if (event.key === 'ArrowLeft') {
                if (navRegion === 'right') {
                    setNavRegion('left');
                }
            } else if (event.key === 'Enter') {
                handleSelection();
            }
        }

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [navRegion, leftIndex, rightIndex, showSettings, showLobbySwitcher, showDifficultySelector, showNetworkSelector, showMapSelector, switcherIndex, difficultyIndex, networkIndex, LEFT_COLUMN_TOTAL, roster.length, onSwitchLobby]);

    const handleSelection = () => {
        if (navRegion === 'right') {
            const selectedPlayer = roster[rightIndex];
            if (selectedPlayer && selectedPlayer.isLocal) {
                setShowSettings(true);
            }
        } else {
            // Handle left column selection
            if (leftIndex === 0) {
                // Switch Lobby -> Open Switcher
                setShowLobbySwitcher(true);
            } else if (leftIndex === 1) {
                // Network
                setShowNetworkSelector(true);
            }

            // Campaign Difficulty
            if (isCampaign && leftIndex === 3) {
                setShowDifficultySelector(true);
            }

            // Map Selection
            // Campaign: Index 4
            // Custom/Forge/Theater: Index 3
            const mapIndex = isCampaign ? 4 : 3;
            if (variant === 'custom' && leftIndex === mapIndex) {
                setShowMapSelector(true);
            }
        }
    };

    const handleSaveSettings = (newName, newColor) => {
        onUpdatePlayer(newName, newColor);
        setShowSettings(false);
    };

    return (
        <div className="flex flex-row w-full h-full text-white font-halo-regular">
            {/* Left Column: Lobby Actions & Info */}
            <div className="flex flex-col w-[60%] pl-8 pt-4 bg-gradient-to-r from-black via-black/90 to-transparent">
                <h1 className="text-4xl font-halo-regular tracking-wider mb-1 uppercase text-white">{title}</h1>

                {/* Variant-Specific Header Info */}
                <div className="text-[#8db6ef] text-lg uppercase leading-tight mb-8 font-bold flex flex-col items-start">
                    <div className={`cursor-pointer w-full flex items-center relative z-50 ${(navRegion === 'left' && leftIndex === 0) || showLobbySwitcher ? 'bg-orange-500 text-white opacity-100' : 'opacity-80'
                        }`} onClick={() => { setNavRegion('left'); setLeftIndex(0); setShowLobbySwitcher(true); }}>
                        <span className="px-1">{subtitle}</span>

                        {/* Lobby Switcher Flyout */}
                        {showLobbySwitcher && (
                            <div className="absolute left-[280px] top-[-10px] flex flex-row shadow-2xl z-50">
                                {/* Menu List */}
                                <div className="flex flex-col bg-black/90 border border-white/20 min-w-[200px]">
                                    {LOBBY_OPTIONS.map((opt, idx) => (
                                        <div
                                            key={opt.key}
                                            className={`
                                            px-3 py-1 text-lg flex items-center cursor-pointer uppercase font-bold tracking-wide
                                            ${idx === switcherIndex
                                                    ? 'bg-orange-500 text-white'
                                                    : 'text-[#8db6ef] hover:bg-white/5'}
                                        `}
                                            onClick={(e) => {
                                                e.stopPropagation(); // Prevent parent click re-triggering
                                                if (onSwitchLobby) onSwitchLobby(opt.key);
                                                setShowLobbySwitcher(false);
                                            }}
                                            onMouseEnter={() => setSwitcherIndex(idx)}
                                        >
                                            {opt.label}
                                        </div>
                                    ))}
                                </div>

                                {/* Description Panel */}
                                <div className="w-[300px] bg-[#050b1b]/95 border-t border-b border-r border-white/20 p-3 text-white normal-case text-base font-normal leading-tight h-auto flex items-center">
                                    {LOBBY_OPTIONS[switcherIndex].description}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className={`cursor-pointer opacity-80 ${navRegion === 'left' && leftIndex === 1 ? 'bg-orange-500 text-white px-1 opacity-100' : ''}`} onClick={() => { setNavRegion('left'); setLeftIndex(1); setShowNetworkSelector(true); }}>
                        NETWORK: {currentNetwork}
                    </div>

                    {variant === 'matchmaking' ? (
                        <div className={`cursor-pointer opacity-80 ${navRegion === 'left' && leftIndex === 2 ? 'bg-orange-500 text-white px-1 opacity-100' : ''}`} onClick={() => { setNavRegion('left'); setLeftIndex(2); }}>
                            PLAYLIST: {playlist}
                        </div>
                    ) : (
                        <>
                            <div className={`cursor-pointer opacity-80 ${navRegion === 'left' && leftIndex === 2 ? 'bg-orange-500 text-white px-1 opacity-100' : ''}`} onClick={() => { setNavRegion('left'); setLeftIndex(2); }}>
                                GAME: {gameType}
                            </div>

                            {isCampaign && (
                                <div className={`cursor-pointer opacity-80 ${navRegion === 'left' && leftIndex === 3 ? 'bg-orange-500 text-white px-1 opacity-100' : ''}`} onClick={() => { setNavRegion('left'); setLeftIndex(3); setShowDifficultySelector(true); }}>
                                    DIFFICULTY: {currentDifficulty}
                                </div>
                            )}

                            {isCampaign ? (
                                <div className={`cursor-pointer opacity-80 ${navRegion === 'left' && leftIndex === 4 ? 'bg-orange-500 text-white px-1 opacity-100' : ''}`} onClick={() => { setNavRegion('left'); setLeftIndex(4); setShowMissionSelector(true); }}>
                                    MISSION: {currentMissionName}
                                </div>
                            ) : (
                                <div className={`cursor-pointer opacity-80 ${navRegion === 'left' && leftIndex === (isCampaign ? 4 : 3) ? 'bg-orange-500 text-white px-1 opacity-100' : ''}`} onClick={() => { setNavRegion('left'); setLeftIndex(isCampaign ? 4 : 3); setShowMapSelector(true); }}>
                                    MAP: {currentMapName}
                                </div>
                            )}
                        </>
                    )}
                </div>

                {/* Menu Actions */}
                <div className="w-full mb-4">
                    {options.map((item, index) => {
                        const actualIndex = index + HEADER_ITEMS_COUNT;
                        const isSelected = navRegion === 'left' && leftIndex === actualIndex;
                        return (
                            <div
                                key={index}
                                className={`
                                    pl-2 py-1 mb-1 text-xl flex items-center gap-2 cursor-pointer uppercase
                                    ${isSelected
                                        ? 'bg-gradient-to-r from-orange-500 via-orange-500 via-orange-500 to-orange-500/10 opacity-90 text-white border-l-4 border-white'
                                        : 'text-[#8db6ef]'}
                                `}
                                onClick={() => {
                                    setNavRegion('left');
                                    setLeftIndex(actualIndex);
                                }}
                            >
                                {item.icon && <item.icon className="w-5 h-5" />}
                                <span>{item.label}</span>
                            </div>
                        );
                    })}
                </div>

                {/* Status Text (Variant Dependent?) */}
                <div className="mb-6 text-[#8db6ef]">
                    {variant === 'matchmaking' ? (
                        <p className="text-lg">Ready</p>
                    ) : (
                        <p className="text-lg">Custom games are currently disabled. Switch the mode to Matchmaking.</p>
                    )}
                    <p className="text-lg">This party is open to friends.</p>
                </div>

                {/* Map/Preview Area */}
                <div className="relative w-full max-w-[600px] h-full mb-8">
                    {variant === 'matchmaking' ? (
                        <div className="h-[300px]">
                            <WorldMap />
                        </div>
                    ) : (
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-1 text-[#8db6ef] uppercase font-bold text-sm">
                                <XButton className="w-4 h-4" />
                                <span>Edit options</span>
                            </div>
                            <div className="border-2 border-[#1c3a6e] bg-[#050b1b] p-1 w-[400px]">
                                <div className="bg-black/50 aspect-video w-full flex items-center justify-center text-[#8db6ef]/50 font-bold uppercase tracking-widest border border-white/10">
                                    [Map Image Placeholder]
                                </div>
                                <div className="text-white font-bold uppercase text-sm mt-1 px-1">
                                    {gameType} on {currentMapName}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Online Count */}
                <div className="mt-auto mb-2 text-[#8db6ef]">
                    <p className="text-lg">1328 Gamers Online</p>
                </div>
            </div>

            {/* Right Column: Player Roster */}
            <div className="flex flex-col w-[40%] pr-8 pt-8">
                {/* Roster Header */}
                <div className="flex flex-col mb-1">
                    <div className="text-right text-[#8db6ef] text-lg mb-1">{roster.length} Players (16 max)</div>
                    {/* Player List Container */}
                    <div className="bg-[#050b1b]/80 border-t border-b border-white/30">
                        {roster.map((player, idx) => {
                            const isSelected = navRegion === 'right' && rightIndex === idx;

                            // Style logic:
                            // Apply background color from player.
                            // Use linear gradient to texture it/fade it. 
                            // Selected items are brighter/more opaque. Unselected are darker/more transparent.
                            const rowStyle = {
                                backgroundColor: player.color,
                                backgroundImage: isSelected
                                    ? `linear-gradient(to right, rgba(255,255,255,0.2), rgba(255,255,255,0.0))`
                                    : `linear-gradient(to right, rgba(0,0,0,0.4), rgba(0,0,0,0.7))`
                            };

                            return (
                                <div
                                    key={idx}
                                    className={`flex flex-row items-center h-12 px-2 transition-all cursor-pointer border-t border-b border-white/10 
                                        ${isSelected ? 'border-white/50 brightness-110' : 'brightness-75 hover:brightness-90'}
                                    `}
                                    style={rowStyle}
                                    onClick={() => {
                                        setNavRegion('right');
                                        setRightIndex(idx);
                                        if (player.isLocal) setShowSettings(true);
                                    }}
                                >
                                    {/* Column 1: Voice Status */}
                                    <div className="w-6 flex justify-center">
                                        <SpeakerIcon className="w-4 h-4" active={player.voice} />
                                    </div>

                                    {/* Column 2: Emblem - Neutral background now */}
                                    <div className="w-10 flex justify-center">
                                        <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center shadow-lg bg-black/40">
                                            <div className="w-4 h-4 rounded-full bg-white/20"></div>
                                        </div>
                                    </div>

                                    {/* Column 3: Name & Service Tag */}
                                    <div className="flex flex-col flex-1 pl-2">
                                        <span className="text-white text-lg font-bold leading-none tracking-wide drop-shadow-md shadow-black">
                                            {player.name}
                                        </span>
                                        <span className="text-white/80 text-xs font-bold tracking-wider uppercase drop-shadow-md">
                                            {player.serviceTag}
                                        </span>
                                    </div>

                                    {/* Column 4: Rank */}
                                    <div className="w-8 flex justify-center">
                                        <RankIcon className="w-6 h-6" rank={player.rank} />
                                    </div>

                                    {/* Column 5: Connection */}
                                    <div className="w-6 flex justify-center">
                                        <ConnectionIcon className="w-4 h-4" quality={player.connection} />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Settings Modal */}
            {showSettings && (
                <PlayerSettings
                    currentPlayerName={playerName}
                    currentPlayerColor={playerColor}
                    onSave={handleSaveSettings}
                    onCancel={() => setShowSettings(false)}
                />
            )}

            {/* Lobby Switcher Modal - Removed/Replaced with Flyout */}

            {/* Blur Overlay for Switch Lobby */}
            {showLobbySwitcher && (
                <div
                    className="fixed inset-0 bg-black/20 backdrop-blur-md z-40"
                    onClick={() => setShowLobbySwitcher(false)}
                />
            )}

            {/* Network Selector Modal */}
            {showNetworkSelector && (
                <NetworkSelector
                    currentNetwork={currentNetwork}
                    onSelect={(network) => {
                        setCurrentNetwork(network);
                        setShowNetworkSelector(false);
                    }}
                    onBack={() => setShowNetworkSelector(false)}
                />
            )}

            {/* Difficulty Selector Modal */}
            {showDifficultySelector && (
                <div className="fixed inset-0 bg-black/60 z-50">
                    {/* Positioned Sub-menu - Aligned with "DIFFICULTY" text */}
                    {/* "DIFFICULTY" is 4th item (index 3). Left column items are ~1.5rem high. 
                        Top of list is ~10rem? 
                        SWITCH LOBBY (1) - top: 4.5rem
                        NETWORK (2) - top: 6rem
                        GAME (3) - top: 7.5rem
                        DIFFICULTY (4) - top: 9rem 
                        Adjust position: roughly 9.5rem down */}
                    <div className="absolute top-[9.5rem] left-[2rem] w-[280px] flex flex-col">
                        <div className="flex flex-col gap-0 bg-black/90 border border-white/20 shadow-2xl backdrop-blur-sm py-1">
                            {DIFFICULTY_OPTIONS.map((diff, idx) => (
                                <div
                                    key={diff}
                                    className={`
                                        pl-3 py-1 text-xl flex items-center cursor-pointer uppercase font-bold tracking-wide
                                        ${idx === difficultyIndex
                                            ? 'bg-gradient-to-r from-orange-500 via-orange-500 to-orange-500/10 text-white border-l-4 border-white'
                                            : 'text-[#8db6ef] border-l-4 border-transparent hover:bg-white/5'}
                                    `}
                                    onClick={() => {
                                        setCurrentDifficulty(diff);
                                        setShowDifficultySelector(false);
                                    }}
                                    onMouseEnter={() => setDifficultyIndex(idx)}
                                >
                                    {diff}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Map Selector Overlay */}
            {showMapSelector && (
                <MapSelector
                    currentMap={currentMapName}
                    onSelect={(map) => {
                        setCurrentMapName(map);
                        setShowMapSelector(false);
                    }}
                    onBack={() => setShowMapSelector(false)}
                />
            )}

            {/* Mission Selector Overlay */}
            {showMissionSelector && (
                <MissionSelector
                    currentMission={currentMissionName}
                    onSelect={(mission) => {
                        setCurrentMissionName(mission);
                        setShowMissionSelector(false);
                    }}
                    onBack={() => setShowMissionSelector(false)}
                />
            )}
        </div>
    );
};

export default Lobby;

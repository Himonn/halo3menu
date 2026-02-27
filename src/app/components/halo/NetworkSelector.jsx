import React, { useState, useEffect } from 'react';
import { AButton, BButton, XButton } from './XboxIcons';
import MaxPartySizeSelector from './MaxPartySizeSelector';

const NETWORK_MODES = [
    {
        id: 'xbox_live',
        label: 'XBOX LIVE',
        description: "Play on Xbox LIVE and choose privacy settings for who may join your party.",
        subDescription: "Play on Xbox LIVE and choose privacy settings for who may join your party.",
        icon: null,
        hasSubmenu: true,
        options: [
            {
                id: 'open',
                label: 'OPEN PARTY',
                fullLabel: 'XBOX LIVE (OPEN PARTY)',
                description: "Friends and recent players may join your party."
            },
            {
                id: 'friends',
                label: 'FRIENDS ONLY',
                fullLabel: 'XBOX LIVE (FRIENDS ONLY)',
                description: "Your friends and friends of any player in your party may join."
            },
            {
                id: 'invite',
                label: 'INVITE ONLY',
                fullLabel: 'XBOX LIVE (INVITE ONLY)',
                description: "Players must be invited to join your party. Any player in the party may send an invite."
            }
        ]
    },
    {
        id: 'system_link',
        label: 'SYSTEM LINK',
        description: "Connect multiple Xbox 360 consoles to play over your local area network.",
        hasSubmenu: true,
        fullLabel: "SYSTEM LINK",
        options: [
            {
                id: 'host',
                label: 'HOST GAME',
                fullLabel: 'SYSTEM LINK (HOST)',
                description: "Host a game on System Link. Only players on your local area network may join."
            },
            {
                id: 'find',
                label: 'FIND GAME...',
                fullLabel: 'SYSTEM LINK (FIND)',
                description: "Find games that are being hosted on System Link."
            }
        ]
    },
    {
        id: 'local',
        label: 'LOCAL',
        description: "Play only on this Xbox 360 console. Up to 4 players may play splitscreen.",
        hasSubmenu: false,
        fullLabel: "LOCAL",
        options: []
    }
];

const NetworkSelector = ({ currentNetwork, onSelect, onBack }) => {
    // Find initial indices based on currentNetwork string
    const getInitialIndices = () => {
        for (let i = 0; i < NETWORK_MODES.length; i++) {
            const mode = NETWORK_MODES[i];
            if (mode.options && mode.options.length > 0) {
                for (let j = 0; j < mode.options.length; j++) {
                    if (mode.options[j].fullLabel === currentNetwork) {
                        return { modeIndex: i, subIndex: j, submenuActive: true };
                    }
                }
            } else {
                if (mode.fullLabel === currentNetwork) {
                    return { modeIndex: i, subIndex: 0, submenuActive: false };
                }
            }
        }
        return { modeIndex: 0, subIndex: 1, submenuActive: true }; // Default to Xbox Live > Friends Only
    };

    const initial = getInitialIndices();
    const [selectedModeIndex, setSelectedModeIndex] = useState(initial.modeIndex);
    const [selectedSubIndex, setSelectedSubIndex] = useState(initial.subIndex);
    const [isSubmenuActive, setIsSubmenuActive] = useState(initial.submenuActive);

    const [showMaxPartySelector, setShowMaxPartySelector] = useState(false);
    const [maxPartySize, setMaxPartySize] = useState(16); // Default 16

    const handleSelect = React.useCallback(() => {
        const currentMode = NETWORK_MODES[selectedModeIndex];
        if (isSubmenuActive && currentMode.hasSubmenu) {
            onSelect(currentMode.options[selectedSubIndex].fullLabel);
        } else if (!currentMode.hasSubmenu) {
            onSelect(currentMode.fullLabel);
        } else {
            if (currentMode.hasSubmenu) {
                setIsSubmenuActive(true);
                setSelectedSubIndex(0);
            }
        }
    }, [selectedModeIndex, selectedSubIndex, isSubmenuActive, onSelect]);

    useEffect(() => {
        if (showMaxPartySelector) return; // Disable main nav when modal is open

        function handleKeyDown(event) {
            event.stopPropagation();

            if (event.key === 'ArrowUp') {
                if (isSubmenuActive) {
                    setSelectedSubIndex(prev => Math.max(0, prev - 1));
                } else {
                    setSelectedModeIndex(prev => Math.max(0, prev - 1));
                    // Reset sub index when moving parent
                    setSelectedSubIndex(0);
                }
            } else if (event.key === 'ArrowDown') {
                if (isSubmenuActive) {
                    const currentMode = NETWORK_MODES[selectedModeIndex];
                    if (currentMode.options) {
                        setSelectedSubIndex(prev => Math.min(currentMode.options.length - 1, prev + 1));
                    }
                } else {
                    setSelectedModeIndex(prev => Math.min(NETWORK_MODES.length - 1, prev + 1));
                    setSelectedSubIndex(0);
                }
            } else if (event.key === 'ArrowRight') {
                const currentMode = NETWORK_MODES[selectedModeIndex];
                if (currentMode.hasSubmenu && !isSubmenuActive) {
                    setIsSubmenuActive(true);
                    setSelectedSubIndex(0);
                }
            } else if (event.key === 'ArrowLeft') {
                if (isSubmenuActive) {
                    setIsSubmenuActive(false);
                }
            } else if (event.key === 'Enter' || event.key === 'a') {
                handleSelect();
            } else if (event.key === 'Escape' || event.key === 'Backspace' || event.key === 'b') {
                onBack();
            } else if (event.key === 'x') {
                const currentMode = NETWORK_MODES[selectedModeIndex];
                if (currentMode.id === 'xbox_live') {
                    setShowMaxPartySelector(true);
                }
            }
        }

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedModeIndex, selectedSubIndex, isSubmenuActive, onBack, onSelect, showMaxPartySelector, handleSelect]);

    const currentMode = NETWORK_MODES[selectedModeIndex];

    // Determine description based on active submenu
    const activeDescription = (isSubmenuActive && currentMode.options && currentMode.options[selectedSubIndex]?.description)
        ? currentMode.options[selectedSubIndex].description
        : currentMode.description;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center font-halo-regular">
            {/* Background Overlay */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-md"></div>

            {/* Main Container - Full Width Bar Style */}
            <div className="relative w-full h-full flex flex-col justify-center">

                {/* Header Bar */}
                <div className="w-full bg-black/80 border-t border-b border-white/20 py-1 mb-0">
                    <h2 className="text-white text-3xl ml-32 uppercase tracking-widest">Select Network Mode</h2>
                </div>

                {/* Content Area */}
                <div className="w-full bg-[#0b1221]/90 h-[400px] flex flex-row items-start pt-8 relative">

                    {/* Left Column: Network Modes */}
                    <div className="flex flex-col ml-32 w-[300px]">
                        {NETWORK_MODES.map((mode, idx) => {
                            const isActive = selectedModeIndex === idx;
                            const isFocused = isActive && !isSubmenuActive; // Focused if active and NOT in submenu

                            return (
                                <div key={mode.id} className="flex flex-row items-center justify-between mb-1">
                                    <div
                                        className={`
                                            text-2xl uppercase tracking-wide cursor-pointer flex-1
                                            ${isActive ? 'text-white font-bold' : 'text-[#8db6ef]'}
                                            ${isFocused ? 'bg-orange-500 pl-2' : 'pl-2'}
                                        `}
                                        onMouseEnter={() => {
                                            setSelectedModeIndex(idx);
                                            setIsSubmenuActive(false);
                                        }}
                                        onClick={() => {
                                            setSelectedModeIndex(idx);
                                            if (mode.hasSubmenu) setIsSubmenuActive(true);
                                            else onSelect(mode.fullLabel);
                                        }}
                                    >
                                        {mode.label}
                                    </div>
                                    {/* Arrow indicator if submenu exists and active */}
                                    {isActive && mode.hasSubmenu && (
                                        <div className="text-white ml-2">▶</div>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {/* Middle Column: Submenu Options */}
                    <div className="flex flex-col ml-4 w-[250px]">
                        {currentMode.hasSubmenu && currentMode.options.map((option, idx) => {
                            const isSelected = isSubmenuActive && selectedSubIndex === idx;
                            return (
                                <div
                                    key={option.id}
                                    className={`
                                        text-2xl uppercase tracking-wide cursor-pointer mb-1 pl-2
                                        ${isSelected ? 'bg-orange-500 text-white font-bold' : 'text-[#4c6a96]'}
                                    `}
                                    onMouseEnter={() => {
                                        if (currentMode.hasSubmenu) {
                                            setIsSubmenuActive(true);
                                            setSelectedSubIndex(idx);
                                        }
                                    }}
                                    onClick={() => onSelect(option.fullLabel)}
                                >
                                    {option.label}
                                </div>
                            );
                        })}
                    </div>

                    {/* Right Column: Description Panel */}
                    <div className="ml-16 w-[400px] flex flex-col items-center text-center p-8 bg-gradient-to-b from-[#1a263b] to-transparent rounded-lg border border-white/5">
                        {currentMode.icon && <currentMode.icon className="w-48 h-24 mb-6 fill-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]" />}

                        {!currentMode.icon && (
                            <div className="text-4xl text-white font-bold mb-4">{currentMode.label}</div>
                        )}

                        <p className="text-white text-lg leading-snug">
                            {activeDescription}
                        </p>
                    </div>

                </div>

                {/* Footer Bar */}
                <div className="w-full bg-black/90 border-t border-white/20 py-2 absolute bottom-[20%] flex flex-row items-center justify-center gap-8 z-10">
                    <div className="flex flex-row items-center gap-2">
                        <AButton className="w-6 h-6" />
                        <span className="text-white font-bold uppercase">Select</span>
                    </div>
                    <div className="flex flex-row items-center gap-2">
                        <BButton className="w-6 h-6" />
                        <span className="text-white font-bold uppercase">Back</span>
                    </div>
                    {currentMode.id === 'xbox_live' && (
                        <div className="flex flex-row items-center gap-2">
                            <XButton className="w-6 h-6" />
                            <span className="text-white font-bold uppercase">Max Party Size</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Max Party Size Selector Modal */}
            {showMaxPartySelector && (
                <MaxPartySizeSelector
                    currentSize={maxPartySize}
                    onSelect={(size) => {
                        setMaxPartySize(size);
                        setShowMaxPartySelector(false);
                    }}
                    onCancel={() => setShowMaxPartySelector(false)}
                />
            )}
        </div>
    );
};

export default NetworkSelector;

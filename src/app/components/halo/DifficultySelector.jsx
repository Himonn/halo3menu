import React, { useState, useEffect } from 'react';
import { AButton, BButton } from './XboxIcons';

const DIFFICULTY_OPTIONS = [
    {
        id: 'EASY',
        label: 'EASY',
        description: 'Laugh as helpless victims flee in terror from their inevitable slaughter. The game basically plays itself.'
    },
    {
        id: 'NORMAL',
        label: 'NORMAL',
        description: 'Face firm resistance from competent, determined enemies, but burn through enough ammo and you will eventually triumph.'
    },
    {
        id: 'HEROIC',
        label: 'HEROIC',
        description: 'Fight against formidable foes that will truly test your skill and wits; this is the way Halo is meant to be played.'
    },
    {
        id: 'LEGENDARY',
        label: 'LEGENDARY',
        description: 'Tremble as teeming hordes of invincible alien monsters punish the slightest error with instant death... again and again.'
    }
];

const DifficultySelector = ({ currentDifficulty, onSelect, onBack }) => {
    const initialIndex = DIFFICULTY_OPTIONS.findIndex(opt => opt.id === currentDifficulty);
    const [selectedIndex, setSelectedIndex] = useState(initialIndex >= 0 ? initialIndex : 1);

    useEffect(() => {
        function handleKeyDown(event) {
            event.stopPropagation();
            if (event.key === 'ArrowUp') {
                setSelectedIndex(prev => Math.max(0, prev - 1));
            } else if (event.key === 'ArrowDown') {
                setSelectedIndex(prev => Math.min(DIFFICULTY_OPTIONS.length - 1, prev + 1));
            } else if (event.key === 'Enter' || event.key === 'a') {
                onSelect(DIFFICULTY_OPTIONS[selectedIndex].id);
            } else if (event.key === 'Escape' || event.key === 'Backspace' || event.key === 'b') {
                onBack();
            }
        }

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedIndex, onSelect, onBack]);

    const currentMode = DIFFICULTY_OPTIONS[selectedIndex];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center font-halo-regular">
            {/* Background Overlay */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-md"></div>

            {/* Main Container */}
            <div className="relative w-full h-full flex flex-col justify-center">

                {/* Header Bar */}
                <div className="w-full bg-[#1b2533]/90 border-t border-b border-[#3b557a] py-1 mb-0 shadow-[0_0_15px_rgba(40,70,120,0.5)]">
                    <h2 className="text-white text-3xl ml-32 uppercase tracking-widest pl-2">Select Difficulty</h2>
                </div>

                {/* Content Area */}
                <div className="w-full h-[400px] flex flex-row items-start pt-4 relative">

                    {/* Dark gradient behind options */}
                    <div className="absolute inset-y-0 left-0 w-full bg-gradient-to-b from-[#0b1221]/90 to-transparent -z-10" />

                    {/* Left Column: Difficulty List */}
                    <div className="flex flex-col ml-32 w-[280px]">
                        {DIFFICULTY_OPTIONS.map((diff, idx) => {
                            const isSelected = selectedIndex === idx;

                            return (
                                <div
                                    key={diff.id}
                                    className={`
                                        text-2xl uppercase tracking-wider cursor-pointer mb-0.5 text-left
                                        ${isSelected ? 'text-white font-bold bg-gradient-to-r from-[#d97d48] via-[#a85a30] to-transparent pl-2' : 'text-[#8db6ef] pl-2 opacity-80 hover:opacity-100'}
                                    `}
                                    onMouseEnter={() => setSelectedIndex(idx)}
                                    onClick={() => onSelect(diff.id)}
                                >
                                    {diff.label}
                                </div>
                            );
                        })}
                    </div>

                    {/* Right Column: Image and Description */}
                    <div className="ml-8 w-[500px] flex flex-col items-start mt-2">
                        {/* Placeholder for Difficulty Image */}
                        <div className="w-[450px] aspect-[2/1] bg-black/50 border border-white/20 mb-4 flex justify-center items-center shadow-lg relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-tr from-[#1b2c45]/50 to-transparent"></div>
                            <span className="text-white/40 uppercase tracking-widest font-bold z-10">[Difficulty Image Placeholder]</span>
                        </div>

                        {/* Description Text */}
                        <p className="text-white text-base leading-snug w-[450px] font-normal drop-shadow-md">
                            {currentMode.description}
                        </p>
                    </div>

                </div>

                {/* Footer Bar */}
                <div className="w-full bg-black/90 border-t border-[#3b557a]/50 py-2 absolute bottom-[20%] flex flex-row items-center justify-center gap-8 z-10 shadow-[0_-5px_15px_rgba(0,0,0,0.5)]">
                    <div className="flex flex-row items-center gap-2">
                        <AButton className="w-6 h-6" />
                        <span className="text-white font-bold uppercase tracking-wider text-sm">Select</span>
                    </div>
                    <div className="flex flex-row items-center gap-2">
                        <BButton className="w-6 h-6" />
                        <span className="text-white font-bold uppercase tracking-wider text-sm">Back</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DifficultySelector;

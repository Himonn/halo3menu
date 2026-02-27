import React, { useState, useEffect } from 'react';
import { AButton, BButton } from './XboxIcons';

const MaxPartySizeSelector = ({ currentSize, onSelect, onCancel }) => {
    // 1-16 for specific sizes, 17 for "Closed"
    const [selectedValue, setSelectedValue] = useState(currentSize || 16);

    useEffect(() => {
        function handleKeyDown(event) {
            event.preventDefault();
            event.stopPropagation();

            if (event.key === 'ArrowLeft') {
                setSelectedValue(prev => Math.max(1, prev - 1));
            } else if (event.key === 'ArrowRight') {
                setSelectedValue(prev => Math.min(17, prev + 1));
            } else if (event.key === 'Enter' || event.key === 'a') {
                onSelect(selectedValue);
            } else if (event.key === 'Escape' || event.key === 'Backspace' || event.key === 'b') {
                onCancel();
            }
        }

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedValue, onSelect, onCancel]);

    // Slider ticks: 1 to 16, plus 17 (Closed)
    // 17th tick should have a lock icon or distinct look
    const TICKS = Array.from({ length: 17 }, (_, i) => i + 1);

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center font-halo-regular text-white">
            {/* Darker Overlay for focus */}
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm"></div>

            {/* Modal Container */}
            <div className="relative w-full max-w-[800px] bg-[#0b1221] border border-white/20 shadow-2xl">

                {/* Header */}
                <div className="bg-gradient-to-r from-[#1c3a6e] to-[#0b1221] py-2 px-4 border-b border-white/20">
                    <h2 className="text-2xl uppercase tracking-widest text-white text-center">Maximum Party Size</h2>
                </div>

                {/* Content */}
                <div className="p-8 flex flex-col items-center">
                    <p className="text-[#8db6ef] text-center text-lg mb-8 max-w-[600px] leading-relaxed">
                        The maximum party size limits the number of players that may join your party.
                        You may close the party to new players at the far right of the slider.
                    </p>

                    {/* Slider Control */}
                    <div className="relative w-full max-w-[500px] flex items-center justify-between mb-2">
                        {/* Left Arrow */}
                        <div className="text-white text-2xl animate-pulse">◀</div>

                        {/* Slider Track */}
                        <div className="flex gap-1">
                            {TICKS.map(tick => {
                                const isFilled = tick <= selectedValue;
                                const isClosedTick = tick === 17;
                                const isSelected = tick === selectedValue;

                                return (
                                    <div
                                        key={tick}
                                        className={`
                                            w-4 h-8 border border-white/40
                                            ${isClosedTick
                                                ? 'bg-transparent flex items-center justify-center'
                                                : (isFilled ? 'bg-[#c3c3c3]' : 'bg-[#1a263b]')}
                                            ${isSelected ? 'border-2 border-white scale-110 shadow-[0_0_10px_white]' : ''}
                                        `}
                                    >
                                        {isClosedTick && (
                                            <div className={`text-[10px] ${isFilled ? 'text-white' : 'text-gray-500'}`}>🔒</div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>

                        {/* Right Arrow */}
                        <div className="text-white text-2xl animate-pulse">▶</div>
                    </div>

                    {/* Labels under slider */}
                    <div className="w-full max-w-[500px] flex justify-between text-[#8db6ef] text-sm uppercase font-bold relative h-6">
                        {/* Dynamic label? Or just fixed "1" and "Closed"? */}
                        <span className="absolute left-0 text-xs">1</span>
                        <span className="absolute right-0 text-xs mt-1">Closed</span>

                        {/* Current Value Display */}
                        <div className="absolute w-full text-center top-8 text-white text-xl">
                            {selectedValue === 17 ? "Party Closed" : `${selectedValue} Players`}
                        </div>
                    </div>

                    {/* Footer Info */}
                    <div className="mt-16 w-full flex flex-col items-start border-t border-white/10 pt-4">
                        <div className="text-[#8db6ef] mb-2">Current Players in Party: 1</div>
                        <div className="flex gap-8">
                            <div className="flex flex-row items-center gap-2">
                                <AButton className="w-5 h-5" />
                                <span className="text-white font-bold uppercase">Select</span>
                            </div>
                            <div className="flex flex-row items-center gap-2">
                                <BButton className="w-5 h-5" />
                                <span className="text-white font-bold uppercase">Cancel</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MaxPartySizeSelector;

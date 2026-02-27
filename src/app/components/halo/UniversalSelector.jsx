import React, { useState, useEffect } from 'react';
import { AButton, BButton } from './XboxIcons';

const UniversalSelector = ({
    title,
    items,
    selectedValue,
    onSelect,
    onBack,
    renderPreview,
    extraKeyHandlers = {},
    renderFooterExtras = null,
    children
}) => {
    // 1. Initial Indices Calculation
    const getInitialIndices = () => {
        if (!selectedValue) return { modeIndex: 0, subIndex: 0, submenuActive: items[0]?.hasSubmenu || false };

        for (let i = 0; i < items.length; i++) {
            const mode = items[i];
            if (mode.hasSubmenu && mode.options) {
                for (let j = 0; j < mode.options.length; j++) {
                    if (mode.options[j].value === selectedValue) {
                        return { modeIndex: i, subIndex: j, submenuActive: true };
                    }
                }
            } else {
                if (mode.value === selectedValue) {
                    return { modeIndex: i, subIndex: 0, submenuActive: false };
                }
            }
        }
        return { modeIndex: 0, subIndex: 0, submenuActive: items[0]?.hasSubmenu || false };
    };

    const initial = getInitialIndices();
    const [selectedModeIndex, setSelectedModeIndex] = useState(initial.modeIndex);
    const [selectedSubIndex, setSelectedSubIndex] = useState(initial.subIndex);
    const [isSubmenuActive, setIsSubmenuActive] = useState(initial.submenuActive);

    const activeItem = items[selectedModeIndex];
    const activeSubItem = isSubmenuActive && activeItem?.hasSubmenu ? activeItem.options[selectedSubIndex] : null;

    const handleSelect = React.useCallback(() => {
        const currentMode = items[selectedModeIndex];
        if (isSubmenuActive && currentMode.hasSubmenu) {
            onSelect(currentMode.options[selectedSubIndex].value);
        } else if (!currentMode.hasSubmenu) {
            onSelect(currentMode.value);
        } else {
            if (currentMode.hasSubmenu) {
                setIsSubmenuActive(true);
                setSelectedSubIndex(0);
            }
        }
    }, [selectedModeIndex, selectedSubIndex, isSubmenuActive, items, onSelect]);

    useEffect(() => {
        // Scroll the active left menu item into view if it overflows
        const el = document.getElementById(`univ-item-${selectedModeIndex}`);
        if (el && !isSubmenuActive) {
            el.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        }
    }, [selectedModeIndex, isSubmenuActive]);

    useEffect(() => {
        const el = document.getElementById(`univ-subitem-${selectedSubIndex}`);
        if (el && isSubmenuActive) {
            el.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        }
    }, [selectedSubIndex, isSubmenuActive]);

    useEffect(() => {
        function handleKeyDown(event) {
            event.stopPropagation();

            if (event.key === 'ArrowUp') {
                event.preventDefault();
                if (isSubmenuActive) {
                    setSelectedSubIndex(prev => Math.max(0, prev - 1));
                } else {
                    setSelectedModeIndex(prev => Math.max(0, prev - 1));
                    setSelectedSubIndex(0);
                }
            } else if (event.key === 'ArrowDown') {
                event.preventDefault();
                if (isSubmenuActive) {
                    const currentMode = items[selectedModeIndex];
                    if (currentMode.options) {
                        setSelectedSubIndex(prev => Math.min(currentMode.options.length - 1, prev + 1));
                    }
                } else {
                    setSelectedModeIndex(prev => Math.min(items.length - 1, prev + 1));
                    setSelectedSubIndex(0);
                }
            } else if (event.key === 'ArrowRight') {
                event.preventDefault();
                const currentMode = items[selectedModeIndex];
                if (currentMode.hasSubmenu && !isSubmenuActive) {
                    setIsSubmenuActive(true);
                    setSelectedSubIndex(0);
                }
            } else if (event.key === 'ArrowLeft') {
                event.preventDefault();
                if (isSubmenuActive) {
                    setIsSubmenuActive(false);
                }
            } else if (event.key === 'Enter' || event.key === 'a') {
                handleSelect();
            } else if (event.key === 'Escape' || event.key === 'Backspace' || event.key === 'b') {
                onBack();
            } else if (extraKeyHandlers[event.key]) {
                extraKeyHandlers[event.key](activeItem, activeSubItem);
            }
        }

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedModeIndex, selectedSubIndex, isSubmenuActive, onBack, handleSelect, items, extraKeyHandlers, activeItem, activeSubItem]);

    const hasAnySubmenu = items.some(i => i.hasSubmenu);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center font-halo-regular">
            {/* Background Overlay */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-md"></div>

            {/* Main Container */}
            <div className="relative w-full h-full flex flex-col justify-center">

                {/* Header Bar */}
                <div className="w-full bg-black/90 border-t border-b border-white/20 py-1 mb-0 shadow-[0_0_15px_rgba(40,70,120,0.5)]">
                    <h2 className="text-white text-3xl ml-32 uppercase tracking-widest">{title}</h2>
                </div>

                {/* Content Area */}
                <div className="w-full bg-[#0b1221]/90 h-[400px] flex flex-row items-start pt-8 relative overflow-hidden">

                    {/* Left Column: Items */}
                    <div className="flex flex-col ml-32 w-[300px] h-full overflow-y-auto no-scrollbar pb-16">
                        {items.map((item, idx) => {
                            const isActive = selectedModeIndex === idx;
                            const isFocused = isActive && !isSubmenuActive;

                            return (
                                <div key={item.id || idx} id={`univ-item-${idx}`} className="flex flex-row items-center justify-between mb-1 py-0.5">
                                    <div
                                        className={`
                                            text-2xl uppercase tracking-wide cursor-pointer flex-1
                                            ${isActive ? 'text-white font-bold' : 'text-[#8db6ef]'}
                                            ${isFocused ? 'bg-orange-500 pl-2' : 'pl-2'}
                                            ${item.locked ? 'text-gray-600' : ''}
                                        `}
                                        onMouseEnter={() => {
                                            setSelectedModeIndex(idx);
                                            setIsSubmenuActive(false);
                                        }}
                                        onClick={() => {
                                            if (item.locked) return;
                                            setSelectedModeIndex(idx);
                                            if (item.hasSubmenu) setIsSubmenuActive(true);
                                            else onSelect(item.value);
                                        }}
                                    >
                                        {item.locked ? '[LOCKED]' : item.label}
                                    </div>
                                    {isActive && item.hasSubmenu && (
                                        <div className="text-white ml-2">▶</div>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {/* Middle Column: Submenu */}
                    {hasAnySubmenu && (
                        <div className="flex flex-col ml-4 w-[250px] h-full overflow-y-auto no-scrollbar pb-16">
                            {activeItem?.hasSubmenu && activeItem.options.map((option, idx) => {
                                const isSelected = isSubmenuActive && selectedSubIndex === idx;
                                return (
                                    <div
                                        key={option.id || idx}
                                        id={`univ-subitem-${idx}`}
                                        className={`
                                            text-2xl uppercase tracking-wide cursor-pointer mb-1 pl-2 py-0.5
                                            ${isSelected ? 'bg-orange-500 text-white font-bold' : 'text-[#4c6a96] hover:bg-white/5'}
                                        `}
                                        onMouseEnter={() => {
                                            if (activeItem.hasSubmenu) {
                                                setIsSubmenuActive(true);
                                                setSelectedSubIndex(idx);
                                            }
                                        }}
                                        onClick={() => onSelect(option.value)}
                                    >
                                        {option.label}
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    {/* Right Column: Preview Panel */}
                    <div className={`flex flex-col flex-1 h-full px-8 pb-16 overflow-y-auto no-scrollbar items-start`}>
                        {renderPreview && renderPreview(activeItem, activeSubItem, isSubmenuActive)}
                    </div>
                </div>

                {/* Footer Bar */}
                <div className="w-full bg-black/90 border-t border-[#3b557a]/50 py-2 absolute bottom-[15%] flex flex-row items-center pl-32 gap-8 z-10 shadow-[0_-5px_15px_rgba(0,0,0,0.5)]">
                    <div className="flex flex-row items-center gap-2">
                        <AButton className="w-6 h-6" />
                        <span className="text-white font-bold uppercase tracking-wider text-sm">Select</span>
                    </div>
                    <div className="flex flex-row items-center gap-2">
                        <BButton className="w-6 h-6" />
                        <span className="text-white font-bold uppercase tracking-wider text-sm">Back</span>
                    </div>
                    {renderFooterExtras && renderFooterExtras(activeItem, activeSubItem, isSubmenuActive)}
                </div>
            </div>
            {children}
        </div>
    );
};

export default UniversalSelector;

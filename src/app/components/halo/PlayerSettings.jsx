import React, { useState, useEffect } from 'react';
import { AButton, BButton } from './XboxIcons';

const HALO_COLORS = [
    { name: 'Steel', value: '#626262' },
    { name: 'Silver', value: '#B0B0B0' },
    { name: 'White', value: '#D9D9D9' },
    { name: 'Red', value: '#993333' },
    { name: 'Mauve', value: '#DB7D7D' },
    { name: 'Salmon', value: '#FF9999' },
    { name: 'Orange', value: '#D98933' },
    { name: 'Coral', value: '#FFCC99' },
    { name: 'Gold', value: '#FFCC33' },
    { name: 'Yellow', value: '#FFFF33' },
    { name: 'Sage', value: '#8FBC8F' },
    { name: 'Green', value: '#339933' },
    { name: 'Olive', value: '#669966' },
    { name: 'Teal', value: '#339999' },
    { name: 'Aqua', value: '#66CCCC' },
    { name: 'Cyan', value: '#33CCFF' },
    { name: 'Blue', value: '#336699' },
    { name: 'Cobalt', value: '#333399' },
    { name: 'Sapphire', value: '#6666FF' },
    { name: 'Violet', value: '#993399' },
    { name: 'Orchid', value: '#CC66CC' },
    { name: 'Lavender', value: '#CC99FF' },
    { name: 'Crimson', value: '#990033' },
    { name: 'Ruby', value: '#CC0033' },
    { name: 'Pink', value: '#FF6699' },
    { name: 'Brown', value: '#663300' },
    { name: 'Tan', value: '#996633' },
    { name: 'Khaki', value: '#CC9966' },
    { name: 'Peach', value: '#FFCC99' },
    { name: 'Drab', value: '#999966' }
];

const PlayerSettings = ({ currentPlayerName, currentPlayerColor, onSave, onCancel }) => {
    // State
    const [name, setName] = useState(currentPlayerName);
    // Find initial color index or default to 0
    const initialColorIndex = HALO_COLORS.findIndex(c => c.value === currentPlayerColor);
    const [colorIndex, setColorIndex] = useState(initialColorIndex !== -1 ? initialColorIndex : 0);

    // Focus State: 'name' | 'color' | 'actions'
    const [focusSection, setFocusSection] = useState('name');

    // Action State: 0 = Cancel, 1 = Accept
    const [actionIndex, setActionIndex] = useState(1);

    const inputRef = React.useRef(null);

    // Update color when index changes
    const currentColor = HALO_COLORS[colorIndex].value;

    useEffect(() => {
        // Build a global key handler
        const handleKeyDown = (e) => {
            if (focusSection === 'name') {
                if (e.key === 'ArrowDown' || e.key === 'Enter') {
                    e.preventDefault();
                    setFocusSection('color');
                    inputRef.current?.blur();
                }
                // Allow default typing
                return;
            }

            // Prevent default scrolling for arrow keys in other sections
            if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
                e.preventDefault();
            }

            if (focusSection === 'color') {
                const cols = 6;
                const rows = Math.ceil(HALO_COLORS.length / cols);

                if (e.key === 'ArrowRight') {
                    setColorIndex(prev => (prev + 1) % HALO_COLORS.length);
                } else if (e.key === 'ArrowLeft') {
                    setColorIndex(prev => (prev - 1 + HALO_COLORS.length) % HALO_COLORS.length);
                } else if (e.key === 'ArrowUp') {
                    if (colorIndex - cols < 0) {
                        // Move back to Name
                        setFocusSection('name');
                        setTimeout(() => inputRef.current?.focus(), 0);
                    } else {
                        setColorIndex(prev => prev - cols);
                    }
                } else if (e.key === 'ArrowDown') {
                    if (colorIndex + cols >= HALO_COLORS.length) {
                        // Move to Actions
                        setFocusSection('actions');
                    } else {
                        setColorIndex(prev => prev + cols);
                    }
                } else if (e.key === 'Enter' || e.key === 'a') {
                    // Confirm selection? Or just move to actions?
                    // In Halo, A usually selects. But here selection is live. 
                    // Let's assume A saves? Or maybe moves to Accept button?
                    // Let's make it Save for convenience.
                    onSave(name, currentColor);
                }
            } else if (focusSection === 'actions') {
                if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
                    setActionIndex(prev => (prev === 0 ? 1 : 0));
                } else if (e.key === 'ArrowUp') {
                    setFocusSection('color');
                } else if (e.key === 'Enter' || e.key === 'a') {
                    if (actionIndex === 0) onCancel();
                    else onSave(name, currentColor);
                } else if (e.key === 'b' || e.key === 'Escape') {
                    onCancel();
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [focusSection, colorIndex, actionIndex, name, currentColor, onSave, onCancel]);

    // Ensure input is focused when section is 'name'
    useEffect(() => {
        if (focusSection === 'name') {
            inputRef.current?.focus();
        }
    }, [focusSection]);

    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
            <div className="bg-gradient-to-br from-blue-900/40 to-black border border-blue-400/30 p-8 rounded-lg shadow-2xl backdrop-blur-md w-[800px] max-w-full">
                <h2 className="text-3xl font-halo-fancy text-blue-100 mb-6 tracking-widest uppercase border-b border-blue-400/30 pb-2">
                    Edit Player Settings
                </h2>

                <div className="flex gap-8">
                    {/* Left Column: Form */}
                    <div className="flex-1 space-y-6">
                        {/* Name Input */}
                        <div className={`transition-opacity ${focusSection === 'name' ? 'opacity-100' : 'opacity-70'}`}>
                            <label className={`block uppercase tracking-wider text-sm mb-2 font-bold ${focusSection === 'name' ? 'text-blue-200' : 'text-gray-500'}`}>
                                Service Tag / Name
                            </label>
                            <input
                                ref={inputRef}
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value.slice(0, 15))}
                                onClick={() => setFocusSection('name')}
                                className={`w-full bg-black/50 border rounded px-4 py-2 text-white font-halo focus:outline-none uppercase tracking-widest
                                    ${focusSection === 'name'
                                        ? 'border-blue-400 ring-2 ring-blue-400/50 shadow-[0_0_15px_rgba(59,130,246,0.5)]'
                                        : 'border-blue-400/30 text-gray-400'}
                                `}
                                placeholder="ENTER NAME"
                            />
                        </div>

                        {/* Color Picker */}
                        <div className={`transition-opacity ${focusSection === 'color' ? 'opacity-100' : 'opacity-80'}`}>
                            <label className={`block uppercase tracking-wider text-sm mb-2 font-bold ${focusSection === 'color' ? 'text-blue-200' : 'text-gray-500'}`}>
                                Primary Color
                            </label>
                            <div className={`grid grid-cols-6 gap-2 bg-black/30 p-3 rounded border 
                                ${focusSection === 'color' ? 'border-blue-400/50 shadow-[0_0_15px_rgba(59,130,246,0.2)]' : 'border-blue-900/30'}
                            `}>
                                {HALO_COLORS.map((c, idx) => {
                                    const isSelected = idx === colorIndex;
                                    return (
                                        <button
                                            key={c.name}
                                            onClick={() => {
                                                setFocusSection('color');
                                                setColorIndex(idx);
                                            }}
                                            className={`w-8 h-8 rounded-sm border-2 transition-all 
                                                ${isSelected
                                                    ? 'border-white scale-110 shadow-[0_0_10px_white] z-10'
                                                    : 'border-transparent hover:border-gray-400 hover:scale-105'
                                                }
                                                ${isSelected && focusSection === 'color' ? 'ring-2 ring-blue-400 ring-offset-2 ring-offset-black' : ''}
                                            `}
                                            style={{ backgroundColor: c.value }}
                                            title={c.name}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Preview */}
                    <div className="w-64 flex flex-col items-center justify-center bg-black/20 rounded border border-blue-900/30 p-4">
                        <span className="text-blue-200 uppercase tracking-wider text-xs mb-4 font-bold">Preview</span>

                        {/* Spartan Icon Preview */}
                        <div className="w-32 h-32 relative mb-4">
                            <div
                                className="w-full h-full rounded-full border-4 border-blue-400/30 flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.2)]"
                                style={{ backgroundColor: '#0f172a' }}
                            >
                                <svg viewBox="0 0 100 100" className="w-20 h-20 fill-current drop-shadow-md" style={{ color: currentColor }}>
                                    <circle cx="50" cy="35" r="20" />
                                    <path d="M20,90 Q50,70 80,90 V100 H20 Z" />
                                </svg>
                            </div>
                        </div>

                        <div className="text-center">
                            <div className="text-xl font-bold text-white tracking-widest uppercase font-halo">{name || "SPARTAN"}</div>
                            <div className="text-xs text-blue-300 uppercase tracking-widest mt-1">S-117</div>
                        </div>
                    </div>
                </div>

                {/* Footer / Actions */}
                <div className="flex justify-end gap-6 mt-8 pt-6 border-t border-blue-400/20">
                    <button
                        onClick={onCancel}
                        onMouseEnter={() => { setFocusSection('actions'); setActionIndex(0); }}
                        className={`flex items-center gap-2 px-4 py-2 rounded transition-all
                            ${focusSection === 'actions' && actionIndex === 0
                                ? 'bg-white text-black font-bold shadow-[0_0_15px_white]'
                                : 'text-gray-400 hover:text-white'}
                        `}
                    >
                        <BButton className={`w-6 h-6 ${focusSection === 'actions' && actionIndex === 0 ? 'text-black' : 'text-white'}`} />
                        <span className="uppercase font-bold tracking-wider text-sm">Cancel</span>
                    </button>
                    <button
                        onClick={() => onSave(name, currentColor)}
                        onMouseEnter={() => { setFocusSection('actions'); setActionIndex(1); }}
                        className={`flex items-center gap-2 px-4 py-2 rounded transition-all
                            ${focusSection === 'actions' && actionIndex === 1
                                ? 'bg-white text-black font-bold shadow-[0_0_15px_white]'
                                : 'text-white hover:text-blue-200'}
                        `}
                    >
                        <AButton className={`w-6 h-6 ${focusSection === 'actions' && actionIndex === 1 ? 'text-black' : 'text-white'}`} />
                        <span className="uppercase font-bold tracking-wider text-sm">Accept</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PlayerSettings;

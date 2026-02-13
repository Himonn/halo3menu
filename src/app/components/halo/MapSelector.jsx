import React, { useState, useEffect } from 'react';
import { AButton, BButton } from './XboxIcons';

const MAPS = [
    { name: 'Assembly', description: 'A massive Covenant factory on a stormy world.' },
    { name: 'Avalanche', description: 'A snowy canyon, perfect for vehicular combat.' },
    { name: 'Blackout', description: 'A frozen research station in the arctic.' },
    { name: 'Citadel', description: 'A small, symmetrical Forerunner structure.' },
    { name: 'Cold Storage', description: 'An ancient Forerunner facility, frozen in time.' },
    { name: 'Construct', description: 'A massive orbital elevator.' },
    { name: 'Edge', description: 'A precipitous Forerunner structure.' },
    { name: 'Epitaph', description: 'A cathedral-like spire in the desert.' },
    { name: 'Foundry', description: 'An industrial warehouse, the ultimate Forge canvas.' },
    { name: 'Ghost Town', description: 'An abandoned water purification plant.' },
    { name: 'Guardian', description: 'A forest sanctuary held high in the trees.' },
    { name: 'Heretic', description: 'A Covenant holy site on a gas giant.' },
    { name: 'High Ground', description: 'A fortified beachhead.' },
    { name: 'Icebox', description: 'Compact urban combat in a frozen city.' },
    { name: 'Isolation', description: 'A containment facility infested by the Flood.' },
    { name: 'Last Resort', description: 'A coastal industrial complex.' },
    { name: 'Longshore', description: 'A dockside facility, ripe for assault.' },
    { name: 'Narrows', description: 'A bridge spanning a massive chasm.' },
    { name: 'Orbital', description: 'A space station hallway, tight and dangerous.' },
    { name: 'Rat\'s Nest', description: 'A winding tunnel network deep underground.' },
    { name: 'Sandbox', description: 'A vast desert playground.' },
    { name: 'Sandtrap', description: 'An excavated Forerunner ruin in the sand.' },
    { name: 'Snowbound', description: 'Hostile conditions did not prevent the Covenant from seeking salvage on this buried Forerunner construct. 2-8 players' },
    { name: 'Standoff', description: 'A satellite dish installation.' },
    { name: 'The Pit', description: 'A UNSC training facility.' },
    { name: 'Valhalla', description: 'A lush canyon with a river running through it.' },
    { name: 'Waterfall', description: 'A scenic sanctuary with a massive waterfall.' },
];

const MapSelector = ({ onSelect, onBack, currentMap }) => {
    // Find initial index based on currentMap, or default to Valhalla or 0
    const initialIndex = MAPS.findIndex(m => m.name.toUpperCase() === currentMap?.toUpperCase());
    const [selectedIndex, setSelectedIndex] = useState(initialIndex !== -1 ? initialIndex : 0);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowUp') {
                setSelectedIndex(prev => Math.max(0, prev - 1));
            } else if (e.key === 'ArrowDown') {
                setSelectedIndex(prev => Math.min(MAPS.length - 1, prev + 1));
            } else if (e.key === 'Enter') {
                onSelect(MAPS[selectedIndex].name);
            } else if (e.key === 'Escape' || e.key === 'Backspace') {
                onBack();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedIndex, onSelect, onBack]);

    const selectedMap = MAPS[selectedIndex];

    // Scroll selected item into view
    useEffect(() => {
        const el = document.getElementById(`map-item-${selectedIndex}`);
        if (el) {
            el.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        }
    }, [selectedIndex]);

    return (
        <div className="absolute inset-0 z-50 bg-[#050b1b] flex flex-col font-halo-regular text-white">
            {/* Header */}
            <div className="h-[12%] flex flex-col justify-end px-16 pb-2 border-b border-white/10 bg-gradient-to-r from-black/80 to-transparent">
                <h1 className="text-2xl tracking-widest text-white uppercase">Select Map</h1>
            </div>

            {/* Content Body */}
            <div className="flex-1 flex flex-row overflow-hidden">
                {/* Left: Map List */}
                <div className="w-[45%] bg-black/40 h-full overflow-y-auto no-scrollbar py-4 px-16">
                    {MAPS.map((map, idx) => (
                        <div
                            key={map.name}
                            id={`map-item-${idx}`}
                            className={`
                                py-1 text-lg uppercase tracking-wide cursor-pointer transition-colors duration-100 ease-linear
                                ${idx === selectedIndex
                                    ? 'bg-white/10 text-white pl-4 border-l-4 border-orange-500' // Highlight
                                    : 'text-[#8db6ef]/60 pl-0 hover:text-[#8db6ef]'} 
                            `}
                            onClick={() => setSelectedIndex(idx)}
                            onDoubleClick={() => onSelect(map.name)}
                        >
                            {map.name}
                        </div>
                    ))}
                </div>

                {/* Right: Preview Pane */}
                <div className="w-[55%] bg-gradient-to-b from-[#102347]/50 to-black/80 p-12 flex flex-col gap-4">
                    {/* Image Preview Box */}
                    <div className="w-full aspect-video bg-black border-2 border-white/10 shadow-2xl relative overflow-hidden group">
                        {/* Placeholder Image Logic */}
                        <div className="absolute inset-0 flex items-center justify-center bg-[#0a1426]">
                            <span className="text-white/20 font-bold uppercase tracking-widest text-sm">
                                [ {selectedMap.name} Image ]
                            </span>
                        </div>
                        {/* Scanline effect */}
                        <div className="absolute inset-0 bg-[url('/scanlines.png')] opacity-20 pointer-events-none"></div>
                    </div>

                    {/* Description */}
                    <div className="flex flex-col gap-2">
                        <h2 className="text-3xl uppercase text-white tracking-wider">{selectedMap.name}</h2>
                        <p className="text-[#8db6ef] text-lg leading-snug">
                            {selectedMap.description || "No description available."}
                        </p>
                    </div>
                </div>
            </div>

            {/* Footer / Legend */}
            <div className="h-[8%] bg-black/60 border-t border-white/10 flex items-center px-16 gap-8">
                <div className="flex items-center gap-2">
                    <AButton className="w-6 h-6" />
                    <span className="text-white font-bold tracking-wide text-sm">Select</span>
                </div>
                <div className="flex items-center gap-2">
                    <BButton className="w-6 h-6" />
                    <span className="text-white font-bold tracking-wide text-sm">Back</span>
                </div>
            </div>
        </div>
    );
};

export default MapSelector;

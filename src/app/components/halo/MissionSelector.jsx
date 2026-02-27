import React, { useState, useEffect } from 'react';
import { AButton, BButton } from './XboxIcons';

const MISSIONS = [
    { id: 'arrival', label: 'ARRIVAL', description: "Brace for impact.", locked: false },
    { id: 'sierra117', label: 'SIERRA 117', description: "Finish the fight.", locked: false },
    { id: 'crowsnest', label: "CROW'S NEST", description: "Defend the base.", locked: false },
    { id: 'tsavohighway', label: 'TSAVO HIGHWAY', description: "Mount up.", locked: false },
    { id: 'thestorm', label: 'THE STORM', description: "Reclaim the city.", locked: false },
    { id: 'floodgate', label: 'FLOODGATE', description: "Stop the infestation.", locked: false },
    { id: 'theark', label: 'THE ARK', description: "Search the sand.", locked: false },
    { id: 'covenant', label: 'THE COVENANT', description: "Breach the barrier.", locked: true }, // Placeholder lock
    { id: 'cortana', label: 'CORTANA', description: "Cleanse the high charity.", locked: false },
    { id: 'halo', label: 'HALO', description: "Light the ring.", locked: false }
];

const MissionSelector = ({ currentMission, onSelect, onBack }) => {
    // Find index of current mission or default to first
    const initialIndex = Math.max(0, MISSIONS.findIndex(m => m.label === currentMission));
    const [selectedIndex, setSelectedIndex] = useState(initialIndex);

    useEffect(() => {
        function handleKeyDown(event) {
            event.stopPropagation();
            event.preventDefault(); // Prevent default scrolling

            if (event.key === 'ArrowUp') {
                setSelectedIndex(prev => Math.max(0, prev - 1));
            } else if (event.key === 'ArrowDown') {
                setSelectedIndex(prev => Math.min(MISSIONS.length - 1, prev + 1));
            } else if (event.key === 'Enter' || event.key === 'a') {
                const mission = MISSIONS[selectedIndex];
                if (!mission.locked) {
                    onSelect(mission.label);
                }
            } else if (event.key === 'Escape' || event.key === 'Backspace' || event.key === 'b') {
                onBack();
            }
        }

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedIndex, onSelect, onBack]);

    const selectedMission = MISSIONS[selectedIndex];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center font-halo-regular">
            {/* Background Overlay */}
            <div className="absolute inset-0 bg-[#0b1221]/95 backdrop-blur-md"></div>

            {/* Main Container */}
            <div className="relative w-full h-full flex flex-col pt-32">

                {/* Header Bar */}
                <div className="w-full bg-gradient-to-r from-black/80 via-black/60 to-transparent border-t border-b border-white/20 py-2 mb-8 pl-32">
                    <h2 className="text-4xl uppercase tracking-widest text-white drop-shadow-md">SELECT MISSION</h2>
                </div>

                {/* Content Area */}
                <div className="flex flex-row items-start pl-32 w-full h-[500px]">

                    {/* Left Column: Missions List */}
                    <div className="flex flex-col w-[400px]">
                        {MISSIONS.map((mission, idx) => {
                            const isActive = selectedIndex === idx;
                            return (
                                <div
                                    key={mission.id}
                                    className={`
                                        text-2xl uppercase tracking-wide cursor-pointer py-1 px-4 mb-0.5 transition-all
                                        ${isActive
                                            ? 'text-white bg-gradient-to-r from-[#c35921] to-transparent font-bold'
                                            : (mission.locked ? 'text-gray-600' : 'text-[#8db6ef] hover:bg-white/5')}
                                    `}
                                    onMouseEnter={() => setSelectedIndex(idx)}
                                    onClick={() => {
                                        if (!mission.locked) onSelect(mission.label);
                                    }}
                                >
                                    {mission.locked ? '[LOCKED]' : mission.label}
                                </div>
                            );
                        })}
                    </div>

                    {/* Right Column: Mission Details */}
                    <div className="ml-auto mr-32 w-[500px] flex flex-col items-start text-left">

                        {/* Image Placeholder */}
                        <div className="w-full h-[200px] bg-black/50 border border-white/20 mb-4 flex items-center justify-center overflow-hidden relative">
                            {/* Gradient Overlay on Image */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                            <span className="text-white/20 text-4xl uppercase font-bold z-0">{selectedMission.label}</span>
                        </div>

                        {/* Description */}
                        <p className="text-white text-xl leading-relaxed drop-shadow-md font-halo-regular mb-16">
                            {selectedMission.description}
                        </p>

                        {/* Scores / Difficulty Placeholders */}
                        <div className="flex flex-row gap-8">
                            <div className="flex flex-col items-center">
                                <div className="w-24 h-24 bg-white/10 rounded-full mb-2 flex items-center justify-center border border-white/10">
                                    <span className="text-4xl">💀</span>
                                </div>
                                <span className="text-[#8db6ef] text-sm uppercase tracking-wider font-bold">SOLO</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="w-24 h-24 bg-white/10 rounded-full mb-2 flex items-center justify-center border border-white/10">
                                    <span className="text-4xl text-blue-400">💀</span>
                                </div>
                                <span className="text-[#8db6ef] text-sm uppercase tracking-wider font-bold">CO-OP</span>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Footer Bar */}
                <div className="fixed bottom-12 w-full flex flex-row items-center justify-center gap-12 z-10 pointer-events-none">
                    <div className="flex flex-row items-center gap-2 bg-black/50 px-4 py-1 rounded-full border border-white/10">
                        <AButton className="w-8 h-8" />
                        <span className="text-white text-xl font-bold uppercase tracking-wider">Select</span>
                    </div>
                    <div className="flex flex-row items-center gap-2 bg-black/50 px-4 py-1 rounded-full border border-white/10">
                        <BButton className="w-8 h-8" />
                        <span className="text-white text-xl font-bold uppercase tracking-wider">Back</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MissionSelector;

import React from 'react';
import UniversalSelector from './UniversalSelector';

const MISSIONS = [
    { value: 'ARRIVAL', label: 'ARRIVAL', description: "Brace for impact.", locked: false },
    { value: 'SIERRA 117', label: 'SIERRA 117', description: "Finish the fight.", locked: false },
    { value: "CROW'S NEST", label: "CROW'S NEST", description: "Defend the base.", locked: false },
    { value: 'TSAVO HIGHWAY', label: 'TSAVO HIGHWAY', description: "Mount up.", locked: false },
    { value: 'THE STORM', label: 'THE STORM', description: "Reclaim the city.", locked: false },
    { value: 'FLOODGATE', label: 'FLOODGATE', description: "Stop the infestation.", locked: false },
    { value: 'THE ARK', label: 'THE ARK', description: "Search the sand.", locked: false },
    { value: 'THE COVENANT', label: 'THE COVENANT', description: "Breach the barrier.", locked: true }, // Placeholder lock
    { value: 'CORTANA', label: 'CORTANA', description: "Cleanse the high charity.", locked: false },
    { value: 'HALO', label: 'HALO', description: "Light the ring.", locked: false }
];

const MissionSelector = ({ currentMission, onSelect, onBack }) => {
    return (
        <UniversalSelector
            title="Select Mission"
            items={MISSIONS}
            selectedValue={currentMission}
            onSelect={onSelect}
            onBack={onBack}
            renderPreview={(item) => (
                <div className="w-[500px] flex flex-col items-start mt-2 ml-8">

                    {/* Image Placeholder */}
                    <div className="w-[450px] h-[200px] bg-black/50 border border-white/20 mb-4 flex items-center justify-center overflow-hidden relative shadow-lg">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                        <span className="text-white/20 text-4xl uppercase font-bold z-0">{item.label}</span>
                    </div>

                    {/* Description */}
                    <p className="text-white text-xl leading-relaxed drop-shadow-md font-halo-regular mb-16 w-[450px]">
                        {item.description}
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
            )}
        />
    );
};

export default MissionSelector;

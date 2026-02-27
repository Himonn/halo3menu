import React from 'react';
import UniversalSelector from './UniversalSelector';

const DIFFICULTY_OPTIONS = [
    {
        value: 'EASY',
        label: 'EASY',
        description: 'Laugh as helpless victims flee in terror from their inevitable slaughter. The game basically plays itself.'
    },
    {
        value: 'NORMAL',
        label: 'NORMAL',
        description: 'Face firm resistance from competent, determined enemies, but burn through enough ammo and you will eventually triumph.'
    },
    {
        value: 'HEROIC',
        label: 'HEROIC',
        description: 'Fight against formidable foes that will truly test your skill and wits; this is the way Halo is meant to be played.'
    },
    {
        value: 'LEGENDARY',
        label: 'LEGENDARY',
        description: 'Tremble as teeming hordes of invincible alien monsters punish the slightest error with instant death... again and again.'
    }
];

const DifficultySelector = ({ currentDifficulty, onSelect, onBack }) => {
    return (
        <UniversalSelector
            title="Select Difficulty"
            items={DIFFICULTY_OPTIONS}
            selectedValue={currentDifficulty}
            onSelect={onSelect}
            onBack={onBack}
            renderPreview={(item) => (
                <div className="w-[500px] flex flex-col items-start mt-2">
                    <div className="w-[450px] aspect-[2/1] bg-black/50 border border-white/20 mb-4 flex justify-center items-center shadow-lg relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-tr from-[#1b2c45]/50 to-transparent"></div>
                        <span className="text-white/40 uppercase tracking-widest font-bold z-10">[Difficulty Image Placeholder]</span>
                    </div>
                    <p className="text-white text-base leading-snug w-[450px] font-normal drop-shadow-md">
                        {item.description}
                    </p>
                </div>
            )}
        />
    );
};

export default DifficultySelector;

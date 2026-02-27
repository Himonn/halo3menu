import React, { useState } from 'react';
import BaseLobby from '../BaseLobby';
import MissionSelector from '../MissionSelector';
import DifficultySelector from '../DifficultySelector';
import { XButton } from '../XboxIcons';

const CampaignLobby = (props) => {
    const [currentMission, setCurrentMission] = useState('ARRIVAL');
    const [difficulty, setDifficulty] = useState('NORMAL');
    const [showMissionSelector, setShowMissionSelector] = useState(false);
    const [showDifficultySelector, setShowDifficultySelector] = useState(false);

    const menuItems = [
        { label: 'SWITCH LOBBY', type: 'header_action', action: 'switch_lobby' },
        { label: `NETWORK: ${"XBOX LIVE (FRIENDS ONLY)"}`, action: 'network' }, // Network state managed in BaseLobby primarily, but label here
        {
            label: `MISSION: ${currentMission}`,
            onClick: () => setShowMissionSelector(true)
        },
        {
            label: `DIFFICULTY: ${difficulty}`,
            onClick: () => setShowDifficultySelector(true)
        },
        { label: 'START GAME', onClick: () => console.log('Start Game') }
    ];

    return (
        <BaseLobby
            {...props}
            title="CAMPAIGN LOBBY"
            menuItems={menuItems}
            defaultIndex={4}
            isModalOpen={showMissionSelector || showDifficultySelector}
        >
            {/* Mission Selector Overlay */}
            {showMissionSelector && (
                <MissionSelector
                    currentMission={currentMission}
                    onSelect={(mission) => {
                        setCurrentMission(mission);
                        setShowMissionSelector(false);
                    }}
                    onBack={() => setShowMissionSelector(false)}
                />
            )}

            {/* Difficulty Selector Overlay */}
            {showDifficultySelector && (
                <DifficultySelector
                    currentDifficulty={difficulty}
                    onSelect={(diff) => {
                        setDifficulty(diff);
                        setShowDifficultySelector(false);
                    }}
                    onBack={() => setShowDifficultySelector(false)}
                />
            )}

            {/* Preview Area */}
            <div className="relative w-full max-w-[600px] h-full mb-8">
                <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-1 text-[#8db6ef] uppercase font-bold text-sm">
                        <XButton className="w-4 h-4" />
                        <span>Edit options</span>
                    </div>
                    <div className="border-2 border-[#1c3a6e] bg-[#050b1b] p-1 w-[400px]">
                        <div className="bg-black/50 aspect-video w-full flex items-center justify-center text-[#8db6ef]/50 font-bold uppercase tracking-widest border border-white/10">
                            [Mission Image]
                        </div>
                        <div className="text-white font-bold uppercase text-sm mt-1 px-1">
                            {currentMission} on {difficulty}
                        </div>
                    </div>
                </div>
            </div>
        </BaseLobby>
    );
};

export default CampaignLobby;

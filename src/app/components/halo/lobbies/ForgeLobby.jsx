import React, { useState } from 'react';
import BaseLobby from '../BaseLobby';
import MapSelector from '../MapSelector';
import { XButton } from '../XboxIcons';

const ForgeLobby = (props) => {
    const [currentMap, setCurrentMap] = useState('SANDTRAP');
    const [gameType, setGameType] = useState('FORGE');
    const [showMapSelector, setShowMapSelector] = useState(false);

    const menuItems = [
        { label: 'SWITCH LOBBY', type: 'header_action', action: 'switch_lobby' },
        { label: `NETWORK: ${"XBOX LIVE (FRIENDS ONLY)"}`, action: 'network' },
        { label: `GAME: ${gameType}` },
        { label: `MAP: ${currentMap}`, onClick: () => setShowMapSelector(true) },
        { label: 'START FORGE' },
        { label: 'FORGE OPTIONS', icon: XButton }
    ];

    return (
        <BaseLobby
            {...props}
            title="FORGE LOBBY"
            menuItems={menuItems}
            defaultIndex={4}
            isModalOpen={showMapSelector}
        >
            {showMapSelector && (
                <MapSelector
                    currentMap={currentMap}
                    onSelect={(map) => {
                        setCurrentMap(map);
                        setShowMapSelector(false);
                    }}
                    onBack={() => setShowMapSelector(false)}
                />
            )}

            <div className="relative w-full max-w-[600px] h-full mb-8">
                <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-1 text-[#8db6ef] uppercase font-bold text-sm">
                        <XButton className="w-4 h-4" />
                        <span>Edit options</span>
                    </div>
                    <div className="border-2 border-[#1c3a6e] bg-[#050b1b] p-1 w-[400px]">
                        <div className="bg-black/50 aspect-video w-full flex items-center justify-center text-[#8db6ef]/50 font-bold uppercase tracking-widest border border-white/10">
                            [Map Image]
                        </div>
                        <div className="text-white font-bold uppercase text-sm mt-1 px-1">
                            {gameType} on {currentMap}
                        </div>
                    </div>
                </div>
            </div>
        </BaseLobby>
    );
};

export default ForgeLobby;

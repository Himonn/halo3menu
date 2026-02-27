import React, { useState } from 'react';
import BaseLobby from '../BaseLobby';
import { XButton } from '../XboxIcons';

const TheaterLobby = (props) => {
    const [film, setFilm] = useState('THE ARK');

    const menuItems = [
        { label: 'SWITCH LOBBY', type: 'header_action', action: 'switch_lobby' },
        { label: `NETWORK: ${"LOCAL"}`, action: 'network' },
        { label: `FILM: ${film}`, onClick: () => console.log('Select Film') },
        { label: 'START FILM' },
        { label: 'THEATER OPTIONS', icon: XButton }
    ];

    return (
        <BaseLobby {...props} title="THEATER LOBBY" menuItems={menuItems} defaultIndex={3}>
            <div className="relative w-full max-w-[600px] h-full mb-8">
                <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-1 text-[#8db6ef] uppercase font-bold text-sm">
                        <XButton className="w-4 h-4" />
                        <span>Edit options</span>
                    </div>
                    <div className="border-2 border-[#1c3a6e] bg-[#050b1b] p-1 w-[400px]">
                        <div className="bg-black/50 aspect-video w-full flex items-center justify-center text-[#8db6ef]/50 font-bold uppercase tracking-widest border border-white/10">
                            [Film Preview]
                        </div>
                        <div className="text-white font-bold uppercase text-sm mt-1 px-1">
                            {film}
                        </div>
                    </div>
                </div>
            </div>
        </BaseLobby>
    );
};

export default TheaterLobby;

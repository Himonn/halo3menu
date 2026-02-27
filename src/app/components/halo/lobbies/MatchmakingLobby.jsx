import React, { useState } from 'react';
import BaseLobby from '../BaseLobby';
import WorldMap from '../WorldMap';
import { XButton } from '../XboxIcons';

const MatchmakingLobby = (props) => {
    const [playlist, setPlaylist] = useState('SOCIAL SLAYER');

    const menuItems = [
        { label: 'SWITCH LOBBY', type: 'header_action', action: 'switch_lobby' },
        { label: `NETWORK: ${"XBOX LIVE (FRIENDS ONLY)"}`, action: 'network' },
        { label: `PLAYLIST: ${playlist}`, onClick: () => console.log('Playlist Select') },
        { label: 'START MATCHMAKING', onClick: () => console.log('Start Matchmaking') },
        { label: 'EDIT MATCHMAKING OPTIONS', icon: XButton }
    ];

    return (
        <BaseLobby {...props} title="MATCHMAKING LOBBY" variant="matchmaking" menuItems={menuItems} defaultIndex={3}>
            <div className="relative w-full max-w-[600px] h-full mb-8">
                <div className="h-[300px]">
                    <WorldMap />
                </div>
            </div>
        </BaseLobby>
    );
};

export default MatchmakingLobby;

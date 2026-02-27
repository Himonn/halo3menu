import React, { useState } from 'react';
import UniversalSelector from './UniversalSelector';
import MaxPartySizeSelector from './MaxPartySizeSelector';

const NETWORK_MODES = [
    {
        id: 'xbox_live',
        label: 'XBOX LIVE',
        description: "Play on Xbox LIVE and choose privacy settings for who may join your party.",
        subDescription: "Play on Xbox LIVE and choose privacy settings for who may join your party.",
        icon: null,
        hasSubmenu: true,
        options: [
            {
                id: 'open',
                label: 'OPEN PARTY',
                value: 'XBOX LIVE (OPEN PARTY)',
                description: "Friends and recent players may join your party."
            },
            {
                id: 'friends',
                label: 'FRIENDS ONLY',
                value: 'XBOX LIVE (FRIENDS ONLY)',
                description: "Your friends and friends of any player in your party may join."
            },
            {
                id: 'invite',
                label: 'INVITE ONLY',
                value: 'XBOX LIVE (INVITE ONLY)',
                description: "Players must be invited to join your party. Any player in the party may send an invite."
            }
        ]
    },
    {
        id: 'system_link',
        label: 'SYSTEM LINK',
        description: "Connect multiple Xbox 360 consoles to play over your local area network.",
        hasSubmenu: true,
        value: "SYSTEM LINK",
        options: [
            {
                id: 'host',
                label: 'HOST GAME',
                value: 'SYSTEM LINK (HOST)',
                description: "Host a game on System Link. Only players on your local area network may join."
            },
            {
                id: 'find',
                label: 'FIND GAME...',
                value: 'SYSTEM LINK (FIND)',
                description: "Find games that are being hosted on System Link."
            }
        ]
    },
    {
        id: 'local',
        label: 'LOCAL',
        description: "Play only on this Xbox 360 console. Up to 4 players may play splitscreen.",
        hasSubmenu: false,
        value: "LOCAL",
        options: []
    }
];

const NetworkSelector = ({ currentNetwork, onSelect, onBack }) => {
    const [showMaxPartySelector, setShowMaxPartySelector] = useState(false);
    const [maxPartySize, setMaxPartySize] = useState(16); // Default 16

    return (
        <UniversalSelector
            title="Select Network Mode"
            items={NETWORK_MODES}
            selectedValue={currentNetwork}
            onSelect={onSelect}
            onBack={onBack}
            extraKeyHandlers={{
                'x': (activeItem) => {
                    if (activeItem.id === 'xbox_live') {
                        setShowMaxPartySelector(true);
                    }
                }
            }}
            renderPreview={(item, subItem, isSubmenuActive) => {
                const activeDescription = (isSubmenuActive && subItem && subItem.description)
                    ? subItem.description
                    : item.description;

                return (
                    <div className="ml-16 w-[400px] flex flex-col items-center text-center p-8 bg-gradient-to-b from-[#1a263b] to-transparent rounded-lg border border-white/5">
                        {item.icon && <item.icon className="w-48 h-24 mb-6 fill-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]" />}

                        {!item.icon && (
                            <div className="text-4xl text-white font-bold mb-4">{item.label}</div>
                        )}

                        <p className="text-white text-lg leading-snug">
                            {activeDescription}
                        </p>
                    </div>
                );
            }}
        >
            {/* Overlays built into the selector wrapper */}
            {showMaxPartySelector && (
                <MaxPartySizeSelector
                    currentMax={maxPartySize}
                    onSelect={(size) => {
                        setMaxPartySize(size);
                        setShowMaxPartySelector(false);
                    }}
                    onBack={() => setShowMaxPartySelector(false)}
                />
            )}
        </UniversalSelector>
    );
};

export default NetworkSelector;

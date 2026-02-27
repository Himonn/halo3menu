import React from 'react';
import UniversalSelector from './UniversalSelector';

const MAPS = [
    { value: 'Assembly', label: 'Assembly', description: 'A massive Covenant factory on a stormy world.' },
    { value: 'Avalanche', label: 'Avalanche', description: 'A snowy canyon, perfect for vehicular combat.' },
    { value: 'Blackout', label: 'Blackout', description: 'A frozen research station in the arctic.' },
    { value: 'Citadel', label: 'Citadel', description: 'A small, symmetrical Forerunner structure.' },
    { value: 'Cold Storage', label: 'Cold Storage', description: 'An ancient Forerunner facility, frozen in time.' },
    { value: 'Construct', label: 'Construct', description: 'A massive orbital elevator.' },
    { value: 'Edge', label: 'Edge', description: 'A precipitous Forerunner structure.' },
    { value: 'Epitaph', label: 'Epitaph', description: 'A cathedral-like spire in the desert.' },
    { value: 'Foundry', label: 'Foundry', description: 'An industrial warehouse, the ultimate Forge canvas.' },
    { value: 'Ghost Town', label: 'Ghost Town', description: 'An abandoned water purification plant.' },
    { value: 'Guardian', label: 'Guardian', description: 'A forest sanctuary held high in the trees.' },
    { value: 'Heretic', label: 'Heretic', description: 'A Covenant holy site on a gas giant.' },
    { value: 'High Ground', label: 'High Ground', description: 'A fortified beachhead.' },
    { value: 'Icebox', label: 'Icebox', description: 'Compact urban combat in a frozen city.' },
    { value: 'Isolation', label: 'Isolation', description: 'A containment facility infested by the Flood.' },
    { value: 'Last Resort', label: 'Last Resort', description: 'A coastal industrial complex.' },
    { value: 'Longshore', label: 'Longshore', description: 'A dockside facility, ripe for assault.' },
    { value: 'Narrows', label: 'Narrows', description: 'A bridge spanning a massive chasm.' },
    { value: 'Orbital', label: 'Orbital', description: 'A space station hallway, tight and dangerous.' },
    { value: 'Rat\'s Nest', label: 'Rat\'s Nest', description: 'A winding tunnel network deep underground.' },
    { value: 'Sandbox', label: 'Sandbox', description: 'A vast desert playground.' },
    { value: 'Sandtrap', label: 'Sandtrap', description: 'An excavated Forerunner ruin in the sand.' },
    { value: 'Snowbound', label: 'Snowbound', description: 'Hostile conditions did not prevent the Covenant from seeking salvage on this buried Forerunner construct. 2-8 players' },
    { value: 'Standoff', label: 'Standoff', description: 'A satellite dish installation.' },
    { value: 'The Pit', label: 'The Pit', description: 'A UNSC training facility.' },
    { value: 'Valhalla', label: 'Valhalla', description: 'A lush canyon with a river running through it.' },
    { value: 'Waterfall', label: 'Waterfall', description: 'A scenic sanctuary with a massive waterfall.' },
];

const MapSelector = ({ onSelect, onBack, currentMap }) => {
    // UniversalSelector matches value exactly, so we map case-insensitive
    const matchedMap = MAPS.find(m => m.value.toUpperCase() === currentMap?.toUpperCase())?.value || 'Valhalla';

    return (
        <UniversalSelector
            title="Select Map"
            items={MAPS}
            selectedValue={matchedMap}
            onSelect={onSelect}
            onBack={onBack}
            renderPreview={(item) => (
                <div className="w-[500px] h-full flex flex-col gap-4 ml-8 mt-2">
                    {/* Image Preview Box */}
                    <div className="w-full aspect-video bg-black border-2 border-white/10 shadow-2xl relative overflow-hidden group">
                        <div className="absolute inset-0 flex items-center justify-center bg-[#0a1426]">
                            <span className="text-white/20 font-bold uppercase tracking-widest text-sm">
                                [ {item.label} Image ]
                            </span>
                        </div>
                        <div className="absolute inset-0 bg-[url('/scanlines.png')] opacity-20 pointer-events-none"></div>
                    </div>

                    {/* Description */}
                    <div className="flex flex-col gap-2">
                        <h2 className="text-3xl uppercase text-white tracking-wider">{item.label}</h2>
                        <p className="text-[#8db6ef] text-lg leading-snug">
                            {item.description || "No description available."}
                        </p>
                    </div>
                </div>
            )}
        />
    );
};

export default MapSelector;

import React from 'react';

const WorldMap = () => {
    // Simplified continent paths for a visual representation
    // These are rough approximations to create the shape of the world
    const paths = {
        northAmerica: "M15 15 L25 15 L35 25 L35 40 L25 45 L15 35 Z M10 10 L40 10 L40 50 L10 50 Z", // Rough bounding box style or better paths if possible manually
        // Since manually drawing detailed continents is hard, I will use a very simplified abstract geometric representation
        // that looks like a tactical map.
    };

    return (
        <div className="relative w-full h-full bg-[#051025] overflow-hidden rounded border border-blue-500/30">
            {/* Grid Background */}
            <div className="absolute inset-0 z-0"
                style={{
                    backgroundImage: 'linear-gradient(rgba(0, 100, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 100, 255, 0.1) 1px, transparent 1px)',
                    backgroundSize: '20px 20px'
                }}
            />

            {/* Map SVG */}
            <svg className="absolute inset-0 w-full h-full z-10 p-2 opacity-60" viewBox="0 0 200 100" preserveAspectRatio="none">
                <defs>
                    <filter id="glow">
                        <feGaussianBlur stdDeviation="1" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* World Map Paths - Simplified Abstract Representation */}
                <g fill="rgba(60, 130, 246, 0.3)" stroke="rgba(60, 130, 246, 0.6)" strokeWidth="0.5" filter="url(#glow)">
                    {/* North America */}
                    <path d="M20,15 Q35,10 50,15 L60,25 L50,45 L35,40 L25,30 Z" />
                    {/* South America */}
                    <path d="M55,50 L75,50 L80,75 L65,90 L50,65 Z" />
                    {/* Europe */}
                    <path d="M90,15 L110,10 L120,25 L105,30 L95,25 Z" />
                    {/* Africa */}
                    <path d="M95,35 L125,35 L135,65 L110,85 L85,55 Z" />
                    {/* Asia */}
                    <path d="M125,15 L170,15 L185,35 L170,55 L135,45 L130,25 Z" />
                    {/* Australia */}
                    <path d="M150,65 L180,65 L175,85 L145,80 Z" />
                </g>

                {/* Simulated Data Points */}
                <g fill="#fbbf24">
                    <circle cx="40" cy="30" r="1.5" className="animate-ping" style={{ animationDuration: '3s' }} />
                    <circle cx="45" cy="35" r="1" className="animate-pulse" />
                    <circle cx="100" cy="20" r="1.5" className="animate-ping" style={{ animationDuration: '2s', animationDelay: '0.5s' }} />
                    <circle cx="150" cy="30" r="1" className="animate-pulse" />
                    <circle cx="160" cy="70" r="1.5" className="animate-ping" style={{ animationDuration: '4s' }} />
                    <circle cx="70" cy="60" r="1" className="animate-pulse" />
                    <circle cx="110" cy="50" r="0.8" className="animate-pulse" />
                    <circle cx="30" cy="25" r="1" className="animate-pulse" />
                </g>
            </svg>

            {/* Scanning Line */}
            <div className="absolute top-0 bottom-0 w-[2px] bg-blue-400/50 shadow-[0_0_10px_rgba(59,130,246,0.8)] z-20 animate-scan"></div>

            {/* Vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_50%,rgba(5,16,37,0.6)_100%)] z-30"></div>

            <style jsx>{`
                @keyframes scan {
                    0% { left: 0%; opacity: 0; }
                    10% { opacity: 1; }
                    90% { opacity: 1; }
                    100% { left: 100%; opacity: 0; }
                }
                .animate-scan {
                    animation: scan 4s linear infinite;
                }
            `}</style>
        </div>
    );
};

export default WorldMap;

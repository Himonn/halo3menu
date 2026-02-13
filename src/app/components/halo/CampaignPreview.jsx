import React from 'react';

const CampaignPreview = () => {
    return (
        <div className="w-full h-full relative font-halo-regular">
            {/* Image Container */}
            <div className="absolute inset-0 bg-[#051025] overflow-hidden rounded border border-blue-500/30">
                {/* Placeholder for Campaign Image */}
                <div className="w-full h-[75%] bg-gradient-to-t from-black/80 to-transparent relative">
                    {/* If we had an image it would go here. For now using a colored placeholder that looks atmospheric */}
                    <div className="absolute inset-0 bg-blue-900/40"></div>
                    {/* Mock content to look like the screenshot's image */}
                    <div className="absolute bottom-4 left-4 flex gap-2 opacity-60">
                        <div className="w-8 h-12 bg-white/20 transform skew-x-[-10deg]"></div>
                        <div className="w-8 h-12 bg-white/10 transform skew-x-[-10deg]"></div>
                    </div>
                </div>

                {/* Bottom Text Area */}
                <div className="absolute bottom-0 w-full h-[25%] bg-[#0f1f3d]/90 flex flex-col justify-center pl-3 border-t border-white/20">
                    <p className="text-white text-lg leading-none">Arrival on Heroic</p>
                    <p className="text-[#8db6ef] text-sm mt-1">at Mission Start</p>
                </div>

                {/* Difficulty Shield Overlay */}
                <div className="absolute bottom-[20%] left-2 w-16 h-16">
                    {/* Detailed Shield SVG */}
                    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
                        <path d="M50 5 L90 20 L80 70 L50 95 L20 70 L10 20 Z" fill="#2d3748" stroke="#a0aec0" strokeWidth="2" />
                        {/* Swords */}
                        <path d="M30 30 L70 70" stroke="white" strokeWidth="4" strokeLinecap="round" />
                        <path d="M70 30 L30 70" stroke="white" strokeWidth="4" strokeLinecap="round" />
                        {/* Skull/Face */}
                        <circle cx="50" cy="50" r="10" fill="#a0aec0" />
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default CampaignPreview;

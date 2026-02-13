import React from 'react';

export const YButton = ({ className = "w-6 h-6" }) => (
    <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="45" fill="#FBB03B" stroke="#C48000" strokeWidth="4" />
        <path d="M50 65 V80 M50 65 L25 25 M50 65 L75 25" stroke="black" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
        {/* Shine effect for 3D look */}
        <ellipse cx="50" cy="20" rx="25" ry="10" fill="white" fillOpacity="0.3" />
    </svg>
);

export const AButton = ({ className = "w-6 h-6" }) => (
    <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="45" fill="#73D056" stroke="#489030" strokeWidth="4" />
        <text x="50" y="70" fontSize="50" fontWeight="bold" fill="black" textAnchor="middle">A</text>
        <ellipse cx="50" cy="20" rx="25" ry="10" fill="white" fillOpacity="0.3" />
    </svg>
);

export const BButton = ({ className = "w-6 h-6" }) => (
    <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="45" fill="#CA3538" stroke="#902020" strokeWidth="4" />
        <text x="50" y="70" fontSize="50" fontWeight="bold" fill="black" textAnchor="middle">B</text>
        <ellipse cx="50" cy="20" rx="25" ry="10" fill="white" fillOpacity="0.3" />
    </svg>
);

export const XButton = ({ className = "w-6 h-6" }) => (
    <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="45" fill="#3B82F6" stroke="#2050A0" strokeWidth="4" />
        <text x="50" y="70" fontSize="50" fontWeight="bold" fill="black" textAnchor="middle">X</text>
        <ellipse cx="50" cy="20" rx="25" ry="10" fill="white" fillOpacity="0.3" />
    </svg>
);

export const StartButton = ({ className = "w-6 h-6" }) => (
    <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Simple representation of the wedge/play shape of the start button */}
        <path d="M20 20 L80 50 L20 80 Z" fill="#D1D5DB" stroke="#4B5563" strokeWidth="4" />
    </svg>
);

export const BackButton = ({ className = "w-6 h-6" }) => (
    <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M80 50 L20 20 L20 80 Z" fill="#D1D5DB" stroke="#4B5563" strokeWidth="4" />
    </svg>
);

export const SpeakerIcon = ({ className = "w-4 h-4", active = false }) => (
    <svg viewBox="0 0 24 24" className={className} fill={active ? "white" : "#666"} xmlns="http://www.w3.org/2000/svg">
        <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
    </svg>
);

export const ConnectionIcon = ({ className = "w-4 h-4", quality = 4 }) => (
    <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="16" width="4" height="6" fill={quality >= 1 ? "#33cc33" : "#666"} />
        <rect x="7" y="12" width="4" height="10" fill={quality >= 2 ? "#33cc33" : "#666"} />
        <rect x="12" y="8" width="4" height="14" fill={quality >= 3 ? "#33cc33" : "#666"} />
        <rect x="17" y="4" width="4" height="18" fill={quality >= 4 ? "#33cc33" : "#666"} />
    </svg>
);

export const RankIcon = ({ className = "w-6 h-6", rank = 1 }) => (
    <div className={`relative flex items-center justify-center ${className}`}>
        <svg viewBox="0 0 24 24" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L4 14h16L12 2z" fill="#d4af37" stroke="#fff" strokeWidth="1" />
            <rect x="6" y="15" width="12" height="4" fill="#d4af37" stroke="#fff" strokeWidth="1" />
        </svg>
        <span className="absolute top-[40%] text-[8px] font-bold text-black drop-shadow-sm leading-none" style={{ transform: 'translateY(-50%)' }}>
            {rank}
        </span>
    </div>
);

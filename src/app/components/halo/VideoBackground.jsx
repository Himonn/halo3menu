import React, { useEffect, useState } from 'react';

const VideoBackground = ({ muted, video }) => {
    const [key, setKey] = useState(0);

    useEffect(() => {
        setKey(prevKey => prevKey + 1);
    }, [video]);

    return (
        <div className="relative h-screen">
            <video key={key} autoPlay loop muted={muted} className="w-full h-full object-cover">
                <source src={`https://s3.eu-west-2.amazonaws.com/himon.dev/backgrounds/${video}`} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <audio autoPlay loop muted={muted}>
                <source src="/halo/music.mp3" type="audio/mp3" />
                Your browser does not support the audio tag.
            </audio>
        </div>
    );
};

export default VideoBackground;

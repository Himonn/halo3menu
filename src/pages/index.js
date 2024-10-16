import { useState, useEffect } from "react";
import VideoBackground from "@/app/components/halo/VideoBackground";
import Title from "@/app/components/halo/Title";
import Controls from "@/app/components/halo/Controls";
import BungieLogo from "@/app/components/halo/BungieLogo";
import MenuContainer from "@/app/components/halo/MenuContainer";
import TitleLogoContainer from "@/app/components/halo/TitleLogoContainer";

const Home = () => {
    const [muted, setMuted] = useState(true);
    const [index, setIndex] = useState(0);
    const [backgrounds, setBackgrounds] = useState(['bg_0_hd.mp4', 'bg_chief_arbiter_hd.mp4', 'bg_chief_elite.mp4', 'bg_starship_hd.mp4', 'bg_warthog_hd.mp4']);

    const toggleMute = () => {
        setMuted(!muted);
    };

    const iterateBackground = () => {
        if (index >= backgrounds.length - 1){
            setIndex(0);
        } else {
            setIndex(index + 1);
        }
    };

    return (
        <div className="relative">
            <Controls toggleMute={toggleMute} muted={muted} iterateBackground={iterateBackground}/>
            <VideoBackground muted={muted} video={backgrounds[index]}/>
            <MenuContainer/>
            <TitleLogoContainer/>
        </div>
    );
};

export default Home;

import React, {useEffect, useState} from "react";
import BungieLogo from "@/app/components/halo/BungieLogo";
import Title from "@/app/components/halo/Title";

const TitleLogoContainer = () => {
    const [isSmallViewport, setIsSmallViewport] = useState(false);

    useEffect(() => {
        function handleResize() {
            setIsSmallViewport(window.innerWidth < 1128);
        }

        window.addEventListener('resize', handleResize);

        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <>
            {isSmallViewport ? (
                <div className={`absolute top-20 right-20`}>
                    <BungieLogo/>
                    <Title/>
                </div>
            ) : (
                <div className={`absolute bottom-20 right-20`}>
                    <Title/>
                    <BungieLogo/>
                </div>
            )}
        </>
    );
};

export default TitleLogoContainer;

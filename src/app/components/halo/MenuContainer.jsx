import Menu from "@/app/components/halo/Menu";
import React, {useEffect, useState} from "react";

const MenuContainer = () => {
    const [isSmallViewport, setIsSmallViewport] = useState(false);

    useEffect(() => {
        function handleResize() {
            setIsSmallViewport(window.innerWidth < 768);
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
                <div className={"absolute bottom-0 w-full min-w-[350px] bg-opacity-50 bg-[#050b1b] pt-1 pb-1"}>
                    <Menu/>
                    <ul>
                        <li className={`mt-1 border-b-[1px] border-white border-opacity-30`} key={'gap2'} style={{ height: '1px' }}></li>
                        <div className={`pl-2 flex flex-row pt-1 pb-1 text-white gap-2`}>
                            <p>{"> Settings"}</p>
                            <p>Y Friends</p>
                        </div>
                        <li className={`mt-1 border-b-[1px] border-white mb-10 border-opacity-30`} key={'gap3'} style={{ height: '1px' }}></li>
                    </ul>
                </div>
            ) : (
                <div className={"absolute bottom-0 left-40 min-w-[350px] bg-opacity-50 bg-[#050b1b] pt-1 pb-1"}>
                    <Menu/>
                    <ul>
                        <li className={`mt-1 border-b-[1px] border-white border-opacity-30`} key={'gap2'} style={{ height: '1px' }}></li>
                        <div className={`pl-2 flex flex-row pt-1 pb-1 text-white gap-2`}>
                            <p>{"> Settings"}</p>
                            <p>Y Friends</p>
                        </div>
                        <li className={`mt-1 border-b-[1px] border-white mb-10 border-opacity-30`} key={'gap3'} style={{ height: '1px' }}></li>
                    </ul>
                </div>
            )}
        </>

    );
};

export default MenuContainer;

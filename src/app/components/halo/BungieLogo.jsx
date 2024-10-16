import React from "react";
import Image from "next/image";

const BungieLogo = () => {
    return (
        <div className={`flex flex-col items-end`}>
            <Image src={"/halo/logo.png"} width={150} height={100} alt={"Bungie Logo"}/>
        </div>
    );
};

export default BungieLogo;

import React, { useState } from 'react';
import {VolumeOff, VolumeUp} from "@mui/icons-material";
import {useRouter} from "next/router";
import Link from "next/link";

const Controls = ({toggleMute, muted, iterateBackground}) => {
    const router = useRouter();

    return (
        <div className="absolute top-3 left-3 font-halo-regular flex flex-row space-x-3 text-center">
            <button className="p-2 bg-gray-800 text-white rounded-full z-10 hover:bg-gray-600">
                <Link href={"https://www.himon.dev"}>
                    Home
                </Link>
            </button>

            <button className="p-2 bg-gray-800 text-white rounded-full z-10 hover:bg-gray-600">
                <Link href={"https://www.github.com/himonn/halo3menu"}>
                    Source
                </Link>
            </button>

            <button onClick={iterateBackground}
                    className="p-2 bg-gray-800 text-white rounded-full z-10 hover:bg-gray-600">
            Change Background
            </button>
            <button
                onClick={toggleMute}
                className="p-2 bg-gray-800 text-white rounded-full z-10 hover:bg-gray-600"
            >
                {muted ? (
                        <VolumeOff/>
                    )
                    : (
                        <VolumeUp/>
                    )}
            </button>
        </div>
    );
};

export default Controls;

const Title = () => {
    return (
        <div className="font-halo-fancy
        text-right
        text-6xl md:text-8xl
        text-transparent bg-clip-text bg-gradient-to-b from-blue-200 to-blue-400
        glow
        pb-20
        ">
            HALO3
            <style jsx>{`
                .glow {
                    filter: drop-shadow(0 0 5px #0756ea);
                }
            `}</style>
        </div>
    );
};

export default Title;

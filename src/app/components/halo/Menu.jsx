import React, { useState, useEffect } from 'react';

const Menu = () => {
    const [selected, setSelected] = useState(0);
    const menuItems = ['start solo game', 'campaign', 'matchmaking', 'custom games', 'forge', 'theater'];

    useEffect(() => {
        function handleKeyDown(event) {
            if (event.key === 'ArrowUp') {
                if (selected > 0){
                    setSelected(selected - 1);
                }
            } else if (event.key === 'ArrowDown') {
                if (selected < menuItems.length - 1){
                    setSelected(selected + 1);
                }
            }
        }

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [selected]);

    const selectItem = (e) => {
        setSelected(parseInt(e.target.id));
    };

    return (
        <div className="font-halo-regular text-xl relative top-0 left-0 w-full h-full flex items-center justify-center text-[#8db6ef] mb-10">
            <ul className="list-none w-full">
                {menuItems.map((name, index) => (
                    <div key={`div${index}`}>
                        <li
                            key={index}
                            className={`cursor-pointer 
                            flex items-center
                            pl-2
                            mt-1
                            ${selected === index ? 'bg-gradient-to-r from-orange-500 via-orange-500 via-orange-500 to-orange-500/10 opacity-90 text-white' : ''} 
                        `}
                            onMouseOver={selectItem}
                            id={index.toString()}
                        >
                            {name.toUpperCase()}
                        </li>
                        {index === 0 && <li className={`mt-1 border-b-[1px] border-white border-opacity-30`} key={'gap'} style={{ height: '1px' }}></li>}
                    </div>
                ))}
            </ul>
        </div>
    );
};

export default Menu;

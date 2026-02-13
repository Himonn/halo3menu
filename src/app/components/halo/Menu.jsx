import React, { useState, useEffect } from 'react';

const Menu = ({ items = [], onSelect }) => {
    const [selected, setSelected] = useState(0);

    // Reset selection when specific menu items change (e.g. navigation)
    useEffect(() => {
        setSelected(0);
    }, [items]);

    useEffect(() => {
        function handleKeyDown(event) {
            if (items.length === 0) return;

            if (event.key === 'ArrowUp') {
                if (selected > 0) {
                    setSelected(prev => prev - 1);
                }
            } else if (event.key === 'ArrowDown') {
                if (selected < items.length - 1) {
                    setSelected(prev => prev + 1);
                }
            } else if (event.key === 'Enter') {
                if (onSelect) {
                    onSelect(selected);
                }
            }
        }

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [selected, items, onSelect]);

    const selectItem = (index) => {
        setSelected(index);
    };

    const handleClick = (index) => {
        setSelected(index);
        if (onSelect) {
            onSelect(index);
        }
    }

    return (
        <div className="font-halo-regular text-xl relative top-0 left-0 w-full h-full flex items-center justify-center text-[#8db6ef] mb-10">
            <ul className="list-none w-full">
                {items.map((name, index) => (
                    <div key={`div${index}`}>
                        <li
                            key={index}
                            className={`cursor-pointer 
                            flex items-center
                            pl-2
                            mt-1
                            ${selected === index ? 'bg-gradient-to-r from-orange-500 via-orange-500 via-orange-500 to-orange-500/10 opacity-90 text-white' : ''} 
                        `}
                            onMouseOver={() => selectItem(index)}
                            onClick={() => handleClick(index)}
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

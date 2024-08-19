import React from 'react';
import '../styles/global.css';

type Props = {
    openMenu?: boolean;
}

const MenuModal: React.FC<Props> = ({ openMenu }) => {
    if (!openMenu) return;

    return (
            <div id='menu-container'>
                <div className='menu-blank'></div>
                <div className='menu-on'> 메뉴 </div>
            </div>
    );
}

export default MenuModal;
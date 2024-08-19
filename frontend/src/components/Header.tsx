import React, { useState } from 'react';
import '../styles/global.css';
import { Link } from 'react-router-dom';

const Header = () => {
    const [modalOpen, setModalOpen] = useState<boolean>();

    return (
        <header>
            <div className='width-wrapper'></div>
            <Link to='/'><img id='logo' src={require('../assets/logo.png')} className='draggable-img' /></Link>
            <img
                src={require('../assets/menu-bar.png')}
                onClick={() => modalOpen ? setModalOpen(false) : setModalOpen(true)}
            />
        </header>
    );
}

export default Header;
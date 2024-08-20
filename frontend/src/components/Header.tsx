import React from 'react';
import '../styles/global.css';
import { Link } from 'react-router-dom';
import { MenuTap } from '../components/MenuTap.tsx';

const Header = () => {
    return (
        <header>
            <div className='width-wrapper'></div>
            <Link to='/'><img id='logo' src={require('../assets/logo.png')} className='draggable-img' /></Link>
            <MenuTap></MenuTap>
        </header>
    );
}

export default Header;
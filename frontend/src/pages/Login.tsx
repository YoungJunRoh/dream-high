import React from 'react';

import '../styles/home.css';
import ResultBigBox from '../components/BigBox.tsx';
import ResultSmallBox from '../components/SmallBox.tsx';
import Button from '../components/Button.tsx';

const Login = () => {
    return (
        <div className='background-night'>
            <ResultSmallBox name='로그인이다 냥🐾' mode='loginbox'/>
            <ResultBigBox mode='loginbox'/>
            <Button 
            name='로그인🐾'
            mode='login'
            draggable={true}></Button>

        </div>
    );
  }
  
export default Login;
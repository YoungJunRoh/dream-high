import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // react-router-dom@^6.3.0
import Home from '../pages/Home.tsx';
import Interpretation from '../pages/Interpretation.tsx';
import Login from '../pages/Login.tsx';
import MyPage from '../pages/MyPage.tsx';
import Header from './Header.tsx';
import '../styles/global.css';
import InterpretationResult from '../pages/InterpretationResult.tsx';
import Loading from './Loading.tsx';
import Login from '../pages/Login.tsx';

const App = () => {
  return (
    <BrowserRouter>
      <div id='wrap'>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/interpretation" element={<Interpretation />} />
          <Route path='/interpretation-result' element={<InterpretationResult />} />
          <Route path='/login-home' element={<Login />} />
          <Route path='/loading' element={<Loading loading={true}/>} />
          <Route path='/mypage' element={<MyPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
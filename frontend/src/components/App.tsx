import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // react-router-dom@^6.3.0
import Home from '../pages/Home.tsx';
import Interpretation from '../pages/Interpretation.tsx';
import Header from './Header.tsx';
import InterpretationResult from '../pages/InterpretationResult.tsx';
import Loading from './Loading.tsx';
import Login from '../pages/Login.tsx';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/dream-interpretation" element={<Interpretation/>}/>
        <Route path='/interpretation-result' element={<InterpretationResult/>}/>
        <Route path='/loading' element={<Loading loading={true}/>} />
        <Route path='/login-home' element={<Login/>}/>      
      </Routes>
    </BrowserRouter>
  );
}

export default App;
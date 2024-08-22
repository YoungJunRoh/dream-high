import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // react-router-dom@^6.3.0
import Home from '../pages/Home.tsx';
import Login from '../pages/Login.tsx';
import MyPage from '../pages/MyPage.tsx';
import Header from './Header.tsx';
import '../styles/global.css';
import InterpretationResult from '../pages/InterpretationResult.tsx';
import Loading from '../pages/Loading.tsx';
import FindPassword from '../pages/FindPassword.tsx'
import PasswordReset from '../pages/PasswordReset.tsx';
import SignUp from '../pages/SignUp.tsx';
import MyCollection from '../pages/MyCollection.tsx';
import GetPicture from '../pages/GetPicture.tsx';
import { AuthProvider } from '../hooks/AuthProvider.tsx';

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div id='wrap'>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/interpretation" element={<Interpretation />} />
            <Route path='/interpretation-result' element={<InterpretationResult />} />
            <Route path='/login-home' element={<Login />} />
            <Route path='/loading' element={<Loading />} />
            <Route path='/mypage' element={<MyPage />} />
            <Route path='/login-passwordfind' element={<FindPassword />} />
            <Route path='/login-passwordreset' element={<PasswordReset />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/mycollection' element={<MyCollection/>}/>
            <Route path='/getpicture' element={<GetPicture/>}/>
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';

// 타입 정의
export interface AuthContextType {
  authorization: string | null;
  refresh: string | null;
  setAuthorization: (authorization: string | null) => void;
  setRefresh: (refresh: string | null) => void;
  login: boolean | null;
  setLogin: (login: boolean | null) => void;
}

// 기본 값 설정
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider 컴포넌트
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [authorization, setAuthorization] = useState<string | null>(null);
  const [refresh, setRefresh] = useState<string | null>(null);
  const [login, setLogin] = useState<boolean | null>(null);

  // 세션에 데이터 저장
  useEffect(() => {
    const storedAuthorization = sessionStorage.getItem('authorization');
    const storedRefresh = sessionStorage.getItem('refresh');
    const storedLogin = sessionStorage.getItem('login');

    setAuthorization(storedAuthorization);
    setRefresh(storedRefresh);
    setLogin(storedLogin === 'true' ? true : storedLogin === 'false' ? false : null);
  }, []);

  // 상태 변경 시 sessionStorage에 저장
  useEffect(() => {
    if (authorization !== null) {
      sessionStorage.setItem('authorization', authorization);
    } else {
      sessionStorage.removeItem('authorization');
    }

    if (refresh !== null) {
      sessionStorage.setItem('refresh', refresh);
    } else {
      sessionStorage.removeItem('refresh');
    }

    if (login !== null) {
      sessionStorage.setItem('login', login.toString());
    } else {
      sessionStorage.removeItem('login');
    }
  }, [authorization, refresh, login]);

  return (
    <AuthContext.Provider value={{ authorization, setAuthorization, refresh, setRefresh, login, setLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

// 토큰 hooks
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('토큰 정보 없음');
  }
  return context;
};
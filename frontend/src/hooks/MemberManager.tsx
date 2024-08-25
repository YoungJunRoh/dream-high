import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';

// 타입 정의
export interface MemberContextType {
  authorization: string | null;
  refresh: string | null;
  setAuthorization: (authorization: string | null) => void;
  setRefresh: (refresh: string | null) => void;
  login: boolean | null;
  setLogin: (login: boolean | null) => void;
}

// 기본 값 설정
const MemberContext = createContext<MemberContextType | undefined>(undefined);

// Provider 컴포넌트
export const MemberManager: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [authorization, setAuthorization] = useState<string | null>(null);
  const [refresh, setRefresh] = useState<string | null>(null);
  const [login, setLogin] = useState<boolean | null>(null);

  // 로컬 스토리지에서 데이터 가져오기
  useEffect(() => {
    const storedAuthorization = localStorage.getItem('authorization');
    const storedRefresh = localStorage.getItem('refresh');
    const storedLogin = localStorage.getItem('login');

    setAuthorization(storedAuthorization);
    setRefresh(storedRefresh);
    setLogin(storedLogin === 'true' ? true : storedLogin === 'false' ? false : null);
  }, []);

  // 상태 변경 시 localStorage에 저장
  useEffect(() => {
    if (authorization !== null) {
      localStorage.setItem('authorization', authorization);
    } else {
      localStorage.removeItem('authorization');
    }

    if (refresh !== null) {
      localStorage.setItem('refresh', refresh);
    } else {
      localStorage.removeItem('refresh');
    }

    if (login !== null) {
      localStorage.setItem('login', login.toString());
    } else {
      localStorage.removeItem('login');
    }
  }, [authorization, refresh, login]);

  return (
    <MemberContext.Provider value={{ authorization, setAuthorization, refresh, setRefresh, login, setLogin }}>
      {children}
    </MemberContext.Provider>
  );
};

// 토큰 hooks
export const useMember = (): MemberContextType => {
  const context = useContext(MemberContext);
  if (context === undefined) {
    throw new Error('토큰 정보 없음');
  }
  return context;
};

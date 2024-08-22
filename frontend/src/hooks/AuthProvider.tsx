import React, { createContext, useContext, ReactNode, useState } from 'react';

// 타입 정의
export interface AuthContext {
  authorization: string | null;
  refresh: string | null;
  setAuthorization: (authorization: string | null) => void;
  setRefresh: (refresh: string | null) => void;
}

export interface LoginStatus {
  login: boolean | null;
  setLogin: (login: boolean | null) => void;
}

// 기본 값 설정
const AuthContext = createContext<AuthContext | undefined>(undefined);

// Provider 컴포넌트
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [authorization, setAuthorization] = useState<string | null>(null);
  const [refresh, setRefresh] = useState<string | null>(null);

  return (
    <AuthContext.Provider value={{ authorization, setAuthorization, refresh, setRefresh }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook
export const useAuth = (): AuthContext => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// export const useLogin = (): LoginStatus

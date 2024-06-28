'use client';

import React, {createContext, ReactNode, useContext, useEffect, useState} from 'react';
import {onAuthStateChanged, getAuth} from 'firebase/auth';
import firebase_app from '@/lib/firebase/FirebaseConfig';
import {FirebaseUser} from "@/type/FirebaseUser.type";

const auth = getAuth(firebase_app);

interface AuthContextType {
  loginUser: FirebaseUser | undefined | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthContextProvider');
  }
  return context;
};

interface Props {
  children: ReactNode;
}

export function AuthContextProvider({children}: Props) {
  const [loginUser, setLoginUser] = useState<FirebaseUser | undefined | null>(undefined);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoginUser({
          email: user.email || "Login User",
          username: user.email?.split("@")[0] || "user"
        });
      } else {
        setLoginUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{loginUser: loginUser}}>
      {children}
    </AuthContext.Provider>
  );
}

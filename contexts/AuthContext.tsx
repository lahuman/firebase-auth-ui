"use client";
import React, { useContext, useState, useEffect, ReactNode } from "react";
import {
  auth,
  signOutAccount,
  signUpWithEmailAndPassword,
  signInWithEmail,
  updateUserPassword,
  sendResetEmail,
  signInWithAnonymously,
  signInWithGoogle,
  signInWithFacebook,
  signInWithApple,
} from "@/app/firebase";
import { User } from "firebase/auth";

const AuthContext = React.createContext({});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>();
  const [loading, setLoading] = useState(true);

  // 이메일 계정 생성
  function signup(email: string, password: string) {
    return signUpWithEmailAndPassword(email, password);
  }

  // 이메일 계정 로그인
  async function login(email: string, password: string) {
    return await signInWithEmail(email, password);
    auth?.currentUser
      ?.getIdToken(/* forceRefresh */ true)
      .then(function (idToken) {
        // Send token to your backend via HTTPS
        // ...
        // console.log(idToken);
      })
      .catch(function (error) {
        // Handle error
      });
  }

  // 익명 계정 로그인
  function loginAnonymously() {
    signInWithAnonymously();
  }

  // 구글 로그인
  async function loginGoogle() {
    await signInWithGoogle();
    auth?.currentUser
      ?.getIdToken(/* forceRefresh */ true)
      .then(function (idToken) {
        // Send token to your backend via HTTPS
        // ...
        // console.log(idToken);
      })
      .catch(function (error) {
        // Handle error
      });
  }

  // 페이스북 로그인
  async function loginFacebook() {
    await signInWithFacebook();
    auth?.currentUser
      ?.getIdToken(/* forceRefresh */ true)
      .then(function (idToken) {
        // Send token to your backend via HTTPS
        // ...
        // console.log(idToken);
      })
      .catch(function (error) {
        // Handle error
      });
  }

  // 애플 로그인
  async function loginApple() {
    await signInWithApple();
    auth?.currentUser
      ?.getIdToken(/* forceRefresh */ true)
      .then(function (idToken) {
        // Send token to your backend via HTTPS
        // ...
        // console.log(idToken);
      })
      .catch(function (error) {
        // Handle error
      });
  }


  // 로그아웃
  function logout() {
    return signOutAccount();
  }

  // 이메일 계정 비밀번호 재설정 메일 발송
  function resetPassword(email: string) {
    return sendResetEmail(email);
  }

  // 이메일 업데이트
  function updateEmail(email: string) {
    // return currentUser?.updateEmail(email);
  }

  // 이메일 계정 비밀번호 변경
  function updatePassword(password: string) {
    // return currentUser.updatePassword(password)
    return updateUserPassword(currentUser, password);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
    loginAnonymously,
    loginGoogle,
    loginFacebook,
    loginApple,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

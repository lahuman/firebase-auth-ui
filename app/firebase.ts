import { FirebaseError, initializeApp } from "firebase/app";
import {
  getAuth,
  signOut,
  signInAnonymously,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updatePassword,
  sendPasswordResetEmail,
  FacebookAuthProvider,
  signInWithCustomToken,
  OAuthProvider,
  UserCredential,
} from "firebase/auth";

const app = initializeApp({
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
});

export const auth = getAuth(app);

export const signOutAccount = async () => {
  await signOut(auth)
  return auth.signOut();
};

// 익명 로그인
export const signInWithAnonymously = () => {
  signInAnonymously(auth)
    .then((result: any) => {
      console.log(result);
    })
    .catch((error: any) => {
      console.log(error);
    });
};

// 구글 로그인
const gProvider = new GoogleAuthProvider();
export const signInWithGoogle = async () => {
  await signInWithPopup(auth, gProvider);
};

// 페이스북 로그인 로그인
const fProvider = new FacebookAuthProvider();
export const signInWithFacebook = async () => {
  await signInWithPopup(auth, fProvider)
    .then((result: UserCredential) => {
      // The signed-in user info.
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      const credential = FacebookAuthProvider.credentialFromResult(result);
      const accessToken = credential?.accessToken;

      // ...
    })
    .catch((error: { code: any; message: any; email: any; }) => {
      console.log(error);
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = FacebookAuthProvider.credentialFromError(error as unknown as FirebaseError);
      throw error;
      // ...
    });
};

// 애플 로그인
const appleProvider = new OAuthProvider("apple.com");
export const signInWithApple = async () => {
  await signInWithPopup(auth, appleProvider)
    .then((result: any) => {
      console.log(result);
      // const name = result.user.displayName;
      // const email = result.user.email;
      // const profilePic = result.user.photoURL;
      // localStorage.setItem("name", name);
      // localStorage.setItem("email", email);
      // localStorage.setItem("profilePic", profilePic);
    })
    .catch((error: { message: any; }) => {
      throw error;
    });
};

// 카카오 로그인
export const signInWithKaKao = async (token: any) => {
  signInWithCustomToken(auth, token)
    .then((userCredential: any) => {
      console.log("카카오 로그인 성공");
      auth?.currentUser
        ?.getIdToken(/* forceRefresh */ true)
        .then(function (idToken: any) {})
        .catch(function (error: any) {
          console.log(error);
        });
    })
    .then(() => window.close())
    .catch((err: { code: any; message: any; }) => {
      const errorCode = err.code;
      const errorMessage = err.message;
      throw err;
    });
};

// 네이버 로그인
export const signInWithNaver = async (token: any) => {
  await signInWithCustomToken(auth, token)
    .then((userCredential: any) => {
      console.log("네이버 로그인 성공");
      auth?.currentUser
        ?.getIdToken(/* forceRefresh */ true)
        .then(function (idToken: any) {})
        .catch(function (error: any) {
          console.log(error);
        });
    })
    .then(() => window.close())
    .catch((err: { code: any; message: any; }) => {
      const errorCode = err.code;
      const errorMessage = err.message;
      throw err;
    });
};

// 이메일 계정 생성
export const signUpWithEmailAndPassword = async (email: any, password: any) => {
  await createUserWithEmailAndPassword(auth, email, password);
};

// 이메일 계정 로그인
export const signInWithEmail = async (email: any, password: any) => {
  await signInWithEmailAndPassword(auth, email, password);
};

// 이메일 계정 비밀번호 변경
export const updateUserPassword = async (user: any, newPassword: any) => {
  await updatePassword(user, newPassword);
};

// 이메일 계정 비밀번호 재설정 메일 발송
export const sendResetEmail = async (email: any) => {
  await sendPasswordResetEmail(auth, email);
};

import {
  getAuth,
  createUserWithEmailAndPassword, // 회원가입
  updateProfile, // 프로필 업데이트
  signInWithEmailAndPassword, // 로그인
  onAuthStateChanged, // 로그인 상태 실시간 감시
  signOut, //로그아웃
} from "firebase/auth";
import app from "../firebase";

// Auth 객체
export const auth = getAuth(app);

// 회원가입
export const signUp = async (EMAIL, PWD, NAME) => {
  const userCredential = await createUserWithEmailAndPassword(auth, EMAIL, PWD);
  const user = userCredential.user;

  // 유저정보에 이름 업데이트
  await updateProfile(auth.currentUser, {
    displayName: NAME,
  });

  return user;
};

// 로그인
export const login = async (EMAIL, PWD) => {
  const userCredential = await signInWithEmailAndPassword(auth, EMAIL, PWD);
  const user = userCredential.user;

  return user;
};

// 로그아웃
export const logout = async () => {
  try {
    await signOut(auth);
    console.log("로그아웃 됨");
  } catch (err) {
    console.log("로그아웃 실패", err);
  }
};

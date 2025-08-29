import {
  getAuth,
  createUserWithEmailAndPassword, // 회원가입
  updateProfile, // 프로필 업데이트
  signInWithEmailAndPassword, // 로그인
  onAuthStateChanged, // 로그인 상태 실시간 감시
  signOut, //로그아웃
  sendEmailVerification, // 회원가입시 이메일 인증 보내기
  GoogleAuthProvider,
  signInWithPopup,
  getAdditionalUserInfo,
  OAuthProvider,
  signInWithCredential,
  sendPasswordResetEmail, // 비밀번호 재설정 이메일보내기
} from "firebase/auth";
import app from "../firebase";

const provider = new GoogleAuthProvider();

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

  // 이메일 인증 보내기
  await sendEmailVerification(user);

  return user;
};

// 로그인
export const login = async (EMAIL, PWD) => {
  const userCredential = await signInWithEmailAndPassword(auth, EMAIL, PWD);
  const user = userCredential.user;

  if (!user.emailVerified) {
    throw new Error("이메일 인증이 필요합니다");
  }

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

// 회원탈퇴
export const userDelete = async () => {
  const user = auth.currentUser; // 현재 로그인중인 사용자가져오기
  await user.delete();
};

// 구글로 회원가입
export const googleSignUp = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    // console.log("구글회원가입", result);
    console.log("새회원인지알아보기", getAdditionalUserInfo(result));
    const isNewUser = getAdditionalUserInfo(result).isNewUser;
    const googleUserName = getAdditionalUserInfo(result).profile.name;
    const googoleProfilePic = getAdditionalUserInfo(result).profile.picture;

    return { result, isNewUser, googleUserName, googoleProfilePic };
  } catch (error) {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  }
};

const kakaoProvider = new OAuthProvider("oidc.kakao");
// 카카오 계정으로 로그인
export const kakaoSignUp = async (idToken) => {
  const credential = kakaoProvider.credential({
    idToken: idToken,
  });
  const result = await signInWithCredential(getAuth(), credential);
  const user = result.user;
  const photoURL = user.photoURL; //프로필사진
  // console.log("result", result, ", user", user);
  return user;
};

// 비밀번호 재설정 이메일 보내기
export const pwdReset = async (email) => {
  await sendPasswordResetEmail(auth, email);
  try {
    const message = `${email}로 발송을 완료했습니다`;
    return message;
  } catch {
    (error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
      alert(errorCode, errorMessage, error);
    };
  }
};

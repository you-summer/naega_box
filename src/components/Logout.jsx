import { useContext } from "react";
import { logout, userDelete } from "../api/firebaseAuth";
import { UserStateContext } from "../App";
import { useNavigate } from "react-router-dom";
import { showConfirmAlert } from "../util/get-sweet-alert";

const Logout = () => {
  const { user, setUser } = useContext(UserStateContext);
  const nav = useNavigate();
  console.log("logoutPage", user);
  const KAKAO_LOGOUT_REDIRECT_URI = import.meta.env
    .VITE_KAKAO_LOGOUT_REDIRECT_URI;
  const KAKAO_KAKAO_REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;

  const onClickLogout = async () => {
    const result = await showConfirmAlert({ title: "로그아웃 하시겠습니까?" });
    if (!user) {
      return;
    } else if (user.providerData[0].providerId === "oidc.kakao") {
      window.location.href = `https://kauth.kakao.com/oauth/logout?client_id=${KAKAO_KAKAO_REST_API_KEY}&logout_redirect_uri=${KAKAO_LOGOUT_REDIRECT_URI}&state=logout`;
    } else {
      if (result.isConfirmed) {
        await logout();
        setUser(null);
        nav("/", { replace: true });
      }
    }
  };

  const onClickUserDelete = async () => {
    console.log("회원탈퇴버튼", user);
    const result = await showConfirmAlert({
      title: "정말 탈퇴하시겠습니까?",
      text: "되돌릴 수 없습니다",
    });
    if (user.providerData[0].providerId === "oidc.kakao") {
      window.location.href = `https://kauth.kakao.com/oauth/logout?client_id=${KAKAO_KAKAO_REST_API_KEY}&logout_redirect_uri=${KAKAO_LOGOUT_REDIRECT_URI}&state=signout`;
    }
    if (result.isConfirmed) {
      await userDelete();
      setUser(null);
      nav("/", { replace: true });
    }
  };

  return (
    <div>
      <button onClick={onClickLogout}>로그아웃!!!!!</button>
      <button onClick={onClickUserDelete}>회원탈퇴</button>
    </div>
  );
};
export default Logout;

import { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../../api/firebaseAuth";
import { UserStateContext } from "../../App";
import { showLoadingAlert } from "../../util/get-sweet-alert";

const KakaoAuthLogout = () => {
  const { setUser } = useContext(UserStateContext);
  const nav = useNavigate();

  useEffect(() => {
    const mode = new URL(document.URL).searchParams.get("state");
    // console.log("모드: ", mode);
    let action;
    if (mode === "logout") {
      action = "로그아웃";
    } else if (mode === "signout") {
      action = "탈퇴";
    }
    const isLoading = showLoadingAlert({
      title: `${action} 중...`,
      text: "잠시만 기다려주세요",
    });
    const kakaoLogout = async () => {
      await logout(); // 파이어베이스 세션 로그아웃
      setUser(null); // 사용자 정보 초기화
      isLoading(); // 팝업닫힘
      nav("/", { replace: true });
    };
    kakaoLogout();
  }, []);

  return <div></div>;
};
export default KakaoAuthLogout;

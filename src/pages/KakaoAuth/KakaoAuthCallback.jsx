import { useEffect } from "react";
import { kakaoSignUp } from "../../api/firebaseAuth";
import { useNavigate } from "react-router-dom";
import { showSuccessAlert } from "../../util/get-sweet-alert";

const KAkaoAuthCallback = () => {
  const nav = useNavigate();

  useEffect(() => {
    const code = new URL(document.URL).searchParams.get("code");
    // console.log("카카오 인가코드", code);
    const mode = new URL(document.URL).searchParams.get("state");
    // console.log("모드: ", mode);

    const getToken = async () => {
      const res = await fetch(`https://kauth.kakao.com/oauth/token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        },
        body: new URLSearchParams({
          grant_type: "authorization_code",
          client_id: import.meta.env.VITE_KAKAO_REST_API_KEY,
          redirect_uri: import.meta.env.VITE_KAKAO_REDIRECT_URI,
          code: code,
          client_secret: import.meta.env.VITE_KAKAO_CLIENT_SECRET_KEY,
        }).toString(),
      });
      const data = await res.json();
      // console.log("진짜이게토큰이라고?", data);

      //   firebase에 카카오계정으로 로그이 혹은 회원가입 시도
      const user = await kakaoSignUp(data.id_token);
      // console.log("user", user);
      if (user) {
        if (mode === "join") {
          await showSuccessAlert({
            title: "가입을 축하합니다!",
            text: `${user.displayName}님의 회원가입을 축하합니다`,
            confirmButtonText: "메인으로",
          });
          nav("/", { replace: true });
        } else if (mode === "login") {
          await showSuccessAlert({
            title: "로그인 되었습니다",
            text: `${user.displayName}님 반갑습니다!`,
            confirmButtonText: "메인으로",
          });
          nav("/", { replace: true });
        }
      }
    };
    getToken();
  }, []);

  return <div></div>;
};
export default KAkaoAuthCallback;

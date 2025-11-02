import { googleSignUp } from "../api/firebaseAuth";
import { showSuccessAlert } from "../util/get-sweet-alert";
import { useNavigate } from "react-router-dom";

export const useGoogleAuth = (mode) => {
  const nav = useNavigate();

  async function googleJoinSuccess(googleUserName) {
    await showSuccessAlert({
      title: "회원가입 완료!",
      text: `${googleUserName}님 회원가입을 축하합니다`,
    });
    nav("/", { replace: true });
  }

  const onClickGoogleAuth = async () => {
    const { result, isNewUser, googleUserName, googoleProfilePic } =
      await googleSignUp();
    console.log("로그인결과", result);
    console.log("새유저", isNewUser);
    console.log("구글유저이름", googleUserName);

    if (mode === "login") {
      if (isNewUser === true) {
        await googleJoinSuccess(googleUserName);
      } else if (isNewUser === false) {
        await showSuccessAlert({
          title: "성공적으로 로그인되었습니다 !",
          text: `${googleUserName}님 반갑습니다!`,
          confirmButtonText: "메인으로",
        });
        nav("/", { replace: true });
      }
    } else if (mode === "join") {
      await googleJoinSuccess(googleUserName);
    }
  };

  return { onClickGoogleAuth };
};

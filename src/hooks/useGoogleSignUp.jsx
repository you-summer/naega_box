import { googleSignUp } from "../api/firebaseAPI";
import { showSuccessAlert } from "../util/get-sweet-alert";
import { useNavigate } from "react-router-dom";

export const useGoogleSignUp = () => {
  const nav = useNavigate();
  const onClickGoogleSignUp = async () => {
    const googleResult = await googleSignUp();
    if (googleResult) {
      const sweetalertResult = await showSuccessAlert({
        title: "가입을 축하합니다!",
        text: `회원가입을 축하합니다`,
      });
      if (sweetalertResult.isConfirmed) {
        nav("/", { replace: true });
      }
    }
  };

  return { onClickGoogleSignUp };
};

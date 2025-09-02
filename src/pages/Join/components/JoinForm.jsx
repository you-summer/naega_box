import { Link } from "react-router-dom";
import "./JoinForm.css";
import { useForm } from "react-hook-form";
import { formFields } from "../../../constants/formFields.js";
import { useNavigate } from "react-router-dom";
import { signUp, logout, auth } from "../../../api/firebaseAuth.js";
import {
  showLoadingAlert,
  showSuccessAlert,
  showErrorAlert,
} from "../../../util/get-sweet-alert.js";
import { useGoogleAuth } from "../../../hooks/useGoogleAuth.jsx";
import Button from "../../../components/Button.jsx";

const JoinForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur", // <- input에서 포커스가 나갈 때 검증
  });
  // "onChange" → 입력할 때마다 검증
  // "onBlur" → input에서 포커스가 나갈 때 검증
  // "onSubmit" → 제출 시만 검증 (기본값)
  // "all" → 입력/블러/제출 모두 검증

  const nav = useNavigate();

  const KAKAO_REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;
  const KAKAO_REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;

  const onSubmit = async (data) => {
    console.log(data);
    const { NAME, EMAIL, PWD } = data;

    try {
      showLoadingAlert({
        title: "회원가입 중...",
        text: "잠시만 기다려주세요",
      });
      // 회원가입
      const user = await signUp(EMAIL, PWD, NAME);

      const sweetalertResult = await showSuccessAlert({
        title: "가입을 축하합니다!",
        text: `${user.displayName}님의 회원가입을 축하합니다, 이메일 인증 후 로그인 해주세요`,
      });
      if (sweetalertResult.isConfirmed) {
        await logout(auth);
        //로그아웃
        nav("/", { replace: true });
      }
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("errorCode", errorCode);
      console.log("errorMessage", errorMessage);
      showErrorAlert({
        title: "회원가입 실패",
        text: "이미 사용중인 이메일입니다.",
      });
    }
  };

  const mode = "join";
  const { onClickGoogleAuth } = useGoogleAuth(mode);

  const onClickKakaoAuth = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&state=${mode}`;
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="JoinForm">
        <div className="JoinForm_div">
          <div className="logo_div">
            <Link to={"/"}>
              <img
                src="src/assets/NAEGA_BOX_LOGO7.png"
                alt=""
                className="logo"
              />
            </Link>
          </div>

          {/* <h2>회원가입</h2> */}
          {formFields.map((item) => {
            return (
              <div
                key={item.name}
                className={`${item.name.toLowerCase()}Input_div`}
              >
                <input
                  type={`${item.type}`}
                  className={`${item.name.toLowerCase()}Input`}
                  placeholder={`${item.placeholder}`}
                  {...register(item.name, {
                    required: item.message,
                    pattern: {
                      value: item.pattern,
                      message: item.message,
                    },
                  })}
                />
                {!errors[item.name] ? (
                  ``
                ) : (
                  <span className={`error_span`}>
                    {errors[item.name].message}
                  </span>
                )}
              </div>
            );
          })}

          <Button text={"회원가입"} type={"RED"} submit />
          <div className="google_kakao_join_div">
            <Button
              type={"GOOGLE"}
              onClick={onClickGoogleAuth}
              text={"구글로 가입"}
            />
            <Button
              type={"KAKAO"}
              text={"카카오 회원가입"}
              url={onClickKakaoAuth}
            />
          </div>
        </div>
      </div>
    </form>
  );
};
export default JoinForm;

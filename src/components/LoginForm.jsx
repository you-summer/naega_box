import { Link } from "react-router-dom";
import "./LoginForm.css";
import { useRef } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { useForm } from "react-hook-form";
import { formFields } from "../constants/formFields";
import { useNavigate } from "react-router-dom";
import { login, pwdReset } from "../api/firebaseAPI.js";
// import { getAuth } from "firebase/auth";
// import app from "../firebase.js";
import {
  showLoadingAlert,
  showSuccessAlert,
  showErrorAlert,
  inputAlert,
} from "../util/get-sweet-alert.js";
import { useGoogleAuth } from "../hooks/useGoogleAuth.jsx";
import Button from "./Button.jsx";

const url = [
  { id: 0, menu: "이메일 찾기", url: "/" },
  { id: 1, menu: "비밀번호 찾기", url: "/" },
  { id: 2, menu: "회원가입", url: "/join" },
];

const LoginForm = () => {
  const KAKAO_REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;
  const KAKAO_REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;
  const nav = useNavigate();
  const emailRef = useRef();
  const onClickIdEmpty = () => {
    // console.log(emailRef.current.value);
    emailRef.current.value = "";
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur", // <- input에서 포커스가 나갈 때 검증
  });

  const onSubmit = async (data) => {
    // console.log(data);
    const { EMAIL, PWD } = data;
    try {
      showLoadingAlert({ title: "로그인 중...", text: "잠시만 기다려주세요" });

      const user = await login(EMAIL, PWD);

      const sweetalertResult = await showSuccessAlert({
        title: "성공적으로 로그인되었습니다 !",
        text: `${user.displayName}님 반갑습니다!`,
      });
      if (sweetalertResult.isConfirmed) {
        nav("/", { replace: true });
      }
    } catch (err) {
      console.log(err);

      if (err.message === "이메일 인증이 필요합니다") {
        showErrorAlert({
          title: "인증 필요",
          text: "가입한 이메일로 발송된 인증 링크를 확인해주세요",
        });
      } else {
        showErrorAlert({
          title: "로그인 실패!",
          text: "이메일 혹은 비밀번호를 확인해주세요!",
        });
      }
    }
  };

  const mode = "login";
  const { onClickGoogleAuth } = useGoogleAuth(mode);
  const onClickKakaoAuth = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&state=${mode}`;

  // const auth = getAuth(app);
  // console.log(auth.currentUser);

  const emailField = formFields.find((f) => {
    return f.name === "EMAIL";
  });
  const pwdField = formFields.find((f) => {
    return f.name === "PWD";
  });

  const onClickResetPwd = async () => {
    const email = await inputAlert();
    if (!email) {
      return;
    }
    try {
      await pwdReset(email);
      const sweetalertResult = await showSuccessAlert({
        title: "발송 완료",
        text: `${email}로 비밀번호 재설정 메일을 보냈습니다!`,
      });
      if (sweetalertResult.isConfirmed) {
        nav("/", { replace: true });
      }
    } catch (error) {
      console.log(error);
      showErrorAlert({
        title: "실패",
        text: "해당 이메일을 찾을 수 없거나 오류가 발생했습니다.",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="LoginForm">
        <div className="LoginForm_div">
          <div>로고사진</div>

          <h2>로그인</h2>
          <div className="emailInput_div">
            <input
              ref={emailRef}
              type="email"
              className="emailInput"
              placeholder="이메일 입력"
              {...register("EMAIL", {
                required: "이메일을 입력해주세요",
                pattern: {
                  value: emailField.pattern,
                  message: emailField.message,
                },
              })}
            />
            <button
              className="clearButton"
              type="button"
              onClick={onClickIdEmpty}
            >
              <IoIosCloseCircle />
            </button>
          </div>
          <div className="pwdInput_div">
            <input
              type="password"
              className="pwdInput"
              placeholder="비밀번호 입력"
              {...register("PWD", {
                required: "비밀번호를 입력해주세요",
                pattern: {
                  value: pwdField.pattern,
                  message: pwdField.message,
                },
              })}
            />
          </div>
          <Button type={"RED"} text={"로그인"} submit />
          <div className="google_kakao_login_button">
            <Button
              type={"GOOGLE"}
              text={"구글 로그인"}
              onClick={onClickGoogleAuth}
            />

            <Button
              type={"KAKAO"}
              text={"카카오 로그인"}
              url={onClickKakaoAuth}
            />
          </div>
        </div>

        <div className="loginForm_bottom">
          <div onClick={onClickResetPwd}>
            이메일 또는 비밀번호를 잊어버리셨나요?
          </div>
          |
          <div>
            <Link to={"/join"}>회원가입</Link>
          </div>
          {/* {url.map((item) => {
            return (
              <div>
                <Link key={item.id} to={item.url}>
                  {item.menu}
                </Link>
              </div>
            );
          })} */}
        </div>
      </div>
    </form>
  );
};
export default LoginForm;

import { Link } from "react-router-dom";
import "./LoginForm.css";
import { useRef } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { useForm } from "react-hook-form";
import { formFields } from "../constants/formFields";
import { useNavigate } from "react-router-dom";
import { login } from "../api/firebaseAPI.js";
import { getAuth } from "firebase/auth";
import app from "../firebase.js";
import {
  showLoadingAlert,
  showSuccessAlert,
  showErrorAlert,
} from "../util/get-sweet-alert.js";
import { useGoogleAuth } from "../hooks/useGoogleAuth.jsx";

const url = [
  { id: 0, menu: "이메일 찾기", url: "/" },
  { id: 1, menu: "비밀번호 찾기", url: "/" },
  { id: 2, menu: "회원가입", url: "/join" },
];

const LoginForm = () => {
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
  const onClickKakaoAuth = () => {
    alert("잠만");
  };

  const auth = getAuth(app);
  console.log(auth.currentUser);

  const emailField = formFields.find((f) => {
    return f.name === "EMAIL";
  });
  const pwdField = formFields.find((f) => {
    return f.name === "PWD";
  });

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
          <button className="login_button" type="submit">
            로그인
          </button>
          <button type="button" onClick={onClickGoogleAuth}>
            구글로 로그인하기
          </button>
          <button type="button" onClick={onClickKakaoAuth}>
            카카오계정으로 로그인하기
          </button>
        </div>

        <div className="loginForm_bottom">
          {url.map((item) => {
            return (
              <div>
                <Link key={item.id} to={item.url}>
                  {item.menu}
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </form>
  );
};
export default LoginForm;

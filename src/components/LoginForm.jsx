import { Link } from "react-router-dom";
import "./LoginForm.css";
import { useRef } from "react";
import { IoIosCloseCircle } from "react-icons/io";

const url = [
  { id: 0, menu: "아이디 찾기", url: "/" },
  { id: 1, menu: "비밀번호 찾기", url: "/" },
  { id: 2, menu: "회원가입", url: "/join" },
];

const LoginForm = () => {
  const idRef = useRef();
  const onClickIdEmpty = () => {
    console.log(idRef.current.value);
    idRef.current.value = "";
  };

  return (
    <div className="LoginForm">
      <div className="LoginForm_div">
        <div>로고사진</div>

        <h2>로그인</h2>
        <div className="idInput_div">
          <input
            ref={idRef}
            type="text"
            className="idInput"
            placeholder="이메일 입력"
          />
          <button className="clearButton" onClick={onClickIdEmpty}>
            <IoIosCloseCircle />
          </button>
        </div>
        <div className="pwdInput_div">
          <input
            type="password"
            className="pwdInput"
            placeholder="비밀번호 입력"
          />
        </div>
        <button className="login_button">로그인</button>
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
  );
};
export default LoginForm;

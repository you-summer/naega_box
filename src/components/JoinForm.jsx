import { Link } from "react-router-dom";
import "./JoinForm.css";
import { useForm } from "react-hook-form";
import { formFields } from "../constants/formFields.js";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { signUp } from "../api/firebaseAPI.js";

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

  const onSubmit = async (data) => {
    console.log(data);
    const { NAME, EMAIL, PWD } = data;

    try {
      Swal.fire({
        title: "회원가입 중...",
        text: "잠시만 기다려주세요.",
        allowOutsideClick: false, //팝업 외부(바깥 배경)를 클릭해도 닫히지 않게 설정.
        didOpen: () => {
          Swal.showLoading();
        },
        showClass: { popup: "" }, // 애니메이션 제거
        hideClass: { popup: "" },
      });

      // 회원가입
      const user = await signUp(EMAIL, PWD, NAME);

      const sweetalertResult = await Swal.fire({
        title: "가입을 축하합니다!",
        text: `${user.displayName}님의 회원가입을 축하합니다`,
        icon: "success",
        confirmButtonText: "메인으로",
        confirmButtonColor: "rgb(100, 201, 100)",
        showClass: { popup: "" }, // 애니메이션 제거
        hideClass: { popup: "" },
      });
      if (sweetalertResult.isConfirmed) {
        nav("/", { replace: true });
      }
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("errorCode", errorCode);
      console.log("errorMessage", errorMessage);
      Swal.fire({
        icon: "error",
        title: "회원가입 실패",
        text: "이미 사용중인 이메일입니다.",
        showClass: { popup: "" }, // 애니메이션 제거
        hideClass: { popup: "" },
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="JoinForm">
        <div className="JoinForm_div">
          <div>로고사진</div>

          <h2>회원가입</h2>
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

          <button className="join_button" type="submit">
            회원가입
          </button>
        </div>
      </div>
    </form>
  );
};
export default JoinForm;

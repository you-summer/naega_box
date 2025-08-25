import { Link } from "react-router-dom";
import "./JoinForm.css";
import { useForm } from "react-hook-form";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import "../constants/formFields.js";
import { formFields } from "../constants/formFields.js";
import app from "../firebase.js";

const JoinForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onBlur", // <- 입력할 때마다 유효성 검사
  });
  // "onChange" → 입력할 때마다 검증
  // "onBlur" → input에서 포커스가 나갈 때 검증
  // "onSubmit" → 제출 시만 검증 (기본값)
  // "all" → 입력/블러/제출 모두 검증

  const auth = getAuth(app);
  const onSubmit = async (data) => {
    console.log(data);
    const { NAME, EMAIL, PWD } = data;

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        EMAIL,
        PWD
      );
      const user = userCredential.user;
      console.log(user);
      await updateProfile(auth.currentUser, {
        displayName: NAME,
      });
      console.log(auth.currentUser.displayName);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
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

import Swal from "sweetalert2";
import { pwdReset } from "../api/firebaseAuth";

// 로딩 알림
export const showLoadingAlert = ({ title, text }) => {
  Swal.fire({
    title: title,
    text: text,
    allowOutsideClick: false, //팝업 외부(바깥 배경)를 클릭해도 닫히지 않게 설정.
    didOpen: () => {
      Swal.showLoading();
    },
    showClass: { popup: "" }, // 애니메이션 제거
    hideClass: { popup: "" },
  });
  return () => Swal.close();
};

// 성공 알림
export const showSuccessAlert = async ({ title, text, confirmButtonText }) => {
  return Swal.fire({
    title: title,
    text: text,
    icon: "success",
    confirmButtonText: confirmButtonText,
    confirmButtonColor: "rgb(100, 201, 100)",
    showClass: { popup: "" }, // 애니메이션 제거
    hideClass: { popup: "" },
  });
};

// 실패 알림
export const showErrorAlert = ({ title, text }) => {
  return Swal.fire({
    icon: "error",
    title: title,
    text: text,
    showClass: { popup: "" }, // 애니메이션 제거
    hideClass: { popup: "" },
    confirmButtonText: "확인",
  });
};

// 단순 확인용 alert
export const showConfirmAlert = async ({ title, text }) => {
  return Swal.fire({
    title: title,
    text: text,
    showCancelButton: true,
    confirmButtonColor: "rgb(100, 201, 100)",
    confirmButtonText: "확인",
    cancelButtonText: "취소",
    showClass: { popup: "" }, // 애니메이션 제거
    hideClass: { popup: "" },
  });
};

// input 모달
export const inputAlert = async () => {
  const { value: email } = await Swal.fire({
    title: "비밀번호 재설정하기",
    text: "비밀번호를 재설정할 이메일을 적어주세요",
    input: "email",
    inputPlaceholder: "example@email.com",
    inputAttributes: {
      autocapitalize: "off",
    },
    showCancelButton: true,
    confirmButtonText: "발송!",
    cancelButtonText: "취소",
    showLoaderOnConfirm: true,
    inputValidator: (value) => {
      // 빈 값이면
      if (!value) {
        return "이메일을 입력해주세요";
      }
      if (!value.includes("@")) {
        return "올바른 이메일 형식이 아닙니다";
      }
    },
  });

  return email;
};

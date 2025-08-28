import Swal from "sweetalert2";

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
};

// 성공 알림
export const showSuccessAlert = async ({ title, text }) => {
  return Swal.fire({
    title: title,
    text: text,
    icon: "success",
    confirmButtonText: "메인으로",
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

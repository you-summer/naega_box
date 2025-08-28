import { useContext } from "react";
import { logout, userDelete } from "../api/firebaseAPI";
import { UserStateContext } from "../App";
import { useNavigate } from "react-router-dom";
import { showConfirmAlert } from "../util/get-sweet-alert";

const Logout = () => {
  const { setUser } = useContext(UserStateContext);
  const nav = useNavigate();

  const onClickLogout = async () => {
    const result = await showConfirmAlert({ title: "로그아웃 하시겠습니까?" });
    if (result.isConfirmed) {
      await logout();
      setUser(null);
      nav("/", { replace: true });
    }
  };

  const onClickUserDelete = async () => {
    const result = await showConfirmAlert({
      title: "정말 탈퇴하시겠습니까?",
      text: "되돌릴 수 없습니다",
    });
    if (result.isConfirmed) {
      await userDelete();
      nav("/", { replace: true });
    }
  };

  return (
    <div>
      <button onClick={onClickLogout}>로그아웃!!!!!</button>
      <button onClick={onClickUserDelete}>회원탈퇴</button>
    </div>
  );
};
export default Logout;

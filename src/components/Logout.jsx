import { useContext } from "react";
import { logout } from "../api/firebaseAPI";
import { UserStateContext } from "../App";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
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

  return (
    <div>
      <button onClick={onClickLogout}>로그아웃!!!!!</button>
    </div>
  );
};
export default Logout;

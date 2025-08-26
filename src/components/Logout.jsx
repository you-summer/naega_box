import { useContext } from "react";
import { logout } from "../api/firebaseAPI";
import { UserStateContext } from "../App";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const { setUser } = useContext(UserStateContext);
  const nav = useNavigate();

  const onClickLogout = async () => {
    await logout();
    setUser(null);
    nav("/", { replace: true });
  };

  return (
    <div>
      <button onClick={onClickLogout}>로그아웃!!!!!</button>
    </div>
  );
};
export default Logout;

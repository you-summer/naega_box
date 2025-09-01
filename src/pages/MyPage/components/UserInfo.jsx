import { useContext } from "react";
import "./UserInfo.css";
import { UserStateContext } from "../../../App";
import default_profile_img from "../../../assets/default_profile_image.jpg";

const UserInfo = () => {
  const { user, setUSer } = useContext(UserStateContext);
  console.log("UserInfo : ", user);
  let userImg = user?.photoURL;

  return (
    <div className="UserInfo">
      <div>
        <div className="user_profile_img_div">
          <img
            src={userImg || default_profile_img}
            className="user_profile_img"
          />
        </div>
        <div>이름/이메일</div>
      </div>
      <div>평가 코멘트 찜한영화</div>
    </div>
  );
};
export default UserInfo;

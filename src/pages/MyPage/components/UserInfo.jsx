import { useContext } from "react";
import "./UserInfo.css";
import { UserStateContext } from "../../../App";
import default_profile_img from "../../../assets/default_profile_image.jpg";
import { Link } from "react-router-dom";

const UserInfo = () => {
  const { user, setUSer } = useContext(UserStateContext);
  console.log("UserInfo : ", user);
  let userImg = user?.photoURL;

  return (
    <div className="UserInfo">
      <div className="userInfo_profile">
        <div className="user_profile_img_wrapper">
          <img
            src={userImg || default_profile_img}
            className="user_profile_img"
          />
        </div>
        <div className="userInfo_profile_info">
          <div className="userInfo_name">
            <h4>{user?.displayName || ""}</h4>
          </div>
          <div className="userInfo_email">{user?.email || ""}</div>
        </div>
      </div>
      <hr className="userInfo_hr" />
      <div className="userInfo_reviews_wrapper">
        <Link className="userInfo_reviews">
          <div className="userInfo_reviews1">평가</div>
          <div className="userInfo_reviews2">201</div>
        </Link>
        <span className="userInfo_reviews_span">|</span>
        <Link className="userInfo_reviews">
          <div className="userInfo_reviews1">코멘트</div>
          <div className="userInfo_reviews2">101</div>
        </Link>
        <span className="userInfo_reviews_span">|</span>
        <Link className="userInfo_reviews">
          <div className="userInfo_reviews1">찜한 영화</div>
          <div className="userInfo_reviews2">23</div>
        </Link>
      </div>
      <hr className="userInfo_hr" />
    </div>
  );
};
export default UserInfo;

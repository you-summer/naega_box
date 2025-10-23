import { useContext } from "react";
import "../components/MovieCommentList.css";
import { UserStateContext } from "../../../App";
import userImg from "../../../assets/default_profile_image.jpg";
import likeButton from "../../../assets/like_button.png";

const MovieCommentList = () => {
  //   const user = useContext(UserStateContext);
  //   console.log("유저유저!", user);
  return (
    <div className="MovieCommentList">
      <div className="comment_userInfo">
        <div className="comment_img">
          <img src={userImg} className="comment_userImg" />
        </div>
        <div className="comment_name_star">
          <div className="comment_name">김아꽁</div>
          <div className="comment_star_img">별별별별별</div>
        </div>
      </div>
      <div className="comment_content_wrap">
        <div className="comment_content">
          영화가 너무 재밌어요! 이러이러해서 좋았고 저러저러해서좋았어요 ^^~~~
        </div>
        <div className="comment_liked">
          <div className="comment_liked_img">
            <img src={likeButton} alt="" />
          </div>
          <div className="comment_liked_number">0</div>
        </div>
      </div>
      <hr className="movieComment_hr" />
    </div>
  );
};
export default MovieCommentList;

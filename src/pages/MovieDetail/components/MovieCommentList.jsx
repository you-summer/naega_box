import "../components/MovieCommentList.css";
import likeButton from "../../../assets/like_button.png";
import grayStar from "../../../assets/grayStar.png";
import yellowStar from "../../../assets/yellowStar.png";

const MovieCommentList = ({ comment }) => {
  console.log("잘넘어왔나?", comment);

  // 별을 5개로 표현하기 위한 배열
  const starArray = [0, 1, 2, 3, 4];

  // comment 안에 있는 createdAt 사용하기
  const commentDate = comment?.createdAt?.toDate().toLocaleDateString();

  return (
    <div className="MovieCommentList">
      <div className="comment_userInfo">
        <div className="comment_img">
          <img src={comment.userImg} className="comment_userImg" />
        </div>
        <div className="comment_name_star">
          <div className="comment_name">{comment.displayName}</div>
          <div className="comment_date">{commentDate}</div>
        </div>
      </div>
      <div className="comment_content_wrap">
        <div className="comment_star_img">
          {starArray.map((item) => {
            return (
              <img
                src={item < comment.score ? yellowStar : grayStar}
                className="movieCommentStarImg"
              />
            );
          })}
        </div>
        <div className="comment_content">{comment.comment}</div>
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

import "../components/MovieCommentList.css";
import likeButton from "../../../assets/like_button.png";
import likedButton from "../../../assets/liked_button.png";
import grayStar from "../../../assets/grayStar.png";
import yellowStar from "../../../assets/yellowStar.png";
import { useContext, useEffect, useState } from "react";
import { UserStateContext } from "../../../App";
import {
  showConfirmAlert,
  showSuccessAlert,
} from "../../../util/get-sweet-alert";
import { commentDelete, commentLiked } from "../../../api/firebaseDB";
import defaultImg from "../../../assets/default_profile_image.jpg";

const MovieCommentList = ({ comment, refreshComments }) => {
  console.log("잘넘어왔나?", comment);
  const user = useContext(UserStateContext);
  const realUser = user?.user;

  // 별을 5개로 표현하기 위한 배열
  const starArray = [0, 1, 2, 3, 4];

  // comment 안에 있는 createdAt 사용하기
  const commentDate = comment?.createdAt?.toDate().toLocaleDateString();

  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const getUserCommentLiked = async () => {
      if (!realUser) {
        return;
      }

      // 간단하게 includes로 체크
      if (comment.likes.includes(realUser.uid)) {
        setIsLiked(true);
      } else {
        setIsLiked(false);
      }
    };
    getUserCommentLiked();
  }, [comment.likes, realUser]);

  const onClickDel = async () => {
    const result = await showConfirmAlert({
      title: "삭제",
      text: "해당 코멘트를 삭제하시겠습니까?",
    });

    if (result.isConfirmed) {
      await commentDelete(comment);
      await showSuccessAlert({
        text: "성공적으로 삭제되었습니다!",
        confirmButtonText: "확인!",
      });
      refreshComments();
    }
  };

  // 댓글 좋아요 누르기
  const onClickLike = async () => {
    if (!realUser) {
      // 미로그인시 좋아요 금지
      return showConfirmAlert({ text: "로그인 후 이용가능합니다!" });
    }
    await commentLiked(comment, realUser.uid, isLiked);
    setIsLiked(!isLiked);
    refreshComments();
  };

  return (
    <div className="MovieCommentList">
      <div className="comment_userInfo">
        <div className="comment_img">
          <img
            src={comment.userImg || defaultImg}
            className="comment_userImg"
          />
        </div>
        <div className="comment_name_date">
          <div className="comment_name">{comment.displayName}</div>
          <div className="comment_date">{commentDate}</div>
        </div>
        {realUser?.uid === comment.uid ? (
          <div className="comment_up_del">
            <button onClick={() => onClickDel()}>삭제</button>
          </div>
        ) : null}
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
          <div className="comment_liked_img" onClick={onClickLike}>
            <img src={isLiked ? likedButton : likeButton} alt="" />
          </div>
          <div className="comment_liked_number">
            {comment.likes.length || 0}
          </div>
        </div>
      </div>
      <hr className="movieComment_hr" />
    </div>
  );
};
export default MovieCommentList;

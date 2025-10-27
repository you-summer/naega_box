import "../components/UserCommentList.css";
import yellowStar from "../../../assets/yellowStar.png";
import { commentDelete, commentLiked } from "../../../api/firebaseDB";
import {
  showConfirmAlert,
  showSuccessAlert,
} from "../../../util/get-sweet-alert";
import useMovieDetail from "../../../hooks/useMovieDetail";
import { Link } from "react-router-dom";

const UserCommentList = ({ isUserComment, refreshComments, type, uid }) => {
  // console.log("type", type);
  // console.log("내가좋아요한코멘트", isUserComment);

  // comment 안에 있는 createdAt 사용하기
  const commentDate = isUserComment?.createdAt?.toDate().toLocaleDateString();

  const onClickDel = async () => {
    const result = await showConfirmAlert({
      title: "삭제",
      text: "해당 코멘트를 삭제하시겠습니까?",
    });

    if (result.isConfirmed) {
      await commentDelete(isUserComment);
      await showSuccessAlert({
        text: "성공적으로 삭제되었습니다!",
        confirmButtonText: "확인!",
      });
      refreshComments();
    }
  };

  const onClickUnLiked = async () => {
    const result = await showConfirmAlert({
      title: "좋아요 취소",
      text: "해당 코멘트 좋아요 취소하시겠습니까?",
    });
    if (result.isConfirmed) {
      // 이미 좋아요 누른 상태라서 true를 넘김
      await commentLiked(isUserComment, uid, true);
      await showSuccessAlert({
        text: "성공적으로 취소되었습니다!",
        confirmButtonText: "확인!",
      });
      await refreshComments();
    }
  };

  const { data: movieDetail } = useMovieDetail(isUserComment.movieId);

  // console.log(movieDetail, "영화디테일");

  return (
    <div className="UserCommentList">
      <div className="UserCommentList_user">
        <div className="userName">{isUserComment.displayName}</div>
        <div className="date">{commentDate}</div>
        <div>
          <img src={yellowStar} className="movieCommentStarImg" />
          {isUserComment.score}
        </div>
      </div>
      <hr className="UserCommentList_hr" />
      <div className="UserCommentList_movie">
        <Link to={`/contents/${isUserComment.movieId}`}>
          <div className="UserCommentList_movieposter">
            <img src={movieDetail?.posterImg} className="movie_poster" />
          </div>
        </Link>
        <div className="UserCommentList_movie_info">
          <Link
            to={`/contents/${isUserComment.movieId}`}
            className="userCommentList_link"
          >
            <div>{movieDetail?.title}</div>
            <div>{movieDetail?.prodYear}</div>
          </Link>
        </div>
      </div>
      <div className="UserCommentList_comment">{isUserComment.comment}</div>
      <hr className="UserCommentList_hr" />
      <div className="UserCommentList_del">
        <div className="UserCommentList_likes">
          좋아요 {isUserComment.likes.length || 0}
        </div>
        {type === "liked" ? (
          <button onClick={onClickUnLiked}>좋아요 취소하기</button>
        ) : (
          <button onClick={onClickDel}>삭제</button>
        )}
      </div>
    </div>
  );
};

export default UserCommentList;

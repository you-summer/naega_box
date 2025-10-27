// import { commentDelete } from "../../../api/firebaseDB";
// import useMovieDetail from "../../../hooks/useMovieDetail";
// import {
//   showConfirmAlert,
//   showSuccessAlert,
// } from "../../../util/get-sweet-alert";
// import "../components/CommentList.css";
// import yellowStar from "../../../assets/yellowStar.png";

// const CommentList = ({ isUserComment, refreshComments }) => {
//   // comment 안에 있는 createdAt 사용하기
//   const commentDate = isUserComment?.createdAt?.toDate().toLocaleDateString();

//   const onClickDel = async () => {
//     const result = await showConfirmAlert({
//       title: "삭제",
//       text: "해당 코멘트를 삭제하시겠습니까?",
//     });

//     if (result.isConfirmed) {
//       await commentDelete(isUserComment);
//       await showSuccessAlert({
//         text: "성공적으로 삭제되었습니다!",
//         confirmButtonText: "확인!",
//       });
//       refreshComments();
//     }
//   };

//   const { data: movieDetail } = useMovieDetail(isUserComment.movieId);

//   //   console.log(movieDetail, "영화디테일");

//   return (
//     <div className="UserCommentList">
//       <div className="UserCommentList_user">
//         <div className="userName">{isUserComment.displayName}</div>
//         <div className="date">{commentDate}</div>
//         <div>
//           <img src={yellowStar} className="movieCommentStarImg" />
//           {isUserComment.score}
//         </div>
//       </div>
//       <hr className="UserCommentList_hr" />
//       <div className="UserCommentList_movie">
//         <Link to={`/contents/${isUserComment.movieId}`}>
//           <div className="UserCommentList_movieposter">
//             <img src={movieDetail?.posterImg} className="movie_poster" />
//           </div>
//         </Link>
//         <div className="UserCommentList_movie_info">
//           <Link
//             to={`/contents/${isUserComment.movieId}`}
//             className="userCommentList_link"
//           >
//             <div>{movieDetail?.title}</div>
//             <div>{movieDetail?.prodYear}</div>
//           </Link>
//         </div>
//       </div>
//       <div className="UserCommentList_comment">{isUserComment.comment}</div>
//       <hr className="UserCommentList_hr" />
//       <div className="UserCommentList_del">
//         <div className="UserCommentList_likes">
//           좋아요 {isUserComment.likes.length || 0}
//         </div>
//         <button onClick={onClickDel}>삭제</button>
//       </div>
//     </div>
//   );
// };
// export default CommentList;

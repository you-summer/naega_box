import { useContext } from "react";
import { MovieDatailStateContext } from "../MovieDetail";
import "./MovieComment.css";
import greyStar from "../../../assets/greyStar.png";
import yelloStar from "../../../assets/yellowStar.png";
import MovieCommentList from "./MovieCommentList";

const MovieComment = () => {
  const data = useContext(MovieDatailStateContext);
  const starArray = [0, 1, 2, 3, 4];

  // console.log(data, "여기에는 머가?");

  return (
    <div className="MovieComment">
      <hr className="movieComment_hr" />
      <h3>무비코멘트</h3>
      <div className="MovieComment_input">
        <div className="movieComment_star">
          <div className="movieCommentStarText">별점을 선택해주세요.</div>
          <div className="movieCommentStarImgDiv">
            {starArray.map((item) => {
              return <img src={greyStar} className="movieCommentStarImg" />;
            })}
          </div>
        </div>
        <div className="movieComment_comment">
          <textarea
            name=""
            id=""
            className="movieCommentTextarea"
            placeholder="영화 어떠셨나요? 관람평을 입력해주세요!"
          ></textarea>
          <button className="movieCommentButton">등록</button>
        </div>
      </div>
      <hr className="movieComment_hr" />
      <MovieCommentList />
    </div>
  );
};
export default MovieComment;

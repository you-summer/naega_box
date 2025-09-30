import { useContext } from "react";
import { MovieDatailStateContext } from "../MovieDetail";
import "./MovieComment.css";

const MovieComment = () => {
  const data = useContext(MovieDatailStateContext);

  return (
    <div className="MovieComment">
      <h3>무비코멘트</h3>
      <div className="MovieComment_input">
        <div className="movieComment_star">별별별별별</div>
        <textarea name="" id=""></textarea>
        <button>등록</button>
      </div>
      <hr className="movieComment_hr" />
    </div>
  );
};
export default MovieComment;

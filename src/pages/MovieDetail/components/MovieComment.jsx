import { useContext } from "react";
import { MovieDatailStateContext } from "../MovieDetail";
import "./MovieComment.css";

const MovieComment = () => {
  const data = useContext(MovieDatailStateContext);

  return <div className="MovieComment">무비코멘트</div>;
};
export default MovieComment;

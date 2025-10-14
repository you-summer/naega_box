import { useState } from "react";
import "./MovieDetailZzim.css";
import heart_line from "../../../assets/heart_line.png";
import heart from "../../../assets/heart.png";

const MovieDetailZzim = () => {
  const [isZzim, setZzim] = useState(false);

  const onClickHeart = () => {
    return setZzim(!isZzim);
  };

  return (
    <div className="movieZzimDiv" onClick={onClickHeart}>
      <img src={isZzim ? heart : heart_line} className="zzim" />
      <span className="tool-tip">{`${
        isZzim ? "찜 해제하기!" : "이 영화 찜하기!"
      }`}</span>
    </div>
  );
};
export default MovieDetailZzim;

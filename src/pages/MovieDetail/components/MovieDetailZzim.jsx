import { useContext, useState } from "react";
import "./MovieDetailZzim.css";
import heart_line from "../../../assets/heart_line.png";
import heart from "../../../assets/heart.png";
import { UserStateContext } from "../../../App";
import { showConfirmAlert } from "../../../util/get-sweet-alert";

const MovieDetailZzim = ({ DOCID }) => {
  const currentUser = useContext(UserStateContext);
  console.log(currentUser, "찜");
  const [isZzim, setZzim] = useState(false);
  console.log(DOCID, "영화고유값");

  const onClickHeart = () => {
    if (!currentUser.user) {
      return showConfirmAlert({ text: "로그인이 필요합니다!" });
    }
    return setZzim(!isZzim);
  };

  return (
    <div className="movieZzimDiv" onClick={onClickHeart}>
      <img src={isZzim ? heart : heart_line} className="zzim" />
      <span className="tool-tip">
        {isZzim ? "찜 해제하기!" : "이 영화 찜하기!"}
      </span>
    </div>
  );
};
export default MovieDetailZzim;

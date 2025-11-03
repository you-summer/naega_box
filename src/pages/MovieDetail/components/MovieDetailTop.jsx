import { MovieDatailStateContext } from "../MovieDetail";
import "./MovieDetailTop.css";
// import useMovieDetail from "../../../hooks/useMovieDetail";
import { useContext } from "react";
import noImage from "../../../assets/noImage.png";

const MovieDetailTop = () => {
  const data = useContext(MovieDatailStateContext);
  // console.log(data);

  return (
    <div className="MovieDetailTop">
      <div className="MovieDetailHeaderDiv">
        <img src={data.stillImg || noImage} className="MovieDetailHeaderImg" />
        <div className="MovieDetailTitle">{data.title}</div>
        <div className="MovieDetailEngTitle">{data.titleEng}</div>
        <div className="MovieDetailTopContent">
          {data.type} · {data.rating} · {data.prodYear} · {data.runtime}분
        </div>
        <div className="MovieDetailgenre">
          {data.nation} · {data.genre}
        </div>
      </div>
    </div>
  );
};
export default MovieDetailTop;

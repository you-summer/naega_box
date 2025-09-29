import { MovieDatailStateContext } from "../MovieDetail";
import "./MovieDetailTop.css";
// import useMovieDetail from "../../../hooks/useMovieDetail";
import { useContext } from "react";

const MovieDetailTop = () => {
  const data = useContext(MovieDatailStateContext);
  console.log(data);

  return (
    <div>
      <div className="MovieDetailHeaderDiv">
        <img src={data.stillImg} className="MovieDetailHeaderImg" />
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

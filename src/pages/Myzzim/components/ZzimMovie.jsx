import { useEffect, useState } from "react";
import "./ZzimMovie.css";
import useMovieDetail from "../../../hooks/useMovieDetail";
import noImg from "../../../assets/noImage.png";

const ZzimMovie = ({ data }) => {
  console.log("item확인", data);

  const { data: movieDetail } = useMovieDetail(data);

  console.log(movieDetail);
  return (
    <div className="ZzimMovie">
      <div className="zzimMovie_poster">
        <img
          src={movieDetail.posterImg || noImg}
          className="zzimMovie_posterImg"
        />
      </div>
      <div className="zzimMovie_title">{movieDetail.title}</div>
    </div>
  );
};
export default ZzimMovie;

import { useContext } from "react";
import { MovieDatailStateContext } from "../MovieDetail";
import "./MovieDetailContent.css";

const MovieDetailContent = () => {
  const data = useContext(MovieDatailStateContext);
  //   const plot = () => {};
  if (
    !data ||
    !data.plots ||
    !data.plots.plot[0] ||
    !data.plots.plot[0].plotText
  ) {
    return <div>데이터 로딩중</div>;
  }

  let plots = data.plots.plot[0].plotText;
  let plotsFormatted = plots
    .replace(/다([.?])(?!\s|”)/g, "다$1\n") // '다.' 뒤에 공백 없고, ”가 아니면 줄바꿈
    .replace("  ", "\n")
    .replace(/ “/g, "\n“")
    .replace(/”/g, "”\n")
    .replace(/!/g, "!\n");

  return (
    <div className="MovieDetailContent">
      <div className="moviePoster">
        <img src={`${data.posterImg}`} className="moviePosterImg" />
      </div>
      <div className="movieContent">
        <h3 className="movieContentTitle">줄거리</h3>
        <p>{plotsFormatted}</p>
      </div>
    </div>
  );
};
export default MovieDetailContent;

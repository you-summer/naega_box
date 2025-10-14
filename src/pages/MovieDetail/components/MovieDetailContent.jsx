import { useContext } from "react";
import { MovieDatailStateContext } from "../MovieDetail";
import "./MovieDetailContent.css";
import heart_line from "../../../assets/heart_line.png";
import noImage from "../../../assets/noImage.png";
import MovieStaff from "./MovieStaff";

const MovieDetailContent = () => {
  const data = useContext(MovieDatailStateContext);
  //   const plot = () => {};

  const actors = data?.staffs?.staff?.filter((item) => {
    return item.staffRoleGroup === "출연";
  });

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
    .replace(/!/g, "!\n")
    .replace(/…/g, "…\n");

  return (
    <div className="MovieDetailContent">
      <div className="movieDetailTop">
        <div className="moviePoster">
          <div className="moviePosterDiv">
            <img src={data.posterImg || noImage} className="moviePosterImg" />
          </div>
          <div className="movieZzimDiv">
            <img src={heart_line} className="zzim" />
            <span className="tool-tip">이 영화 찜하기!</span>
          </div>
        </div>
        <div className="movieContent">
          <div>{/* <h3 className="movieContentTitle">키워드</h3> */}</div>
          <div>
            <h3 className="movieContentTitle">줄거리</h3>
            <p>{plotsFormatted}</p>
          </div>
        </div>
      </div>

      <div>
        <MovieStaff actors={actors} />
      </div>
    </div>
  );
};
export default MovieDetailContent;

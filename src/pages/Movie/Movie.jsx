import { useEffect, useState } from "react";
import Header from "../../components/Header";
import HomeMovieCarousel from "../../components/HomeMovieCarousel";
import useBoxOfficeDaily from "../../hooks/useBoxOfficeDaily";
import { getMovieComingSoon } from "../../api/kmdbApi";

const Movie = () => {
  const { movieCdata } = useBoxOfficeDaily();
  // 개봉예정 영화 가져오는 useState
  const [movieComing, setMovieComing] = useState([]);

  useEffect(() => {
    const storedData = async () => {
      const data = await getMovieComingSoon();
      setMovieComing(data);
    };

    storedData();
  }, []);
  return (
    <div>
      <Header type={"MOVIE"} />
      <HomeMovieCarousel text={"박스오피스 순위"} data={movieCdata} />
      <HomeMovieCarousel text={"개봉 예정작"} data={movieComing} />
    </div>
  );
};
export default Movie;

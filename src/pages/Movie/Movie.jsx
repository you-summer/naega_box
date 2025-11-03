import { useEffect, useState } from "react";
import Header from "../../components/Header";
import HomeMovieCarousel from "../../components/HomeMovieCarousel";
import useBoxOfficeDaily from "../../hooks/useBoxOfficeDaily";
import useKmdbMVComingSoon from "../../hooks/useKmdbMVComingSoon";
import { getdirectorMv, getXmasMv } from "../../api/kmdbApi";

const Movie = () => {
  const { movieCdata } = useBoxOfficeDaily();
  const { movieComing } = useKmdbMVComingSoon();

  const [mvdata, setData] = useState([]);
  const [seasonMv, setSeasonMv] = useState([]);

  useEffect(() => {
    const getMv = async () => {
      const directMv = await getdirectorMv();
      const seasonMv = await getXmasMv();

      // console.log("데이터", data1);
      setData(directMv);
      setSeasonMv(seasonMv);
    };

    getMv();
  }, []);

  // console.log("박찬욱 ", mvdata);

  return (
    <div>
      <Header type={"MOVIE"} />
      <HomeMovieCarousel
        text={"개봉 예정작"}
        data={movieComing}
        type={"coming"}
      />
      <HomeMovieCarousel
        text={"박스오피스 순위"}
        data={movieCdata}
        type={"boxOffice"}
      />
      <HomeMovieCarousel
        text={"박찬욱 감독의 영화를 만나보세요!"}
        data={mvdata}
        type={"movie"}
      />
      <HomeMovieCarousel
        text={"다가오는 크리스마스! 이 영화 어떠세요?"}
        data={seasonMv}
        type={"season"}
      />
    </div>
  );
};
export default Movie;

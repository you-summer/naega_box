import { useEffect, useState } from "react";
import Carousel from "../../components/Carousel";
import Header from "../../components/Header";
import HomeMovieCarousel from "../../components/HomeMovieCarousel";
import useBoxOfficeDaily from "../../hooks/useBoxOfficeDaily";
import { getMovieComingSoon } from "../../api/kmdbApi.js";

const Home = () => {
  // 박스오피스 데이터
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
      <Header type={"HOME"} />
      <Carousel />
      <HomeMovieCarousel text={"오늘의 영화는?"} data={movieCdata} />
      {/* <div>인기코멘트</div> */}
      <HomeMovieCarousel text={"개봉 예정작"} data={movieComing} />
    </div>
  );
};
export default Home;

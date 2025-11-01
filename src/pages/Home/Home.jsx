import { useEffect, useState } from "react";
import Carousel from "../../components/Carousel";
import Header from "../../components/Header";
import HomeMovieCarousel from "../../components/HomeMovieCarousel";
import useBoxOfficeDaily from "../../hooks/useBoxOfficeDaily";
import { getTomorrowAndOneMonthLater } from "../../util/get-date.js";

const Home = () => {
  // 박스오피스 데이터
  const { movieCdata } = useBoxOfficeDaily();

  const KMDB_API_KEY = import.meta.env.VITE_KMDB_API_KEY;

  const [movieComing, setMovieComing] = useState([]);

  const { tomorrow, oneMonthLater } = getTomorrowAndOneMonthLater();

  const getMovieComingSoon = async () => {
    const kmdbUrl = `https://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2&detail=Y&ratedYn=Y&releaseDts=${tomorrow}&releaseDte=${oneMonthLater}&listCount=500&ServiceKey=${KMDB_API_KEY}`;
    let kmdbRes = await fetch(kmdbUrl);
    let data = await kmdbRes.json();
    let arrayData = data.Data[0].Result;

    arrayData = arrayData.filter((item) => {
      return !item.genre?.includes("에로");
    });

    const getSortedData = arrayData.toSorted((a, b) => {
      return Number(a.repRlsDate) - Number(b.repRlsDate);
    });

    console.log("개봉예정", getSortedData);
    setMovieComing(getSortedData);
  };

  useEffect(() => {
    getMovieComingSoon();
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

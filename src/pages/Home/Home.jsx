import { useEffect, useState } from "react";
import Carousel from "../../components/Carousel";
import Header from "../../components/Header";
import HomeMovieCarousel from "../../components/HomeMovieCarousel";
import useBoxOfficeDaily from "../../hooks/useBoxOfficeDaily";

const Home = () => {
  // 박스오피스 데이터
  const { movieCdata } = useBoxOfficeDaily();

  const KMDB_API_KEY = import.meta.env.VITE_KMDB_API_KEY;

  const [movieComing, setMovieComing] = useState([]);

  // 오늘날짜 +1
  const comingDate = () => {
    const today = new Date();

    // 내일날짜
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    // 내일+1달뒤
    const oneMonthLater = new Date(tomorrow);
    oneMonthLater.setMonth(tomorrow.getMonth() + 1);

    // 날짜 포맷
    const formatDate = (date) => {
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      if (month < 10) {
        month = `0${month}`;
      }
      if (day < 10) {
        day = `0${day}`;
      }

      return `${year}${month}${day}`;
    };

    return {
      tomorrow: formatDate(tomorrow),
      oneMonthLater: formatDate(oneMonthLater),
    };
  };

  const { tomorrow, oneMonthLater } = comingDate();

  const getMovieComingSoon = async () => {
    const kmdbUrl = `https://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2&detail=Y&ratedYn=Y&releaseDts=${tomorrow}&releaseDte=${oneMonthLater}&listCount=500&ServiceKey=${KMDB_API_KEY}`;
    let kmdbRes = await fetch(kmdbUrl);
    let data = await kmdbRes.json();
    let arrayData = data.Data[0].Result;

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
      <div>인기코멘트</div>
      <HomeMovieCarousel text={"개봉 예정작"} data={movieComing} />
    </div>
  );
};
export default Home;

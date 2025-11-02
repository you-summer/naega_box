import { useEffect, useState } from "react";
import { getTomorrowAndOneMonthLater } from "../util/get-date";

const useKmdbMVComingSoon = () => {
  const KMDB_API_KEY = import.meta.env.VITE_KMDB_API_KEY;

  const [movieComing, setMovieComing] = useState([]);

  const getMovieComingSoon = async () => {
    const { tomorrow, oneMonthLater } = getTomorrowAndOneMonthLater();
    const kmdbUrl = `https://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2&detail=Y&ratedYn=Y&releaseDts=${tomorrow}&releaseDte=${oneMonthLater}&listCount=500&ServiceKey=${KMDB_API_KEY}`;
    let kmdbRes = await fetch(kmdbUrl);
    let data = await kmdbRes.json();
    let arrayData = data.Data[0].Result;

    //에로 장르 데이터 필터링
    arrayData = arrayData.filter((item) => {
      return !item.genre?.includes("에로");
    });

    const getSortedData = arrayData.toSorted((a, b) => {
      return Number(a.repRlsDate) - Number(b.repRlsDate);
    });

    setMovieComing(getSortedData);
  };

  useEffect(() => {
    getMovieComingSoon();
  }, []);

  return { movieComing };
};

export default useKmdbMVComingSoon;

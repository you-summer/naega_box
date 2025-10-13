import { useEffect, useState } from "react";
import { getYesterday } from "../util/get-date.js";

const useBoxOfficeDaily = () => {
  const KOBIS_API_KEY = import.meta.env.VITE_KOBIS_API_KEY;
  const KMDB_API_KEY = import.meta.env.VITE_KMDB_API_KEY;

  const getBoxOfficeAndDetail = async () => {
    // 박스오피스 1~10위 데이터
    let targetDt = getYesterday();
    let boxUrl = `https://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=${KOBIS_API_KEY}&targetDt=${targetDt}`;
    let boxRes = await fetch(boxUrl);
    let boxData = await boxRes.json();
    const boxOfficeRank = boxData.boxOfficeResult.dailyBoxOfficeList;
    // console.log("박스오피스", boxOfficeRank);

    const kmdbBoxOfficeDetails = boxOfficeRank.map(async (boxOffice) => {
      let movieTitle = boxOffice.movieNm;
      let apiMovieTitle = encodeURIComponent(movieTitle);
      let relDate = boxOffice.openDt.replace(/-/g, ""); //g문자열 전체에서 -를 ""로 바꾸겠다는 뜻
      let kmdbUrl = `https://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2&detail=Y&title=${apiMovieTitle}&releaseDts=${relDate}&ServiceKey=${KMDB_API_KEY}`;
      let kmdbRes = await fetch(kmdbUrl);
      let data = await kmdbRes.json();
      let movieData = await data.Data[0].Result[0];
      let still = await movieData.stlls;
      let stillFirstImage = await still.split("|")[0];
      let stillImg = stillFirstImage
        .replace("thm/01", "still")
        .replace("tn_", "")
        .replace(".jpg", "_01.jpg")
        .replace(".JPG", "_01.jpg");
      let poster = await movieData.posters;
      let posterFirstImage = await poster.split("|")[0];
      let DOCID = await movieData.DOCID;
      return {
        ...movieData,
        title: movieTitle,
        still: stillImg,
        posters: posterFirstImage,
        data: data,
        DOCID: DOCID,
      };
    });

    const movies = await Promise.all(kmdbBoxOfficeDetails);
    setMovieCdata(movies);
    console.log("모든영화", movies);
  };

  //

  const [movieCdata, setMovieCdata] = useState([]);
  useEffect(() => {
    getBoxOfficeAndDetail();
  }, []);

  return { movieCdata };
};

export default useBoxOfficeDaily;

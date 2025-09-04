import { useRef, useState, useEffect } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./Carousel.css";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import eximage from "../assets/NAEGA_BOX_LOGO5.png";

export default function Carousel() {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty("--progress", 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };

  const KOBIS_API_KEY = import.meta.env.VITE_KOBIS_API_KEY;
  const KMDB_API_KEY = import.meta.env.VITE_KMDB_API_KEY;

  let boxOfficeDate = () => {
    let year = new Date().getFullYear();
    let month = new Date().getMonth() + 1;
    let date = new Date().getDate() - 1;
    if (month < 10) {
      month = `0${month}`;
    }
    if (date < 10) {
      date = `0${date}`;
    }
    return `${year}${month}${date}`;
  };

  const getBoxOfficeAndDetail = async () => {
    // 박스오피스 1~10위 데이터
    let targetDt = boxOfficeDate();
    let boxUrl = `https://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=${KOBIS_API_KEY}&targetDt=${targetDt}`;
    let boxRes = await fetch(boxUrl);
    let boxData = await boxRes.json();
    const boxOfficeRank = boxData.boxOfficeResult.dailyBoxOfficeList;
    console.log("박스오피스", boxOfficeRank);

    const testdata = boxOfficeRank.map(async (boxOffice) => {
      let movieTitle = boxOffice.movieNm;
      let apiMovieTitle = encodeURIComponent(movieTitle);
      let relDate = boxOffice.openDt.replace(/-/g, ""); //g문자열 전체에서 -를 ""로 바꾸겠다는 뜻
      let kmdbUrl = `https://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2&detail=Y&title=${apiMovieTitle}&releaseDts=${relDate}&ServiceKey=${KMDB_API_KEY}`;
      let kmdbRes = await fetch(kmdbUrl);
      let data = await kmdbRes.json();
      // console.log("영화디테일", data);
      return {
        title: movieTitle,
        data: data,
      };
    });

    const movies = await Promise.all(testdata);
    console.log("모든영화", movieCdata);
    setMovieCdata(movies);
  };

  //

  const [movieCdata, setMovieCdata] = useState([]);
  useEffect(() => {
    getBoxOfficeAndDetail();
  }, []);

  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 10000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="mySwiper"
      >
        {movieCdata.map((item) => {
          return (
            <SwiperSlide>
              <div>
                <div>{item.title}</div>
              </div>
            </SwiperSlide>
          );
        })}
        {/* <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
        <SwiperSlide>Slide 5</SwiperSlide>
        <SwiperSlide>Slide 6</SwiperSlide>
        <SwiperSlide>Slide 7</SwiperSlide>
        <SwiperSlide>Slide 8</SwiperSlide>
        <SwiperSlide>Slide 9</SwiperSlide>
        <SwiperSlide>Slide 10</SwiperSlide> */}

        <div className="autoplay-progress" slot="container-end">
          <svg viewBox="0 0 48 48" ref={progressCircle}>
            <circle cx="24" cy="24" r="20"></circle>
          </svg>
          <span ref={progressContent}></span>
        </div>
      </Swiper>
    </>
  );
}

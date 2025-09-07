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
    // console.log("박스오피스", boxOfficeRank);

    const testdata = boxOfficeRank.map(async (boxOffice) => {
      let movieTitle = boxOffice.movieNm;
      let apiMovieTitle = encodeURIComponent(movieTitle);
      let relDate = boxOffice.openDt.replace(/-/g, ""); //g문자열 전체에서 -를 ""로 바꾸겠다는 뜻
      let kmdbUrl = `https://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2&detail=Y&title=${apiMovieTitle}&releaseDts=${relDate}&ServiceKey=${KMDB_API_KEY}`;
      let kmdbRes = await fetch(kmdbUrl);
      let data = await kmdbRes.json();
      let still = await data.Data[0].Result[0].stlls;
      let stillFirstImage = await still.split("|")[0];
      let stillImg = stillFirstImage
        .replace("thm/01", "still")
        .replace("tn_", "")
        .replace(".jpg", "_01.jpg")
        .replace(".JPG", "_01.jpg");
      return {
        title: movieTitle,
        still: stillImg,
        data: data,
      };
    });

    const movies = await Promise.all(testdata);
    setMovieCdata(movies);
    console.log("모든영화", movies);
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
          delay: 3000,
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
        {movieCdata.map((item, index) => {
          return (
            <SwiperSlide>
              {/* <div className="movieCarouselStill"> */}
              <img src={item.still} className="movieCarouselStill" />
              {/* </div> */}
              <div className="carousel_movieSubTitle">
                박스오피스{" "}
                <span className="carousel_rank">{`${index + 1}`}</span>위
              </div>
              <div className="carousel_movieTitle">{item.title}</div>
            </SwiperSlide>
          );
        })}

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

import { Virtual, Navigation, Pagination, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import noImage from "../assets/noImage.png";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./HomeMovieCarousel.css";
import { Link } from "react-router-dom";

const HomeMovieCarousel = ({ text, data }) => {
  const movieData = data;
  console.log("오류?", movieData);

  const formatDate = (date) => {
    if (!date) return "";
    let year = date.slice(0, 4);
    let month = date.slice(4, 6);
    let day = date.slice(6, 8);

    if (day === "00") {
      return `${year}.${month}`;
    }

    return `${year}.${month}.${day}`;
  };

  return (
    <>
      <div className="HomeMovieCarousel">
        <div className="homeMovieCarousel_title">{text}</div>
        <Swiper
          modules={[Virtual, Navigation, Pagination, EffectFade]}
          // onSwiper={setSwiperRef}
          spaceBetween={0} // 슬라이드 간격 없앰
          slidesPerView={5} // 한 화면에 5개 보임
          slidesPerGroup={5} // 이동할 때 5개씩 이동
          centeredSlides={false} // 왼쪽 시작 // true 중앙시작
          // pagination={{
          //   type: "fraction",
          // }}
          navigation={true}
          virtual
          speed={1000} // 1초
          allowTouchMove={false} // 드래그 막음
          preventClicks={true} // 클릭 허용
          preventClicksPropagation={false} // 클릭 전파 막지 않음
          // loop={true}
          breakpoints={{
            1200: { slidesPerView: 5, spaceBetween: 10 },
            992: { slidesPerView: 4, spaceBetween: 10 },
            768: { slidesPerView: 3, spaceBetween: 10 },
            576: { slidesPerView: 2, spaceBetween: 10 },
            0: { slidesPerView: 1, spaceBetween: 10 },
          }}
        >
          {movieData &&
            movieData.map((item, index) => {
              return (
                <SwiperSlide key={item.key} virtualIndex={index}>
                  <Link
                    to={`/contents/${item.DOCID}`}
                    className="homeMovieCarousel_contents"
                  >
                    <div className="homeMovieCarousel_wrapper">
                      <img
                        src={
                          item.posters ? item.posters.split("|")[0] : noImage
                        }
                        className="movie_img"
                      />
                      <div>
                        {data.length <= 10 ? (
                          <>
                            <span className="index">{index + 1}위</span>
                          </>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="homeMovieCarousel_content">
                        <div className="homeMovieCarousel_content_title">
                          {item.title}
                        </div>
                        <div className="homeMovieCarousel_content_relDate">
                          개봉일 : {formatDate(item.repRlsDate)}
                        </div>
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              );
            })}
        </Swiper>
      </div>
    </>
  );
};

export default HomeMovieCarousel;

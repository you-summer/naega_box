import { Virtual, Navigation, Pagination, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./HomeMovieCarousel.css";
import { Link } from "react-router-dom";

const HomeMovieCarousel = ({ text, data }) => {
  const movieData = data;
  console.log("오류?", movieData);

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
                    to={`/contents/${item.docid}`}
                    className="homeMovieCarousel_contents"
                  >
                    <div className="homeMovieCarousel_wrapper">
                      <img src={item.poster} className="movie_img" />
                      <div className="index">
                        <span>{index + 1}</span>위
                      </div>
                      <div className="homeMovieCarousel_content">
                        <div className="homeMovieCarousel_content_title">
                          {item.title}
                        </div>
                        <div></div>
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

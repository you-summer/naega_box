import { useRef, useState } from "react";
import { Virtual, Navigation, Pagination, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./HomeMovieCarousel.css";

const HomeMovieCarousel = ({ text }) => {
  // const [swiperRef, setSwiperRef] = useState(null);
  // const appendNumber = useRef(500);
  // const prependNumber = useRef(1);
  // Create array with 500 slides
  // const [slides, setSlides] = useState(
  //   Array.from({ length: 500 }).map((_, index) => `Slide ${index + 1}`)
  // );

  // const prepend = () => {
  //   setSlides([
  //     `Slide ${prependNumber.current - 2}`,
  //     `Slide ${prependNumber.current - 1}`,
  //     ...slides,
  //   ]);
  //   prependNumber.current = prependNumber.current - 2;
  //   swiperRef.slideTo(swiperRef.activeIndex + 2, 0);
  // };

  // const append = () => {
  //   setSlides([...slides, "Slide " + ++appendNumber.current]);
  // };

  // const slideTo = (index) => {
  //   swiperRef.slideTo(index - 1, 0);
  // };

  let ex = [
    { key: 1, value: "1" },
    { key: 2, value: "2" },
    { key: 3, value: "3" },
    { key: 4, value: "4" },
    { key: 5, value: "5" },
    { key: 6, value: "6" },
    { key: 7, value: "7" },
    { key: 8, value: "8" },
    { key: 8, value: "9" },
    { key: 10, value: "10" },
  ];

  return (
    <>
      <div className="HomeMovieCarousel">
        <div className="homeMovieCarousel_title">{text}</div>
        <Swiper
          modules={[Virtual, Navigation, Pagination, EffectFade]}
          // onSwiper={setSwiperRef}
          spaceBetween={30}
          slidesPerView={5} // 한 화면에 5개 보임
          slidesPerGroup={5} // 이동할 때 5개씩 이동
          centeredSlides={false} // 왼쪽 시작 // true 중앙시작
          // pagination={{
          //   type: "fraction",
          // }}
          navigation={true}
          virtual
          speed={1000} // 1초
          allowTouchMove={false} // 마우스/터치 드래그 차단
        >
          {ex.map((item, index) => {
            return (
              <SwiperSlide key={item.key} virtualIndex={index}>
                {item.value}
              </SwiperSlide>
            );
          })}
        </Swiper>

        {/* <p className="append-buttons">
          <button onClick={() => prepend()} className="prepend-2-slides">
            Prepend 2 Slides
          </button>
          <button onClick={() => slideTo(1)} className="prepend-slide">
            Slide 1
          </button>
          <button onClick={() => slideTo(250)} className="slide-250">
            Slide 250
          </button>
          <button onClick={() => slideTo(500)} className="slide-500">
            Slide 500
          </button>
          <button onClick={() => append()} className="append-slides">
            Append Slide
          </button>
        </p> */}
      </div>
    </>
  );
};

export default HomeMovieCarousel;

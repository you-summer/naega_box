import Carousel from "../../components/Carousel";
import Header from "../../components/Header";
import HomeMovieCarousel from "../../components/HomeMovieCarousel";
import useBoxOfficeDaily from "../../hooks/useBoxOfficeDaily";

const Home = () => {
  // 박스오피스 데이터
  const { movieCdata } = useBoxOfficeDaily();

  return (
    <div>
      <Header type={"HOME"} />
      <Carousel />
      <HomeMovieCarousel text={"오늘의 영화는?"} data={movieCdata} />
      <div>인기코멘트</div>
      {/* <HomeMovieCarousel text={"최신순"} />
      <HomeMovieCarousel text={"개봉예정"} /> */}
    </div>
  );
};
export default Home;

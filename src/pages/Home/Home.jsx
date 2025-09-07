import Carousel from "../../components/Carousel";
import Header from "../../components/Header";
import HomeMovieCarousel from "../../components/HomeMovieCarousel";

const Home = () => {
  return (
    <div>
      <Header type={"HOME"} />
      <Carousel />
      <HomeMovieCarousel text={"박스오피스 순위"} />
      <div>인기코멘트</div>
      <HomeMovieCarousel text={"최신순"} />
      <HomeMovieCarousel text={"개봉예정"} />
    </div>
  );
};
export default Home;

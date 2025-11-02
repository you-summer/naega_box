import "../components/Upcoming.css";
import Header from "../../../components/Header";
import UpcomingList from "./UpcomingList";

const Upcoming = () => {
  return (
    <>
      <Header type={"MOVIE"} />
      <div className="Upcoming">
        <div className="upcomig_title">
          <h2>개봉 예정작</h2>
          <div>기준 (오늘날짜로 부터 한달)</div>
        </div>
        <UpcomingList />
      </div>
    </>
  );
};
export default Upcoming;

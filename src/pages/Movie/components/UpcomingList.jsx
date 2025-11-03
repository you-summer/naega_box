import "../components/UpcomingList.css";
import useKmdbMVComingSoon from "../../../hooks/useKmdbMVComingSoon";
import { Link } from "react-router-dom";
import { getRelFormatDate } from "../../../util/get-date";
import noImage from "../../../assets/noImage.png";

const UpcomingList = () => {
  const { movieComing } = useKmdbMVComingSoon();
  //   console.log(movieComing);

  return (
    <div className="UpcomingList">
      {movieComing.map((item) => {
        return (
          <>
            <Link to={`/contents/${item.DOCID}`} className="upcomingList_link">
              <img
                src={item.posters ? item.posters.split("|")[0] : noImage}
                className="upcomingList_img"
              />
              <div className="upcomingList_title">
                <div>{item.title}</div>
                <div>개봉일 : {getRelFormatDate(item.repRlsDate)}</div>
              </div>
            </Link>
          </>
        );
      })}
    </div>
  );
};
export default UpcomingList;

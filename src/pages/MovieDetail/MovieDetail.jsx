import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../../components/Header";
import "./MovieDetail.css";

const MovieDetail = () => {
  const params = useParams();
  const movieId = params.docid.slice(0, 1); // docid 첫글자
  const movieSeq = params.docid.slice(1); // docid 첫글자 이후 ~ 끝글자

  const KMDB_API_KEY = import.meta.env.VITE_KMDB_API_KEY;

  const [data, setData] = useState({});

  useEffect(() => {
    kmdbDetailsAPI();
  }, []);

  const kmdbDetailsAPI = async () => {
    let kmdbUrl = `https://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2&detail=Y&movieId=${movieId}&movieSeq=${movieSeq}&ServiceKey=${KMDB_API_KEY}`;
    let kmdbRes = await fetch(kmdbUrl);
    let kmdbData = await kmdbRes.json();

    const movieData = kmdbData.Data[0].Result[0];

    const stills = movieData.stlls;
    let stillFirstImage = "";
    let stillImg = "";
    if (stills) {
      stillFirstImage = stills.split("|")[0];
      stillImg = stillFirstImage
        .replace("thm/01", "still")
        .replace("tn_", "")
        .replace(".jpg", "_01.jpg")
        .replace(".JPG", "_01.jpg");
    }

    setData({
      ...movieData,
      stillImg: stillImg,
    });
  };

  console.log(data);
  return (
    <div className="MovieDetail">
      <Header type={"CONTENTS"} />
      <div className="MovieDetailHeaderDiv">
        <img src={data.stillImg} className="MovieDetailHeaderImg" />
        <div className="MovieDetailTitle">{data.title}</div>
        <div className="MovieDetailEngTitle">{data.titleEng}</div>
        <div className="MovieDetailContent">
          {data.type} · {data.rating} · {data.prodYear} · {data.runtime}분
        </div>
        <div className="MovieDetailgenre">
          {data.nation} · {data.genre}
        </div>
      </div>
      {/* {params.docid} MovieDetail */}
    </div>
  );
};
export default MovieDetail;

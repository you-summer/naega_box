import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const useMovieDetail = () => {
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
    const posters = movieData.posters;

    let stillFirstImage = "";
    let stillImg = "";
    let posterFirstImage = "";
    let posterImg = "";

    if (stills) {
      stillFirstImage = stills.split("|")[0];
      stillImg = stillFirstImage
        .replace("thm/01", "still")
        .replace("tn_", "")
        .replace(".jpg", "_01.jpg")
        .replace(".JPG", "_01.jpg");
    }

    if (posters) {
      posterFirstImage = posters.split("|")[0];
      posterImg = posterFirstImage
        .replace("thm/02", "poster")
        .replace("tn_", "")
        .replace(".jpg", "_01.jpg")
        .replace(".JPG", "_01.jpg");
    }

    setData({
      ...movieData,
      stillImg: stillImg,
      posterImg: posterImg,
    });
  };
  return { data };
};
export default useMovieDetail;

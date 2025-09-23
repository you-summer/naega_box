import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

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
    setData(kmdbData.Data[0].Result[0]);
  };

  console.log(data);
  return (
    <div>
      {params.docid} MovieDetail
      <div>{data.title}</div>
    </div>
  );
};
export default MovieDetail;

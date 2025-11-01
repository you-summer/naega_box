import { useLocation } from "react-router-dom";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import noImage from "../../assets/noImage.png";

const SearchPage = () => {
  const [searchMovie, setSearchMovie] = useState();
  const location = useLocation();
  // 현재 브라우저 주소(url)의 정보를 가져옴
  const query = new URLSearchParams(location.search).get("query");
  // query에는 검색어가 들어옴

  const KMDB_API_KEY = import.meta.env.VITE_KMDB_API_KEY;
  const getMovieData = async () => {
    const kmdbUrl = `https://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2&RANK=1&listCount=30&ratedYn=Y&title=${query}&ServiceKey=${KMDB_API_KEY}`;
    const kmdbRes = await fetch(kmdbUrl);
    const data = await kmdbRes.json();
    let movieArrayData = data?.Data[0]?.Result;

    movieArrayData.forEach((item) => {
      // !HS, !HE 붙은거 ""빈 문자열로 바꿔주기
      item.title = item.title.replace(/!HS|!HE/g, "");
      // replace는 새 문자열을 반환하지만 원본에는 아무런 영향이 없어서
      // replace로 반환한 결과를 다시 item.title에 넣어줘야함
    });

    movieArrayData = movieArrayData.filter((item) => {
      return !item.genre?.includes("에로");
    });

    setSearchMovie(movieArrayData);
  };
  console.log("검색어데이터", searchMovie);
  useEffect(() => {
    getMovieData();
  }, [query]);

  // const docidList = searchMovie?.map((item) => {
  //   return item.DOCID;
  // });

  return (
    <>
      <Header type={"MOVIE"} />
      {searchMovie?.map((item) => {
        return (
          <div>
            <img src={item.posters.split("|")[0] || noImage} />
            <div>{item.title}</div>
          </div>
        );
      })}
    </>
  );
};

export default SearchPage;

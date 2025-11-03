import { useEffect, useState } from "react";
import noImage from "../../../assets/noImage.png";
import { Link, useLocation } from "react-router-dom";
import "../components/SearchList.css";

const SearchList = () => {
  const [searchMovie, setSearchMovie] = useState();
  const location = useLocation();
  // 현재 브라우저 주소(url)의 정보를 가져옴
  const query = new URLSearchParams(location.search).get("query");
  // query에는 검색어가 들어옴

  const KMDB_API_KEY = import.meta.env.VITE_KMDB_API_KEY;
  const getMovieData = async () => {
    const kmdbUrl = `https://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2&listCount=100&ratedYn=Y&title=${query}&sort=RANK,1&ServiceKey=${KMDB_API_KEY}`;
    const kmdbRes = await fetch(kmdbUrl);
    const data = await kmdbRes.json();
    let movieArrayData = data?.Data[0]?.Result;

    if (!movieArrayData) {
      setSearchMovie([]); // 없을경우 빈 배열 반환
      return;
    }
    movieArrayData.forEach((item) => {
      // !HS, !HE 붙은거 ""빈 문자열로 바꿔주기
      item.title = item.title.replace(/!HS|!HE/g, "");
      // replace는 새 문자열을 반환하지만 원본에는 아무런 영향이 없어서
      // replace로 반환한 결과를 다시 item.title에 넣어줘야함
    });

    movieArrayData = movieArrayData.filter((item) => {
      return !item.genre?.includes("에로");
      // 성인물 거르기
    });
    setSearchMovie(movieArrayData);
  };

  // console.log("검색어데이터", searchMovie);
  useEffect(() => {
    getMovieData();
  }, [query]);

  return (
    <div className="SearchList">
      <h2>
        <span>{query} </span>검색 결과
      </h2>
      <div className="searchListDiv">
        {searchMovie?.length === 0 ? (
          <div>[{query}]검색 결과 없음!</div>
        ) : (
          searchMovie?.map((item) => {
            return (
              <div>
                <Link to={`/contents/${item.DOCID}`} className="searchListLink">
                  <img
                    src={item.posters.split("|")[0] || noImage}
                    className="searchListImg"
                  />
                  <div className="searchListTitle">{item.title}</div>
                </Link>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
export default SearchList;

const KMDB_API_KEY = import.meta.env.VITE_KMDB_API_KEY;

// api 요청인자 확인
// https://www.kmdb.or.kr/info/api/apiDetail/6

// 박찬욱 감독 영화 가져오는 api
export const getdirectorMv = async () => {
  let kmdbUrl = `https://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2&ratedYn=Y&listCount=15&sort=prodYear,1&director=박찬욱&type=극영화&ServiceKey=${KMDB_API_KEY}`;
  const kmdbRes = await fetch(kmdbUrl);
  const kmdbData = await kmdbRes.json();
  const data = kmdbData.Data[0].Result;

  return data;
};

// 크리스마스 장르 영화 가져오는 api
export const getXmasMv = async () => {
  let kmdbUrl = `https://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2&ratedYn=Y&listCount=15&query=크리스마스&genre=가족&type=극영화&ServiceKey=${KMDB_API_KEY}`;
  const kmdbRes = await fetch(kmdbUrl);
  const kmdbData = await kmdbRes.json();
  const data = kmdbData.Data[0].Result;

  data.forEach((item) => {
    item.title = item.title.replace(/!HS|!HE/g, "");
  });

  //   console.log("크리므스마스", data);

  return data;
};

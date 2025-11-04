# 🍿 Naega Box
<img width="1200" height="630" alt="naegaboxThumbnail" src="https://github.com/user-attachments/assets/1a03b9d2-cc3a-42e1-be82-9cca0940b825" />

React로 만든 영화 검색, 리뷰 커뮤니티 웹입니다.
사용자는 카카오·구글 계정으로 로그인하여
영화 정보를 조회하고, 코멘트를 작성·평점·좋아요 할 수 있습니다.
Firebase로 사용자 데이터를 관리하고, 한국영상자료원 API를 통해 영화 정보를 제공합니다.

🟢 배포 사이트: [https://naega-box.vercel.app/](https://naega-box.vercel.app/)


---

## 💻 미리보기

### 메인 페이지
최신 개봉작, 박스오피스 순위, 검색 기능, 로그인 구현

### 영화 상세페이지
포스터, 평점, 사용자 코멘트 리스트

### 코멘트 작성
코멘트 작성, 별점 부여 기능

### 마이페이지
사용자 코멘트 목록, 좋아요한 코멘트, 찜한 영화, 차트를 통한 나의 별점 순위

---

## 📅 개발 기간
2025.09 ~ 2025.11

---

## 🙋‍♀️ 프로젝트 참가 인원
1인 개인 프로젝트

--
## 🎯 기획 의도
프론트엔드 프로젝트로 처음부터 끝까지 직접 구현해보고 싶어서 1인 개발을 계획하게 됐습니다.
그중에서도 영화 커뮤니티 사이트를 주제로 선택한 이유는,
영화 데이터를 기반으로 한 CRUD 기능, 소셜 로그인, 평점 등록 등
웹 서비스의 기본적인 구조와 사용자 흐름을 모두 경험할 수 있기 때문입니다.

단순히 영화 정보를 제공하는 데 그치지 않고,
사용자들이 직접 감상평을 남기고 서로 공감할 수 있는 공간을 만들고자 했습니다.
“내가 본 영화, 내가 남긴 코멘트 — 내가박스 (Naega Box)”는
그런 참여형 영화 커뮤니티의 아이디어에서 시작되었습니다.

---

## 🛠️ 사용 기술
- React (Vite 기반)
  - useState / useEffect / Context API / 커스텀 훅 활용
  - React Router (SPA 구현)
- React-hook-form
- JavaScript (ES6+)  
- CSS / SCSS  
- SweetAlert2
- Chart.js
- React Router (페이지 전환 및 SPA 구현)
- Vercel (배포)

- Firebase (회원가입 및 유저정보, 코멘트데이터, 좋아요 데이터 저장)
- Firebase Authentication (Google 로그인)
- kakao Login API (카카오 Oauth 인증)

---

## ✨ 주요 기능
- 🎥 영화 검색 및 상세 조회
- 💬 사용자 코멘트 작성 / 삭제
- ❤️ 좋아요 기능
- ⭐ 별점 등록
- 👤 구글·카카오 로그인 / 로그아웃
- 🏠 마이페이지 (내 코멘트 / 좋아요 목록 확인 / 평균 평점 표시)
- ⚙️ .env 환경 변수 관리 (API 키 보안)

---

## ⚡트러블슈팅
### ❗map 내부 비동기 처리 시 Promise 반환 문제
1. **문제 상황**
   - `map` 안에서 `async` 함수를 사용하여 각 영화의 디테일한 정보를 KMDB API로 부터 받아오려고 했으나, 콘솔에 출력된 결과가 전부 `promise {<pending>}` 으로 나타났다.

2. **원인 분석**
   - `배열.map()`은 비동기 함수를 인자로 받더라도 동기적으로 동작하고 내부의 `async` 함수는 항상 Promise 를 반환한다! 따라서 map의 반환값은 `Promise`의 배열이 되고, 이 배열자체를 `await`한다고 해도 각각의 비동기 작업이 완료되기 전이라 `pending` 상태로 남아있게 된다.

3. **해결 방법**
   - `Promise.all()`을 사용해 `map`내부의 비동기 요청들이 완료된 후에 결과를 한번에 받아올수 있도록 수정했다.
  
아래는 수정 후 정상 작동한 코드이다

```javascript
import { useEffect, useState } from "react";
import { getYesterday } from "../util/get-date.js";

const useBoxOfficeDaily = () => {
  const KOBIS_API_KEY = import.meta.env.VITE_KOBIS_API_KEY;
  const KMDB_API_KEY = import.meta.env.VITE_KMDB_API_KEY;

  const getBoxOfficeAndDetail = async () => {
    // 1. 일일 박스오피스 1~10위 데이터 요청
    let targetDt = getYesterday();
    let boxUrl = `https://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=${KOBIS_API_KEY}&targetDt=${targetDt}`;
    let boxRes = await fetch(boxUrl);
    let boxData = await boxRes.json();
    const boxOfficeRank = boxData.boxOfficeResult.dailyBoxOfficeList;

    // 2. 각 영화 제목을 기반으로 KMDB에서 상세 정보 가져오기
    const kmdbBoxOfficeDetails = boxOfficeRank.map(async (boxOffice) => {
      let movieTitle = boxOffice.movieNm;
      let apiMovieTitle = encodeURIComponent(movieTitle);
      let relDate = boxOffice.openDt.replace(/-/g, "");
      let kmdbUrl = `https://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2&detail=Y&title=${apiMovieTitle}&releaseDts=${relDate}&ServiceKey=${KMDB_API_KEY}`;
      let kmdbRes = await fetch(kmdbUrl);
      let data = await kmdbRes.json();

      // 3. 필요한 데이터만 가공
      let movieData = data.Data[0].Result[0];
      let still = movieData.stlls;
      let stillFirstImage = still.split("|")[0];
      let stillImg = stillFirstImage
        .replace("thm/01", "still")
        .replace("tn_", "")
        .replace(".jpg", "_01.jpg")
        .replace(".JPG", "_01.jpg");

      let poster = movieData.posters;
      let posterFirstImage = poster.split("|")[0];
      let DOCID = movieData.DOCID;

      return {
        ...movieData,
        title: movieTitle,
        still: stillImg,
        posters: posterFirstImage,
        DOCID: DOCID,
      };
    });

    // 4. Promise 배열을 한 번에 처리
    const movies = await Promise.all(kmdbBoxOfficeDetails);
    setMovieCdata(movies);
  };

  const [movieCdata, setMovieCdata] = useState([]);
  useEffect(() => {
    getBoxOfficeAndDetail();
  }, []);

  return { movieCdata };
};

export default useBoxOfficeDaily;
```
4. **결과**
- `Promise.all()` 사용으로 모든 비동기 요청이 병렬로 처리되어 API의 응답 속도도 개선됐다.
- 각 영화의 상세 데이터가 정상적으로 렌더링 됨
- 더 이상 `Promise{<pending>}` 가 뜨지 않음 

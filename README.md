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
<img width="1520" height="1283" alt="메인페이지" src="https://github.com/user-attachments/assets/2d2f2b24-70f8-496e-85b0-8d8e4f94535b" />


### 영화 상세페이지
포스터, 평점, 사용자 코멘트 리스트
<img width="1520" height="2115" alt="영화 상세페이지" src="https://github.com/user-attachments/assets/89272ecf-a067-41e4-9035-0a5f22157458" />


### 코멘트 작성
코멘트 작성, 별점 부여 기능
<img width="882" height="261" alt="image" src="https://github.com/user-attachments/assets/9ca2703f-a778-4cdb-91da-e5fe127a8e70" />

### 찜 기능
<img width="396" height="573" alt="image" src="https://github.com/user-attachments/assets/76ca1fd5-d312-488e-9b06-3b3ad0365bf6" />
<img width="392" height="563" alt="image" src="https://github.com/user-attachments/assets/49bd4f0e-d57b-4be3-ab15-c33a4801d132" />



### 마이페이지
사용자 코멘트 목록, 좋아요한 코멘트, 찜한 영화, 차트를 통한 나의 별점 순위
<img width="780" height="1403" alt="마이페이지" src="https://github.com/user-attachments/assets/167b1086-49aa-437c-b5c5-120ed79e1f05" />
<img width="743" height="895" alt="image" src="https://github.com/user-attachments/assets/7e679af9-937e-4a43-aaa4-531d68e9807c" />
<img width="722" height="905" alt="image" src="https://github.com/user-attachments/assets/010031c9-5b57-4843-8e6d-4efdca949f13" />

### 검색페이지
<img width="939" height="1098" alt="Naega-Box" src="https://github.com/user-attachments/assets/dc7c3ede-dcb2-4f1f-a101-87d2b12e413e" />


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

단순히 영화 정보만 제공하는 것이 아닌
사용자들이 직접 감상평을 남기고 서로 공감할 수 있는 공간을 만들고자 했습니다.

---

## 🛠️ 사용 기술
#### Frontend
- React (Vite 기반)
  - useState / useEffect / Context API / 커스텀 훅 활용
  - React Router (SPA 구현)
- JavaScript (ES6+)  
- CSS
- **라이브러리**
  - React-hook-form
  - SweetAlert2
  - Chart.js
  - Swiper
 
#### Backend & Auth
- **Firebase**
  - Authentication (Google 로그인)
  - Firestore (유저 정보, 코멘트, 좋아요 데이터)
- **Kakao Login API** (OAuth 인증)

#### Deploy
- Vercel

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
   - `배열.map()`은 콜백이 `async` 함수일 경우 **Promise 배열**을 반환한다. `map` 자체는 동기적으로 실행되어 배열을 즉시 반환하지만, 배열 안의 각 Promise는 아직 비동기 작업이 완료되지 않은 pending 상태다. 따라서 배열에 `await`를 사용해도 개별 Promise들이 resolve되지 않아 `pending` 상태로 남게 된다.

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


### ❗undefined 옵셔널 체이닝
1. **문제 상황**
   - KMDB API, KOBIS API에서 가져온 영화 데이터들은 구조가 꽤 복잡했었다. 예를들면 `data.data[0].result[0].staffs.staff` 이런 식으로 여러 중첩 객체가 있었다.

```javascript
const actors = data.staffs.staff.filter((item) => item.staffRoleGroup === "출연")
```
이런 코드가 있었을때 `data.staffs`가 undefined인 경우 바로 에러가 났었다
```javascript
TypeError: Cannot read properties of undefined (reading 'staff')
```

2. **해결 방법**
   - 이 오류의 핵심은 존재하지 않는 객체 속성에 바로 접근한 것이 문제였다
   - 그래서 `?.`옵셔널 체이닝을 추가해서 안전하게 접근했다
```javascript
const actors = data?.staffs?.staff?.filter(
  (item) => item.staffRoleGroup === "출연"
);
```
---
## 🔗 블로그 기록
- [트러블슈팅] React Hook Form + useRef 충돌 (https://blog.naver.com/jojoor201/223992801476)
- [React] 프로젝트에 Kakao 로그인 구현하기 (https://blog.naver.com/jojoor201/223987861086)
- [React] Firebase를 활용한 회원가입 기능 구현(https://blog.naver.com/jojoor201/223983242559)
- [React] react-hook-form을 이용한 회원가입 입력 폼 만들기(https://blog.naver.com/jojoor201/223983205401)


---
## 💭 느낀점
이번 프로젝트는 처음으로 혼자서 기획부터 배포까지 직접 구현해봤는데,
혼자서 처음부터 끝까지 해보며 전 과정을 직접 겪어 볼 수 있었고,
하나의 서비스를 완성하기 위해 고려해야 할 요소가 얼마나 많은지 체감할 수 있었습니다.

특히 팀 프로젝트에서는 일정에 맞추기 위해 아쉬운 부분을 넘겨야 할 때도 있었지만,
이번에는 궁금한 부분이 생기면 해결될 때까지 파고들 수 있었고, 조금 더 좋은 방법은 없는지를 끊임없이 고민해볼 수 있었습니다.
그만큼 시행착오도 많았지만, 헤맨 만큼 내 땅이다 라는 말이 있듯이 이 경험들이 저의 큰 자산이 될거라고 느낍니다

다만 컴포넌트를 어떤 기준으로 나누고 구조화해야 하는지는 여전히 어렵게 느껴졌습니다.. 처음에는 기능별로 나누다 보니 코드가 많이 복잡해지기도 하고
반대로 합치면 재사용성이 떨어지는 경우도 있어서 이 부분은 앞으로 더 많은 프로젝트를 통해서 감을 잡고 싶습니다.

또한 혼자 진행하다 보니 의견을 나눌 팀원이 없어서 판단에 확신이 서지 않을 때가 있었고, DB나 백엔드 연결과 같은 부분에서는 전문적인 조언을 얻지 못해 다소 미흡한 점도 있다고 생각합니다.
또 혼자 편한방식으로만 코드를 작성하다 보니 객관적인 코드 품질이나 협업 기준에 대한 경계심이 부족했다고 느꼈습니다.

이번 프로젝트는 firebase와 Kakao api를 이용한 로그인 기능, firebase 기반의 crud, 그리고 커스텀 훅 등을 구현하며 다양한 기술을 실제 서비스에 녹여볼 수 있었습니다.
특히 여러 API를 적극적으로 사용하면서 비동기 처리의 흐름과 어려움을 몸소 느꼈고, async/await, promise 그리고 데이터 로딩 타이밍의 중요성을 경험을 통해 깊이 이해할 수 있었습니다.

리팩토링을 하게 된다면 하고싶은건, 렌더링 성능을 최적화하고, 중복 코드 최소화 및 불필요한 리렌더링 방지에 더 집중해보고 싶습니다.

앞으로는 이러한 경험들을 바탕으로 불필요하거나 중복되는 코드를 줄이는 방법, 더 효율적인 컴포넌트 구조 설계, 다양한 사람들과 협업하는 것 등을 목표로 삼으려고 합니다

이번 프로젝트는 단순한 기능 구현뿐만 아니라 개발자로서의 사고 방식과 성장 방향을 다듬을 수 있는 소중한 경험이었던것 같습니다!



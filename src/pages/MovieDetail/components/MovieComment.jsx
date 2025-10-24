import { useContext, useRef, useState, useEffect } from "react";
import { MovieDatailStateContext } from "../MovieDetail";
import "./MovieComment.css";
import grayStar from "../../../assets/grayStar.png";
import yellowStar from "../../../assets/yellowStar.png";
import MovieCommentList from "./MovieCommentList";
import { db } from "../../../api/firebase";
import {
  doc,
  setDoc,
  getDoc,
  deleteDoc,
  updateDoc,
  getDocs,
  collection,
  query,
  where,
} from "firebase/firestore";
import { UserStateContext } from "../../../App";
import { useParams } from "react-router-dom";

const MovieComment = () => {
  // const data = useContext(MovieDatailStateContext);
  const textareaRef = useRef();
  const userState = useContext(UserStateContext);
  const params = useParams();
  const docid = params?.docid;

  const [input, setInput] = useState({
    content: "",
    score: 0,
  });
  console.log("??", input);

  // 별을 5개로 표현하기 위한 배열
  const starArray = [0, 1, 2, 3, 4];

  // 별점 기본값
  const [score, setScore] = useState([false, false, false, false, false]);

  // 코멘트리스트 넘기기
  const [commentList, setCommentList] = useState();
  const getCommentList = async (docid) => {
    const q = query(collection(db, "ratings"), where("movieId", "==", docid));

    const comment = await getDocs(q);

    // console.log("코멘트리스트뜨나?", comment.docs[0].data());
    const commentList = comment.docs
      .map((item) => {
        return {
          ...item.data(),
        };
      })
      //최신순으로 정렬
      .toSorted((a, b) => {
        return b.createdAt.toDate() - a.createdAt.toDate();
      });
    setCommentList(commentList);
    return commentList;
  };

  useEffect(() => {
    getCommentList(docid);
  }, [docid]);

  // if (!userState || !userState.user) {
  //   return <div>로딩중</div>;
  // }
  const user = userState.user;
  // console.log("유저유저!", user);

  // 별점 변경 함수
  const starScore = (index) => {
    let star = [...score];
    for (let i = 0; i < 5; i++) {
      star[i] = i <= index ? true : false;
    }
    setScore(star);

    setInput({
      ...input,
      score: index + 1,
    });
  };

  // const [content, setContent] = useState("");
  // textarea에 입력된거 저장하는 useState
  const onchangeInput = (e) => {
    console.log(e.target.value);
    let name = e.target.name;
    let value = e.target.value;

    setInput({
      ...input,
      [name]: value,
    });
  };

  const onsubmit = (input) => {
    if (input.score === 0) {
      confirm("별점을 등록해주세요!");
      return;
    }

    if (input.content === "") {
      alert("내용을 입력해주세요 !");
      return;
    }

    onSubmitInput(input);
  };

  // Firebase DB 'ratings'에 저장
  const onSubmitInput = async (input) => {
    // firsebase DB에 동일회원의 코멘트가 이미 있는지 확인
    const userDoc = await getDoc(doc(db, "ratings", `${docid}_${user.uid}`));
    if (!userDoc.exists()) {
      await setDoc(doc(db, "ratings", `${docid}_${user.uid}`), {
        comment: input.content,
        createdAt: new Date(),
        movieId: docid,
        score: input.score,
        uid: user.uid,
        displayName: user.displayName,
        userImg: user.photoURL,
      });
      alert("관람평이 등록되었습니다!");
      setInput({ content: "", score: 0 });
      setScore([false, false, false, false, false]);
      getCommentList(docid);
    } else {
      alert("해당 영화에 이미 코멘트를 작성하셨습니다!");
    }
  };

  return (
    <div className="MovieComment">
      <hr className="movieComment_hr" />
      <h3>무비코멘트</h3>
      <div className="MovieComment_input">
        <div className="movieComment_star">
          <div className="movieCommentStarText">별점을 선택해주세요.</div>
          <div className="movieCommentStarImgDiv">
            {starArray.map((index) => {
              return !user ? (
                <img
                  key={index}
                  src={score[index] ? yellowStar : grayStar}
                  className="movieCommentStarImg"
                />
              ) : (
                <img
                  key={index}
                  src={score[index] ? yellowStar : grayStar}
                  onClick={() => starScore(index)}
                  className="movieCommentStarImg"
                />
              );
            })}
            <span className="tool_tip"></span>
          </div>
        </div>
        <div className="movieComment_comment">
          {!user ? (
            <>
              <textarea
                className="movieCommentTextarea"
                placeholder="로그인 후 관람평을 등록해주세요!"
                value={input.content}
                name="content"
                onChange={onchangeInput}
                ref={textareaRef}
                disabled
              ></textarea>
              <button className="movieCommentButton">등록</button>
            </>
          ) : (
            <>
              <textarea
                className="movieCommentTextarea"
                placeholder="영화 어떠셨나요? 관람평을 입력해주세요!"
                value={input.content}
                name="content"
                onChange={onchangeInput}
                ref={textareaRef}
              ></textarea>
              <button
                className="movieCommentButton"
                onClick={() => onsubmit(input)}
              >
                등록
              </button>
            </>
          )}
        </div>
      </div>
      <hr className="movieComment_hr" />
      {commentList?.map((item) => {
        return <MovieCommentList comment={item} />;
      })}
    </div>
  );
};
export default MovieComment;

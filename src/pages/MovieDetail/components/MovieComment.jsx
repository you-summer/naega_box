import { useContext, useRef, useState } from "react";
import { MovieDatailStateContext } from "../MovieDetail";
import "./MovieComment.css";
import grayStar from "../../../assets/grayStar.png";
import yellowStar from "../../../assets/yellowStar.png";
import MovieCommentList from "./MovieCommentList";

const MovieComment = () => {
  const data = useContext(MovieDatailStateContext);
  const textareaRef = useRef();

  const [input, setInput] = useState({
    createdDate: new Date(),
    content: "",
    score: 0,
  });

  console.log("??", input);

  // 별을 5개로 표현하기 위한 배열
  const starArray = [0, 1, 2, 3, 4];

  // 별점 기본값
  const [score, setScore] = useState([false, false, false, false, false]);

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
              return (
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
          <textarea
            className="movieCommentTextarea"
            placeholder="영화 어떠셨나요? 관람평을 입력해주세요!"
            value={input.value}
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
        </div>
      </div>
      <hr className="movieComment_hr" />
      <MovieCommentList />
    </div>
  );
};
export default MovieComment;

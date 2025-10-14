import { useContext, useEffect, useState } from "react";
import "./MovieDetailZzim.css";
import heart_line from "../../../assets/heart_line.png";
import heart from "../../../assets/heart.png";
import { UserStateContext } from "../../../App";
import { showConfirmAlert } from "../../../util/get-sweet-alert";
import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../api/firebase";

const MovieDetailZzim = ({ DOCID }) => {
  const currentUser = useContext(UserStateContext);
  const user = currentUser.user;
  // console.log(user, "찜");

  const [isZzim, setZzim] = useState(false);
  // console.log(DOCID, "영화고유값");

  useEffect(() => {
    // firebase db에서 유저의 favoriteMovies[] 가져오기
    const getFavoriteMovies = async () => {
      console.log("useEffect 실행", user, DOCID);
      if (!user) {
        return;
      }

      const userRef = doc(db, "user", user.uid);
      const userDB = await getDoc(userRef);
      console.log("ref", userDB);
      if (userDB.exists()) {
        // 문서 존재여부 확인
        const mvFavList = userDB.data().favoriteMovies;
        console.log("무비영화", mvFavList);
        if (mvFavList.includes(DOCID)) {
          // 혹시 favoriteMovies[]에 DOCID가 존재한다면 -> 이미 하트를 누른 영화라면
          setZzim(true); // 빨간하트로 조정
        }
      }
    };

    getFavoriteMovies();
  }, [user, DOCID]);

  const onClickHeart = () => {
    if (!user) {
      // 미로그인시 alert띄움
      return showConfirmAlert({ text: "로그인 후 이용 가능합니다!" });
    }
    const userRef = doc(db, "user", user.uid);

    if (isZzim) {
      updateDoc(userRef, {
        favoriteMovies: arrayRemove(DOCID),
      });
      setZzim(false);
    } else {
      // 찜을 누르지 않았을경우! -> favoriteMovies배열에 DOCID추가
      updateDoc(userRef, {
        favoriteMovies: arrayUnion(DOCID),
      });
      setZzim(true);
    }
  };

  return (
    <div className="movieZzimDiv" onClick={onClickHeart}>
      <img src={isZzim ? heart : heart_line} className="zzim" />
      <span className="tool-tip">
        {isZzim ? "찜 해제하기!" : "이 영화 찜하기!"}
      </span>
    </div>
  );
};
export default MovieDetailZzim;

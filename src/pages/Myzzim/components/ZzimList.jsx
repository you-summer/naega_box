import { useContext, useEffect, useState } from "react";
import "./ZzimList.css";
import ZzimMovie from "./ZzimMovie";
import { UserStateContext } from "../../../App";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../api/firebase";
import useMovieDetail from "../../../hooks/useMovieDetail";
import { Link } from "react-router-dom";

const ZzimList = () => {
  const currentUser = useContext(UserStateContext);
  const user = currentUser.user;

  const [isMvFavList, setMvFavList] = useState([]);

  const userRef = doc(db, "user", user.uid);

  useEffect(() => {
    // firebase db에서 유저의 favoriteMovies[] 가져오기
    const getFavoriteMovies = async () => {
      console.log("useEffect 실행", user);
      if (!user) {
        return;
      }

      const userDB = await getDoc(userRef);
      console.log("ref", userDB);
      if (userDB.exists()) {
        // 문서 존재여부 확인

        const mvFavList = userDB.data().favoriteMovies;
        // console.log("찜리스트", mvFavList);

        if (mvFavList) {
          setMvFavList(mvFavList);
        }
      }
    };

    getFavoriteMovies();
  }, [user]);
  console.log("찜리스트", isMvFavList);

  //   const data = useMovieDetail({ isMvFavList });
  //   if (!data) {
  //     return <div>로딩중!!</div>;
  //   }

  return (
    <div className="ZzimList">
      <h2>내가 찜한 리스트</h2>
      <div className="zzimListDiv">
        {isMvFavList.map((item) => {
          return (
            <div>
              <Link to={`/contents/${item}`}>
                <ZzimMovie data={item} />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ZzimList;

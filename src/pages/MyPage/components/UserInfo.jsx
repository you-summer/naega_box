import { useContext, useEffect, useState } from "react";
import "./UserInfo.css";
import { UserStateContext } from "../../../App";
import default_profile_img from "../../../assets/default_profile_image.jpg";
import { Link } from "react-router-dom";
import { db } from "../../../api/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

const UserInfo = () => {
  const { user } = useContext(UserStateContext);
  console.log("UserInfo : ", user);
  let userImg = user?.photoURL;
  let uid = user?.uid;

  const [userDoc2, setUserDoc] = useState([]);
  console.log(userDoc2, "userDoc2");
  const [isUserComment, setUserComment] = useState();

  useEffect(() => {
    getUserData();
    getUserComment();
  }, [user]);

  const getUserData = async () => {
    if (!user?.uid) {
      return; // uid 없으면 그냥 나감
    }
    const userDoc = await getDoc(doc(db, "user", uid));
    const dbUserDoc = userDoc.data();
    await setUserDoc(dbUserDoc);
  };

  const getUserComment = async () => {
    //user의 uid와 db의 ratings의 uid를 비교해서 같은것만 가져오면 되는듯??

    if (!user?.uid) {
      return; // uid 없으면 그냥 나감
    }
    const q = query(collection(db, "ratings"), where("uid", "==", uid));
    const comment = await getDocs(q);
    const userComment = await comment.docs.map((item) => {
      return {
        ...item.data(),
      };
    });

    console.log("내가쓴코멘트??", userComment);
    await setUserComment(userComment);
  };

  return (
    <div className="UserInfo">
      <div className="userInfo_profile">
        <div className="user_profile_img_wrapper">
          <img
            src={userImg || default_profile_img}
            className="user_profile_img"
          />
        </div>
        <div className="userInfo_profile_info">
          <div className="userInfo_name">
            <h4>{user?.displayName || ""}</h4>
          </div>
          <div className="userInfo_email">{user?.email || ""}</div>
        </div>
      </div>
      <hr className="userInfo_hr" />
      <div className="userInfo_reviews_wrapper">
        <Link className="userInfo_reviews" to={"/mycommentlist"}>
          <div className="userInfo_reviews1">평가</div>
          <div className="userInfo_reviews2">{isUserComment?.length || 0}</div>
        </Link>

        <span className="userInfo_reviews_span">|</span>
        <Link className="userInfo_reviews" to={"/myzzim"}>
          <div className="userInfo_reviews1">찜한 영화</div>
          <div className="userInfo_reviews2">
            {userDoc2?.favoriteMovies?.length || 0}
          </div>
        </Link>
      </div>
      <hr className="userInfo_hr" />
    </div>
  );
};
export default UserInfo;

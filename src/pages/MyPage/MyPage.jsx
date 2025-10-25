import { createContext, useContext, useEffect, useState } from "react";
import Header from "../../components/Header";
import Logout from "../../components/Logout";
import Chart from "./components/Chart";
import LikedComments from "./components/LikedComments";
import UserInfo from "./components/UserInfo";
import "./MyPage.css";
import { getUserCommentList } from "../../api/firebaseDB";
import { UserStateContext } from "../../App";

export const UserCommentListStateContext = createContext();

const MyPage = () => {
  const { user } = useContext(UserStateContext);
  console.log("UserInfo : ", user);
  let uid = user?.uid;

  const [isUserComment, setUserComment] = useState([]);

  useEffect(() => {
    if (!uid) return;
    const userComment = async () => {
      const commentList = await getUserCommentList(uid);
      setUserComment(commentList);
    };
    userComment();
  }, [uid]);

  // 코멘트 삭제 후 다시 리렌더링 하는 함수
  const refreshComments = async () => {
    const upadateList = await getUserCommentList(uid);
    setUserComment(upadateList);
  };

  return (
    <div className="MyPage">
      <UserCommentListStateContext.Provider
        value={{ isUserComment, refreshComments }}
      >
        <Header type={"MYPAGE"} />
        <div className="MyPage_content_wrapper">
          <UserInfo />
          <Chart />
          <LikedComments />
          <Logout />
        </div>
      </UserCommentListStateContext.Provider>
    </div>
  );
};
export default MyPage;

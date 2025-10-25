import Header from "../../../components/Header";
import "../components/UserComment.css";
import UserCommentList from "./UserCommentList";
import { useContext, useEffect, useState } from "react";
import { UserStateContext } from "../../../App";
import { getUserCommentList } from "../../../api/firebaseDB";
import { UserCommentListStateContext } from "../MyPage";

const UserComment = () => {
  // const { isUserComment, refreshComments } = useContext(
  //   UserCommentListStateContext
  // );
  const { user } = useContext(UserStateContext);
  console.log("UserInfo : ", user);
  let uid = user?.uid;

  const [isUserComment, setUserComment] = useState([]);

  useEffect(() => {
    const userComment = async () => {
      const commentList = await getUserCommentList(uid);
      setUserComment(commentList);
    };
    userComment();
  }, [user]);

  // 코멘트 삭제 후 다시 리렌더링 하는 함수
  const refreshComments = async () => {
    const upadateList = await getUserCommentList(uid);
    setUserComment(upadateList);
  };

  return (
    <div className="UserComment">
      <div>
        <Header type={"MYPAGE"} />
      </div>
      <div className="MyPage_content_wrapper">
        <h2>내가 남긴 코멘트 확인하기!</h2>
        {isUserComment.length === 0 ? (
          <div>작성된 코멘트가 없습니다</div>
        ) : (
          <div className="userComment_wrapper">
            {isUserComment?.map((item) => {
              return (
                <UserCommentList
                  isUserComment={item}
                  refreshComments={refreshComments}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
export default UserComment;

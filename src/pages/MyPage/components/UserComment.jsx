import Header from "../../../components/Header";
import "../components/UserComment.css";
import UserCommentList from "./UserCommentList";
import { useContext, useEffect, useState } from "react";
import { UserStateContext } from "../../../App";
import {
  getLikedCommentList,
  getUserCommentList,
} from "../../../api/firebaseDB";
// import { UserCommentListStateContext } from "../MyPage";

const UserComment = ({ type }) => {
  console.log("타입은?", type);
  const { user } = useContext(UserStateContext);
  console.log("UserInfo : ", user);
  let uid = user?.uid;

  const [isUserComment, setUserComment] = useState([]);

  useEffect(() => {
    if (!uid) return;

    const userComment = async () => {
      let data;
      if (type === "liked") {
        // 클릭한 페이지가 내가 좋아요한 코멘트일 경우
        data = await getLikedCommentList(uid);
      } else {
        // 클릭한 페이지가 내 코멘트 목록일 경우
        data = await getUserCommentList(uid);
      }
      setUserComment(data);
    };
    userComment();
  }, [user, type]);

  // 코멘트 삭제 후 다시 리렌더링 하는 함수
  const refreshComments = async (removedComment) => {
    // ID가 전달되면 즉시 상태에서 제거 (좋아요 취소의 경우)
    // if (removedComment) {
    //   setUserComment((prev) =>
    //     prev.filter(
    //       (comment) =>
    //         !(
    //           comment.movieId === removedComment.movieId &&
    //           comment.uid === removedComment.uid
    //         )
    //     )
    //   );
    //   return;
    // }

    // let updateList;
    if (type === "liked") {
      // 좋아요 누른거 리렌더링 (좋아요 취소했을경우)
      // updateList = await getLikedCommentList(uid);
      setUserComment(await getLikedCommentList(uid));
    } else {
      // 코멘트 삭제 후 다시 리렌더링
      // updateList = await getUserCommentList(uid);
      setUserComment(await getUserCommentList(uid));
    }
    // setUserComment(updateList);
  };

  // // 좋아요 취소 후 다시 리렌더링 하는 함수
  // const refreshLikedComments = async () => {
  //   console.log("좋아요취소?", updateLikedList);
  //   setLikedComment(updateLikedList);
  // };

  return (
    <div className="UserComment">
      <div>
        <Header type={"MYPAGE"} />
      </div>
      <div className="MyPage_content_wrapper">
        <h2>
          {type === "my"
            ? "내가 남긴 코멘트 확인하기!"
            : "내가 좋아요한 코멘트 확인하기!"}
        </h2>
        {isUserComment.length === 0 ? (
          <div>작성된 코멘트가 없습니다</div>
        ) : (
          <div className="userComment_wrapper">
            {isUserComment?.map((item) => {
              return (
                <UserCommentList
                  key={`${item.movieId}_${item.uid}`}
                  isUserComment={item}
                  refreshComments={refreshComments}
                  // refreshLikedComments={refreshLikedComments}
                  type={type}
                  uid={uid}
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

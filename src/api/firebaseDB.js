import { db } from "./firebase";
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
  arrayRemove,
  arrayUnion,
} from "firebase/firestore";

// commentList 가져오기
export const getCommentList = async (key, value) => {
  const q = query(collection(db, "ratings"), where(key, "==", value));

  const comment = await getDocs(q);

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

  return commentList;
};

// movieCommentList 가져오기
export const getMovieCommentList = async (docid) => {
  return getCommentList("movieId", docid);
};

// myPage CommentList 가져오기
export const getUserCommentList = async (uid) => {
  return getCommentList("uid", uid);
};

//  firebase DB ratings 에 저장
export const addComment = async (docid, user, input) => {
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
      likes: [], //누가 좋아요 눌렀는지 uid저장하는 배열
    });
    alert("관람평이 등록되었습니다!");
    return true;
  } else {
    alert("해당 영화에 이미 코멘트를 작성하셨습니다!");
  }
};

// firebase DB에서 comment 삭제
export const commentDelete = async (comment) => {
  console.log("코멘트머에여?", comment);
  await deleteDoc(doc(db, "ratings", `${comment.movieId}_${comment.uid}`));
  return true;
};

// 코멘트 좋아요
export const commentLiked = async (comment, uid, isLiked) => {
  const commentRef = doc(db, "ratings", `${comment.movieId}_${comment.uid}`);
  // const user = user?.user;

  if (isLiked) {
    // 이미 좋아요를 눌렀을 경우
    updateDoc(commentRef, {
      likes: arrayRemove(uid),
    });
  } else {
    // 좋아요를 누르지 않았을 경우!
    updateDoc(commentRef, {
      likes: arrayUnion(uid),
    });
  }
};

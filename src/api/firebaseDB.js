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
} from "firebase/firestore";

// commentList 가져오기
export const getCommentList = async (docid) => {
  const q = query(collection(db, "ratings"), where("movieId", "==", docid));

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

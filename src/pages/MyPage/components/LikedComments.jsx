import { Link, useParams } from "react-router-dom";
import "./LikedComments.css";
import { getLikedCommentList } from "../../../api/firebaseDB";
import { useEffect, useState } from "react";

const LikedComments = () => {
  const params = useParams();
  const uid = params?.uid;
  // console.log(uid);
  const [likedCommentList, setLikedCommentList] = useState([]);

  useEffect(() => {
    const likedCommentList = async () => {
      const likedComment = await getLikedCommentList(uid);
      setLikedCommentList(likedComment);
    };
    likedCommentList();
  }, []);

  return (
    <div className="LikedComments">
      <div className="likedComments_title">
        <h4>좋아요</h4>
      </div>
      <hr className="likedComments_hr" />
      <div className="likedComments_content">
        <Link to={"/likedcommentlist"}>
          좋아한 코멘트 <span>{likedCommentList.length}</span>
        </Link>
      </div>
      <hr className="likedComments_hr" />
    </div>
  );
};
export default LikedComments;

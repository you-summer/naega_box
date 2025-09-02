import "./LikedComments.css";

const LikedComments = () => {
  return (
    <div className="LikedComments">
      <div className="likedComments_title">
        <h4>좋아요</h4>
      </div>
      <hr className="likedComments_hr" />
      <div className="likedComments_content">
        좋아한 코멘트 <span>0</span>
      </div>
      <hr className="likedComments_hr" />
    </div>
  );
};
export default LikedComments;

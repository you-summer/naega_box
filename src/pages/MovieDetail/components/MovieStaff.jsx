import "./MovieStaff.css";

const MovieStaff = ({ actors }) => {
  console.log("배33", actors);
  return (
    <div className="MovieStaff">
      <h3>출연 / 제작</h3>
      {actors.map((item) => {
        return (
          <div className="movieStaffName">
            <div>{item.staffNm}</div>
            <div>{item.staffRole}</div>
          </div>
        );
      })}
    </div>
  );
};

export default MovieStaff;

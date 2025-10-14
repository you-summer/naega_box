import "./MovieStaff.css";

const MovieStaff = ({ actors }) => {
  // console.log("배33", actors);
  return (
    <div className="MovieStaff">
      <h3>출연 / 제작</h3>
      <div className="movieStaffNameWrap">
        {actors.map((item) => {
          return (
            <div className="movieStaffName">
              <div className="movieName">{item.staffNm}</div>
              <div className="movieRole">
                {item.staffRole ? `${item.staffRole} 역` : ""}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MovieStaff;

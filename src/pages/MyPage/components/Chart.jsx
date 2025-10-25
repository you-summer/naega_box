import { Link } from "react-router-dom";
import "./Chart.css";
import { useContext, useEffect, useState } from "react";
import { UserCommentListStateContext } from "../MyPage";
import ChartEx from "./ChartEx";

const Chart = () => {
  const { isUserComment } = useContext(UserCommentListStateContext);

  const [scoreSum, setScoreSum] = useState(0);

  // console.log("chart", isUserComment);
  // console.log("길이", isUserComment.length);
  // console.log("웅", isUserComment[i]?.score);

  // 별점 평균
  let ave = Number(scoreSum) / Number(isUserComment.length);
  let scoreAve = ave.toFixed(1);

  useEffect(() => {
    // 별점 총 갯수
    let scoreSum = () => {
      let scoresum = 0;
      for (let i = 0; i < isUserComment.length; i++) {
        scoresum += Number(isUserComment[i]?.score);
      }
      setScoreSum(scoresum);
    };

    scoreSum();
  }, [isUserComment]);

  return (
    <div className="Chart">
      <div className="chart_title">
        <h4>별점</h4>
      </div>
      <div className="chart_chart_wrapper">
        <div>
          <ChartEx />
        </div>
      </div>
      <hr className="chart_hr" />
      <div className="chart_content_wrapper">
        <div className="chart_content">
          <div className="chart_content_title">별점 평균</div>
          <div className="chart_content_content">{scoreAve}</div>
        </div>
        <div className="chart_content">
          <div className="chart_content_title">별점 총합</div>
          <div className="chart_content_content">{scoreSum}</div>
        </div>
        {/* <Link className="chart_content">
          <div className="chart_content_title">많이 준 별점</div>
          <div className="chart_content_content">5.0</div>
        </Link> */}
      </div>
      <hr className="chart_hr" />
    </div>
  );
};
export default Chart;

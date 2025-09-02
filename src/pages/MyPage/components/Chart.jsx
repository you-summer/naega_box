import { Link } from "react-router-dom";
import "./Chart.css";

const Chart = () => {
  return (
    <div className="Chart">
      <div className="chart_title">
        <h4>별점으로 읽는 취향 지도</h4>
      </div>
      <div className="chart_chart_wrapper">
        <div>차트~~~~~</div>
      </div>
      <hr className="chart_hr" />
      <div className="chart_content_wrapper">
        <Link className="chart_content">
          <div className="chart_content_title">별점 평균</div>
          <div className="chart_content_content">3.5</div>
        </Link>
        <Link className="chart_content">
          <div className="chart_content_title">별점 개수</div>
          <div className="chart_content_content">100</div>
        </Link>
        <Link className="chart_content">
          <div className="chart_content_title">많이 준 별점</div>
          <div className="chart_content_content">5.0</div>
        </Link>
      </div>
      <hr className="chart_hr" />
    </div>
  );
};
export default Chart;

// ChartEx.jsx

import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
} from "chart.js";
import { useContext } from "react";
import { Chart } from "react-chartjs-2";
import { UserCommentListStateContext } from "../MyPage";
// import faker from "faker";

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController
);

const labels = ["1", "2", "3", "4", "5"];

// const scoreCount = [
//     {}
// ]

const ChartEx = () => {
  const { isUserComment } = useContext(UserCommentListStateContext);
  console.log(isUserComment, "여기차트ex");

  // 별점 남긴거 별점 갯수대로
  const scoreCount = labels.map((label) => {
    return isUserComment.filter((item) => {
      return Number(item.score) === Number(label);
    }).length;
  });

  const options = {
    scales: {
      y: {
        suggestedMin: 0, // 기본 최소값
        suggestedMax: 5, // 기본 최대값, 필요하면 데이터에 따라 늘어날 수 있음
        ticks: { stepSize: 1 },
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        type: "line",
        label: "",
        borderColor: "rgb(255, 99, 132)",
        borderWidth: 2,
        fill: false,
        data: scoreCount,
      },
      {
        type: "bar",
        label: "",
        backgroundColor: "rgb(75, 192, 192)",
        data: scoreCount,
        borderColor: "white",
        borderWidth: 2,
      },
    ],
  };

  return <Chart type="bar" data={data} options={options} />;
};
export default ChartEx;

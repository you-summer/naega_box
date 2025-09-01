import Header from "../../components/Header";
import Logout from "../../components/Logout";
import Chart from "./components/Chart";
import LikedComments from "./components/LikedComments";
import UserInfo from "./components/UserInfo";
import "./MyPage.css";

const MyPage = () => {
  return (
    <div className="MyPage">
      <Header type={"MYPAGE"} />
      <div className="MyPage_content_wrapper">
        <UserInfo />
        <Chart />
        <LikedComments />
        <Logout />
      </div>
    </div>
  );
};
export default MyPage;

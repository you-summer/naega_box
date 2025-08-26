import "./Header.css";
import { Link, NavLink, useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { UserStateContext } from "../App";

const navBar = [
  { id: 0, menu: "홈", url: "/" },
  { id: 1, menu: "영화", url: "/movie" },
  { id: 2, menu: "내가 찜한 리스트", url: "/myzzim" },
];

const Header = ({ type }) => {
  const [isSticky, setIsSticky] = useState(false);
  const currentUser = useContext(UserStateContext);
  console.log("헤더", currentUser);

  console.log(
    "고유값",
    currentUser?.user ? currentUser.user.uid : "로그인 안됨"
  );

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // 컴포넌트 언마운트시 이벤트 제거
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={`Header ${isSticky ? "sticky" : ""} Header_${type}`}>
      <nav className="nav">
        <div className="menu_left">
          <Link to="/">로고사진</Link>
          {navBar.map((item) => {
            return (
              <NavLink
                key={item.key}
                to={item.url}
                className={({ isActive }) => {
                  return isActive ? "active" : "";
                }}
              >
                {item.menu}
              </NavLink>
            );
          })}
        </div>

        <div className="menu_right">
          <input type="text" placeholder="검색" className="searchBar" />
          {currentUser && currentUser.user ? (
            <Link to={`/user/${currentUser.user.uid}`}>
              {currentUser.user.displayName}님
            </Link>
          ) : (
            <>
              <Link to="/login">로그인</Link>
              <Link to="/join">회원가입</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};
export default Header;

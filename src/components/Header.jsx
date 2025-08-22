import "./Header.css";
import { Link, NavLink } from "react-router-dom";

const navBar = [
  { id: 0, menu: "홈", url: "/" },
  { id: 1, menu: "영화", url: "/movie" },
  { id: 2, menu: "내가 찜한 리스트", url: "/myzzim" },
];

const Header = () => {
  return (
    <header className="Header">
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
          <Link to="/login">로그인</Link>
          <Link to="/join">회원가입</Link>
        </div>
      </nav>
    </header>
  );
};
export default Header;

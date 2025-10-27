import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import "./App.css";
import Login from "./pages/Login/Login.jsx";
import Join from "./pages/Join/Join.jsx";
import Movie from "./pages/Movie/Movie.jsx";
import Myzzim from "./pages/Myzzim/Myzzim.jsx";
import MyPage from "./pages/MyPage/MyPage.jsx";
import KakaoAuthCallback from "./pages/KakaoAuth/KakaoAuthCallback.jsx";
import KakaoAuthLogout from "./pages/KakaoAuth/KakaoAuthLogout.jsx";
import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./api/firebaseAuth.js";
import MovieDetail from "./pages/MovieDetail/MovieDetail.jsx";
import UserCommentList from "./pages/MyPage/components/UserComment.jsx";

export const UserStateContext = createContext();

function App() {
  const [user, setUser] = useState(auth.currentUser); // null 로그인안됨

  console.log("auth", auth);

  useEffect(() => {
    // 로그인 상태 변화를 실시간 감시
    // const unsubscribe =
    onAuthStateChanged(auth, (loggedInUser) => {
      // loggedInUser = 현재 로그인된 유저 객체 또는 null
      setUser(loggedInUser);
    });
    // return () => unsubscribe();
  }, []);

  return (
    <>
      <UserStateContext.Provider value={{ user, setUser }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/join" element={<Join />} />
          <Route path="/movie" element={<Movie />} />
          <Route path="/myzzim" element={<Myzzim />} />
          <Route path="/user/:uid" element={<MyPage />} />
          <Route path="/auth" element={<KakaoAuthCallback />} />
          <Route path="/auth/kakao/logout" element={<KakaoAuthLogout />} />
          <Route path="/contents/:docid" element={<MovieDetail />} />
          <Route
            path="/mycommentlist"
            element={<UserCommentList type="my" />}
          />
          <Route
            path="/likedcommentlist"
            element={<UserCommentList type="liked" />}
          />
        </Routes>
      </UserStateContext.Provider>
    </>
  );
}

export default App;

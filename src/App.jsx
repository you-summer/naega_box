import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import "./App.css";
import Login from "./pages/login";
import Join from "./pages/join";
import Movie from "./pages/movie";
import Myzzim from "./pages/Myzzim";
import MyPage from "./pages/MyPage.jsx";
import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./api/firebaseAPI.js";

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
        </Routes>
      </UserStateContext.Provider>
    </>
  );
}

export default App;

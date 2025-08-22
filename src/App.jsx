import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import "./App.css";
import Login from "./pages/login";
import Join from "./pages/join";
import Movie from "./pages/movie";
import Myzzim from "./pages/Myzzim";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/join" element={<Join />} />
        <Route path="/movie" element={<Movie />} />
        <Route path="/myzzim" element={<Myzzim />} />
      </Routes>
    </>
  );
}

export default App;

import { Routes, Route } from "react-router-dom";
import "./App.css";
import Game from "./pages/Game";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/play" element={<Game />} />
      </Routes>
    </>
  );
}

export default App;

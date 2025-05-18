import { BrowserRouter, Routes, Route } from "react-router-dom";
import InitialLoader from "../pages/welcome-page/InitialLoader";
import Playground from "../pages/play-ground";
import LevelPage from "../pages/play-ground/levels/LevelPage";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<InitialLoader />} />
        <Route path="/playground" element={<Playground />} />
        <Route path="/level/:level" element={<LevelPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;

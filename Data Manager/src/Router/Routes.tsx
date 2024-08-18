import { BrowserRouter, Route, Routes } from "react-router-dom";
import MeditationApp from "../Components/Meditation";
import App from "../App";
import SoundScapes from "../Components/SoundScapes";
import GratitudeQuestions from "../Components/GratitudeQuestions";

const MYRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/meditation" element={<MeditationApp />} />
        <Route path="/sound-scapes" element={<SoundScapes />} />
        <Route path="/gratitude-questions" element={<GratitudeQuestions />} />
        <Route path="/" element={<App />} />
      </Routes>
    </BrowserRouter>
  );
};

export default MYRouter;

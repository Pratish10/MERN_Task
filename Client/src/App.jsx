import VideoForm from "./components/VideoForm";
import VideosList from "./components/VideosList";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<VideoForm />} />;
        <Route path="/videoList" element={<VideosList />} />;
      </Routes>
    </BrowserRouter>
  );
}

export default App;

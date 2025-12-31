import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Homepage from "./pages/homepage";
import Challenges from "./pages/Challenges";

function App() {
  return (
    <BrowserRouter basename="/Ecoquest-Frontend">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/challenges" element={<Challenges />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

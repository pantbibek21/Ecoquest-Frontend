import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Homepage from "./pages/homepage";
import Challenges from "./pages/Challenges";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import Accessibility from "./pages/Accessibility";

function App() {
  return (
    <BrowserRouter basename="/Ecoquest-Frontend">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="/challenges" element={<Challenges />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/accessibility" element={<Accessibility />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

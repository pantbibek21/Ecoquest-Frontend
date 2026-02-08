import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import ScrollToTop from "./Components/ScrollToTop";

import Homepage from "./pages/Homepage";
import Challenges from "./pages/Challenges";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import Accessibility from "./pages/Accessibility";
import Contact from "./pages/Contact";
import Team from "./pages/Team";
import About from "./pages/About";
import ChallengeDetails from "./pages/ChallengeDetails";
import ScrollToHash from "./Components/ScrollToHash";
import ScrollToTopButton from "./Components/ScrollToTopButton";

function App() {
  return (
    <BrowserRouter basename="/Ecoquest-Frontend">
      <ScrollToTop />
      <ScrollToHash />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="/challenges" element={<Challenges />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/accessibility" element={<Accessibility />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/team" element={<Team />} />
        <Route path="/about" element={<About />} />
        <Route path="/challengedetails/:challengeId" element={<ChallengeDetails />} />

      </Routes>
      <ScrollToTopButton />
    </BrowserRouter>
  );
}

export default App;

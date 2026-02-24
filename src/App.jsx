import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";

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
import Auth from "./pages/Auth";
import ScrollToHash from "./Components/ScrollToHash";
import ScrollToTopButton from "./Components/ScrollToTopButton";
import { useEffect, useState } from "react";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";

function App() {
  const [challengeJSON, setChallengeJSON] = useState([]);
  const [categoryJSON, setCategoryJSON] = useState([]);
  const location = useLocation();
  const state = location.state;
  const backgroundLocation = state?.backgroundPath
    ? {
        ...location,
        pathname: state.backgroundPath.split("?")[0],
        search: state.backgroundPath.includes("?")
          ? "?" + state.backgroundPath.split("?")[1]
          : "",
        hash: "",
      }
    : null;

  // set useEffect to fetch challenge and challenge category data

  useEffect(() => {
    const fetchData = async () => {
      const challengeCategoryUrl = "http://localhost:3000/categories";
      const challengesUrl = "http://localhost:3000/challenges";

      try {
        const [categoryRes, challengesRes] = await Promise.all([
          fetch(challengeCategoryUrl),
          fetch(challengesUrl),
        ]);

        if (!categoryRes.ok || !challengesRes.ok) {
          throw new Error("Failed to fetch data");
        }

        const categoryJsonData = await categoryRes.json();
        const challengesJsonData = await challengesRes.json();

        setCategoryJSON(categoryJsonData);
        setChallengeJSON(challengesJsonData);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <ScrollToTop />
      <ScrollToHash />
      <Routes location={backgroundLocation || location}>
        <Route path="/" element={<Homepage challengeJSON={challengeJSON} />} />

        <Route
          path="/challenges"
          element={
            <Challenges
              challengeJSON={challengeJSON}
              categoryJSON={categoryJSON}
            />
          }
        />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/accessibility" element={<Accessibility />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/team" element={<Team />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<Profile />} />
        <Route
          path="/dashboard"
          element={<Dashboard challengeJSON={challengeJSON} />}
        />
        <Route
          path="/challengedetails/:challengeId"
          element={<ChallengeDetails challengeJSON={challengeJSON} />}
        />
        <Route path="/auth" element={<Auth />} />
      </Routes>
      {backgroundLocation && (
        <Routes>
          <Route path="/auth" element={<Auth />} />
        </Routes>
      )}

      <ScrollToTopButton />
    </>
  );
}

export default App;

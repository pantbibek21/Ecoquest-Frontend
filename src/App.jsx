import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";

import ScrollToTop from "./Components/ScrollToTop";

import Homepage from "./pages/homepage";
import Challenges from "./pages/Challenges";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import Accessibility from "./pages/Accessibility";
import ChallengeDetails from "./pages/ChallengeDetails";
import Auth from "./pages/Auth";
import ScrollToHash from "./Components/ScrollToHash";
import ScrollToTopButton from "./Components/ScrollToTopButton";

function App() {
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

  return (
    <>
      <ScrollToTop />
      <ScrollToHash />
      <Routes location={backgroundLocation || location}>
        <Route path="/" element={<Homepage />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="/challenges" element={<Challenges />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/accessibility" element={<Accessibility />} />
        <Route
          path="/challengedetails/:challengeId"
          element={<ChallengeDetails />}
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

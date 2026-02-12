import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./Context/AuthContext.jsx";
import { ChallengeProvider } from "./Context/ChallengeContext.jsx";

import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <ChallengeProvider>
        <BrowserRouter basename="/Ecoquest-Frontend">
          <App />
        </BrowserRouter>
      </ChallengeProvider>
    </AuthProvider>
  </StrictMode>,
);

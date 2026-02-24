import { createContext, useContext, useState, useCallback } from "react";

const ChallengeContext = createContext(null);

export function ChallengeProvider({ children }) {
  const [challengeProgress, setChallengeProgress] = useState();

  const saveChallengeProgress = (data) => {
    setChallengeProgress(data);
  };

  const refreshChallengeProgress = useCallback(
    async (userId) => {
      if (!userId) return;

      try {
        // Adjust to match your backend route if different
        const url = `http://localhost:3000/challenges/progress/${userId}`;

        const res = await fetch(url, { method: "GET" });

        if (!res.ok) {
          console.warn("refreshChallengeProgress failed:", res.status);
          return;
        }

        const data = await res.json();
        saveChallengeProgress(data);
      } catch (err) {
        console.error("refreshChallengeProgress error:", err);
      }
    },
    [saveChallengeProgress],
  );

  return (
    <ChallengeContext.Provider
      value={{
        challengeProgress,
        saveChallengeProgress,
        refreshChallengeProgress,
      }}
    >
      {children}
    </ChallengeContext.Provider>
  );
}

export function useChallenge() {
  const ctx = useContext(ChallengeContext);
  if (!ctx)
    throw new Error("useChallenge must be used inside <ChallengeProvider>");
  return ctx;
}

import { createContext, useContext, useState } from "react";

const ChallengeContext = createContext(null);

export function ChallengeProvider({ children }) {
  const [challengeProgress, setChallengeProgress] = useState();

  const saveChallengeProgress = (data) => {
    setChallengeProgress(data);
  };

  return (
    <ChallengeContext.Provider
      value={{ challengeProgress, saveChallengeProgress }}
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

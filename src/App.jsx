import { useState } from "react";
import "./App.css";
import Header from "./Components/Header";
import HeroSection from "./Components/HeroSection";
import HowItWorks from "./Components/HowItWorks";
import FeaturedChallenges from "./Components/FeaturedChallenges";
import RegistrationCard from "./Components/registrationCard";
import Testimonial from "./Components/Testimonial";

function App() {
  return (
    <>
      <div className="container">
        <Header />
        <HeroSection />
        <HowItWorks />
        <FeaturedChallenges />
        <RegistrationCard />
        <Testimonial />
      </div>
    </>
  );
}

export default App;

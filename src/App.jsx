import { useState } from "react";
import "./App.css";
import Header from "./Components/Header";
import HeroSection from "./Components/HeroSection";
import HowItWorks from "./Components/HowItWorks";
import FeaturedChallenges from "./Components/FeaturedChallenges";
import RegistrationCard from "./Components/registrationCard";
import Testimonial from "./Components/Testimonial";
import About from "./Components/About";

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
        <About />
      </div>
    </>
  );
}

export default App;

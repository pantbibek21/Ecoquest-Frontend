import About from "../Components/About";
import FeaturedChallenges from "../Components/FeaturedChallenges";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import HeroSection from "../Components/HeroSection";
import HowItWorks from "../Components/HowItWorks";
import RegistrationCard from "../Components/registrationCard";
import Testimonial from "../Components/Testimonial";

const Homepage = () => {
  return (
    <div className="container">
      <Header />
      <HeroSection />
      <HowItWorks />
      <FeaturedChallenges />
      <RegistrationCard />
      <Testimonial />
      <About />
      <Footer />
    </div>
  );
};

export default Homepage;

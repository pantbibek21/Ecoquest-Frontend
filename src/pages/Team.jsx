import Header from "../Components/Header";
import Footer from "../Components/Footer";
import "../pages/contentpages.style.css";
import SebastianTeamImg from "../Assets/SebastianTeamImg.jpg";
import NasrTeamImg from "../Assets/NasrTeamImg.jpg";
import BibekTeamImg from "../Assets/BibekTeamImg.jpg";
import SuzieTeamImg from "../Assets/SuzieTeamImg.jpg";

const Team = () => {
    return (
        <div>
            <Header />  
            <div className="spacer">
                <div className="content-container">
                    <h1>The Team behind EcoQuest</h1>
                    <p>EcoQuest is a project developed by a group of avid WebDev learners at TechLabs Münster. Passionate for environmental issues and wanting to help people make an actual impact in their every day life, we created EcoQuest to help you get on the right track.</p>
                    <p>We are a team of four people, trying our best to bring you new features, challenges and ideas.</p>

                    <div className="cardWrapper">
                        <div className="profileCard">
                            <div className="imageWrapper">
                                <img src={SebastianTeamImg} alt="" />
                            </div>
                            <p className="personDetail">Sebastian, Backend</p>
                            <p className="cardDescription">loves a deep dive into everything database related</p>
                        </div>

                        <div className="profileCard">
                            <div className="imageWrapper">
                                <img src={NasrTeamImg} alt="" />
                            </div>
                            <p className="personDetail">Nasr, Backend</p>
                            <p className="cardDescription">structured, organised and always keeps us on track</p>
                        </div>

                        <div className="profileCard">
                            <div className="imageWrapper">
                                <img src={BibekTeamImg} alt="" />
                            </div>
                            <p className="personDetail">Bibek, Frontend</p>
                            <p className="cardDescription">our react and git expert - the frontend foundation</p>
                        </div>

                        <div className="profileCard">
                            <div className="imageWrapper">
                                <img src={SuzieTeamImg} alt="" />
                            </div>
                            <p className="personDetail">Suzie, Frontend</p>
                            <p className="cardDescription">thinks about button colors, UX and accessibility</p>
                        </div>

                    </div>
            

                    <p>Interested in joining us? Just send us a message!</p>
                    <button className="contact-btn">Contact Us</button>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Team;

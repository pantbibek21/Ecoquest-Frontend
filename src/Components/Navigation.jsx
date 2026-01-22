import Burger from "./Burger.jsx";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navigation() {

      const [burgerOpen, setBurgerOpen] = useState(false);
    
      const toggleBurger = () => {
        setBurgerOpen(!burgerOpen);
      }

  return (
    <div>
        <div className="navigation">
            <h3>EcoQuest</h3>
            <ul>
                <li><Link to="/home">Home</Link></li>
                <li><Link to="/challenges">Challenges</Link></li>
                <li><a href="How it works">How it works</a></li>
            </ul>
            
            <h3>Company</h3>
            <ul>
                <li><a href="About">About</a></li>
                <li><a href="Team">Team</a></li>
                <li><a href="Contact">Contact</a></li>
            </ul>
            <h3>Legal</h3>
            <ul>
                <li><Link to="/privacy-policy">Privacy Policy</Link></li>
                <li><Link to="/terms-of-service">Terms of Service</Link></li>
                <li><Link to="/accessibility">Accessibility</Link></li>
            </ul>
        </div>

        <div className="burger" onClick={toggleBurger}>
            <Burger isOpen={burgerOpen} />
        </div>

        <style jsx>{`

            .navigation {
                display: ${burgerOpen ? 'inline' : 'none'};
                background-color: #ffffff;
                height: 100%;
                width: 300px;
                float: right;
                margin-top: 50px;
                padding: 0 46px;
                position: absolute;
                left: 0px;
                z-index: 10;            
                }

            .navigation h3 {
                margin-top: 40px;
                margin-bottom: 12px;
            }

            .navigation ul {
                list-style: none;
                padding: 0;
                margin-bottom: 30px;
        }

            .navigation li {
                margin-bottom: 8px;
            }
            
        `}</style>
    </div>
  );
}
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import "../pages/contentpages.style.css";

const Accessibility = () => {
  return (
    <div>
    <Header />
        <div className="spacer">
        <div className="content-container">
            <h1>Accessibility Statement</h1>
            <p><strong>Effective date:</strong> February 1, 2026</p>

            <p>
                EcoQuest (“we”, “our”, or “us”) is committed to making our website accessible to everyone,
                including people with disabilities. We strive to provide an inclusive digital experience.
            </p>

            <h2>1. Accessibility Standards</h2>
            <p>
                Our website aims to meet the Web Content Accessibility Guidelines (WCAG) 2.1, Level AA,
                to ensure accessibility for users with a wide range of needs.
            </p>

            <h2>2. What We Do</h2>
            <p>We have implemented the following accessibility measures:</p>
            <ul>
                <li>Clear and consistent headings and navigation</li>
                <li>High contrast text and background colors</li>
                <li>Keyboard-friendly navigation throughout the website</li>
                <li>Alt text for meaningful images and graphics</li>
                <li>Responsive design for mobile and desktop devices</li>
                <li>Readable fonts and adjustable text size via browser settings</li>
            </ul>

            <h2>3. Limitations</h2>
            <p>
                While we strive for accessibility, some third-party content or embedded tools may not fully
                meet accessibility standards. We are actively working to improve these areas.
            </p>

            <h2>4. Feedback</h2>
            <p>
                If you encounter accessibility barriers or have suggestions for improvement,
                please contact us. Your feedback helps us make EcoQuest better for everyone.
            </p>
            <p>
                <a href="mailto:support@ecoquest.de">support@ecoquest.de</a>
            </p>

            <h2>5. Compatibility</h2>
            <p>
                Our website is designed to work with modern browsers and assistive technologies,
                including screen readers and keyboard navigation tools.
            </p>

            <h2>6. Ongoing Efforts</h2>
            <p>
                We review and update our website regularly to improve accessibility and follow best practices.
            </p>

            <h2>7. Legal Notice</h2>
            <p>
                This accessibility statement reflects our commitment under the EU Web Accessibility Directive
                and general accessibility best practices.
            </p>
        </div>
        </div>
         <Footer />
    </div>
  );
};

      export default Accessibility;
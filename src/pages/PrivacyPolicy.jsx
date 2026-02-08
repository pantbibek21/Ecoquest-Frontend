import Header from "../Components/Header";
import Footer from "../Components/Footer";
import style from "../pages/contentpages.module.css";

const PrivacyPolicy = () => {
  return (
    <div>
      <Header />
      <div className={style.spacer}>
        <div className={style["content-container"]}>
          <h1>Privacy Policy</h1>
          <p>
            <strong>Effective date:</strong> February 1, 2026
          </p>

          <p>
            EcoQuest (“we”, “our”, or “us”) is a nonprofit organization based in
            Germany. We are committed to protecting your privacy and handling
            your personal data responsibly.
          </p>

          <h2>1. Who We Are</h2>
          <p>
            <strong>Organization:</strong> EcoQuest
            <br />
            <strong>Legal form:</strong> Nonprofit organization
            <br />
            <strong>Location:</strong> 48147 Münster, Germany
            <br />
            <strong>Contact email:</strong>{" "}
            <a href="mailto:support@ecoquest.de">support@ecoquest.de</a>
          </p>

          <h2>2. What Data We Collect</h2>
          <p>
            We only collect personal data that is necessary to operate our
            website and manage user accounts:
          </p>
          <ul>
            <li>Name</li>
            <li>Email address</li>
            <li>Password (stored in encrypted form)</li>
          </ul>
          <p>
            We do not collect location data, IP addresses, payment information,
            device data, or any sensitive personal data.
          </p>

          <h2>3. How We Collect Data</h2>
          <p>
            Personal data is collected only when you voluntarily provide it
            through:
          </p>
          <ul>
            <li>Account registration</li>
            <li>Contact forms</li>
          </ul>
          <p>
            We do not collect data automatically and do not receive personal
            data from third parties.
          </p>

          <h2>4. Purpose of Data Processing</h2>
          <p>
            We use your personal data solely for the purpose of account
            management and responding to your inquiries.
          </p>

          <h2>5. Cookies and Tracking</h2>
          <p>EcoQuest does not use cookies or any tracking technologies.</p>

          <h2>6. Data Sharing</h2>
          <p>
            We do not sell, rent, or share your personal data with third
            parties. Data may only be disclosed if required by law.
          </p>

          <h2>7. Data Retention</h2>
          <p>
            We retain your personal data for as long as your account exists. You
            can delete your account at any time via your profile settings.
          </p>

          <h2>8. Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Access your personal data</li>
            <li>Correct inaccurate data</li>
            <li>Request deletion of your data</li>
          </ul>
          <p>
            To exercise your rights, you can manage your account directly or
            contact us at{" "}
            <a href="mailto:support@ecoquest.de">support@ecoquest.de</a>.
          </p>

          <h2>9. Data Security</h2>
          <p>
            We use appropriate technical and organizational measures, including
            encryption and secure servers, to protect your personal data.
            However, no system can guarantee absolute security.
          </p>

          <h2>10. Children's Privacy</h2>
          <p>
            EcoQuest is not intended for children, and we do not knowingly
            collect personal data from children.
          </p>

          <h2>11. Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Any changes
            will be published on this website and may also be communicated by
            email.
          </p>

          <h2>12. Contact</h2>
          <p>
            If you have any questions about this Privacy Policy or our data
            practices, please contact us at{" "}
            <a href="mailto:support@ecoquest.de">support@ecoquest.de</a>.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;

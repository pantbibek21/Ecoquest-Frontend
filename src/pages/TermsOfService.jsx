import Header from "../Components/Header";
import Footer from "../Components/Footer";
import style from "../pages/contentpages.module.css";

const TermsOfService = () => {
  return (
    <div>
      <Header />
      <div className={style.spacer}>
        <div className={style["content-container"]}>
          <h1>Terms of Service</h1>
          <p>
            <strong>Effective date:</strong> February 1, 2026
          </p>

          <p>
            Welcome to EcoQuest (“we”, “our”, or “us”). By accessing or using
            our website (<a href="https://www.ecoquest.de">www.ecoquest.de</a>),
            you agree to these Terms of Service. Please read them carefully.
          </p>

          <h2>1. Acceptance of Terms</h2>
          <p>
            By creating an account or using our website, you agree to comply
            with these terms. If you do not agree, you may not access or use our
            services.
          </p>

          <h2>2. Eligibility</h2>
          <p>
            Our services are intended for users who are 18 years or older. By
            using EcoQuest, you confirm that you meet this age requirement.
          </p>

          <h2>3. Account Registration</h2>
          <p>
            To use certain features, you may need to create an account. You
            agree to:
          </p>
          <ul>
            <li>Provide accurate and complete information.</li>
            <li>Maintain the confidentiality of your password.</li>
            <li>
              Notify us immediately of any unauthorized use of your account.
            </li>
          </ul>

          <h2>4. Use of the Website</h2>
          <p>
            You agree to use our website for lawful purposes only. Prohibited
            activities include, but are not limited to:
          </p>
          <ul>
            <li>Attempting to hack, disrupt, or compromise the website.</li>
            <li>
              Uploading or sharing harmful, offensive, or illegal content.
            </li>
            <li>Impersonating another person or organization.</li>
          </ul>

          <h2>5. Intellectual Property</h2>
          <p>
            All content on the EcoQuest website, including text, graphics,
            logos, and software, is owned by EcoQuest or its licensors and is
            protected by copyright and other intellectual property laws. You may
            not use our content without permission.
          </p>

          <h2>6. Privacy and Data</h2>
          <p>
            Our <a href="privacy.html">Privacy Policy</a> explains how we
            collect and use your personal data. By using EcoQuest, you consent
            to our practices described there.
          </p>

          <h2>7. Third-Party Links</h2>
          <p>
            Our website may contain links to third-party websites. We are not
            responsible for the content, privacy practices, or terms of these
            external sites.
          </p>

          <h2>8. Limitation of Liability</h2>
          <p>
            EcoQuest is a nonprofit organization. While we strive to provide
            accurate information, we do not guarantee the website will be
            error-free or uninterrupted. We are not liable for any direct or
            indirect damages resulting from the use of our website.
          </p>

          <h2>9. Termination</h2>
          <p>
            We may suspend or terminate your access to the website if you
            violate these Terms of Service. You may also delete your account at
            any time via your profile settings.
          </p>

          <h2>10. Changes to Terms</h2>
          <p>
            We may update these Terms of Service from time to time. Any changes
            will be posted on this page with an updated effective date.
            Continued use of the website constitutes acceptance of the new
            terms.
          </p>

          <h2>11. Governing Law</h2>
          <p>
            These Terms of Service are governed by the laws of Germany. Any
            disputes will be resolved in the courts of Münster, Germany.
          </p>

          <h2>12. Contact Us</h2>
          <p>
            If you have questions or concerns about these Terms of Service,
            please contact us at
            <a href="mailto:support@ecoquest.de">support@ecoquest.de</a>.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TermsOfService;

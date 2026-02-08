import Header from "../Components/Header";
import Footer from "../Components/Footer";
import style from "../pages/contentpages.module.css";
import emailjs from "emailjs-com";

const Contact = () => {
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_g1vzc5e",
        "template_3bfjb9j",
        e.target,
        "public_JDgyHk2sNzrh4oQqr",
      )

      .then(() => {
        alert("Message sent successfully!");
        e.target.reset();
      })

      .catch((error) => {
        console.error(error);
        alert("Failed to send message. Please try again later.");
      });
  };

  return (
    <div>
      <Header />
      <div className="spacer">
        <div className="content-container">
          <h1>Contact Us</h1>
          <p>
            Do you have any questions, feedback or problems with EcoQuest?{" "}
            <br />
            Please reach out to us. We are here to help and are happy to hear
            from you!
          </p>

          <div className={style["contact-form"]}>
            <form>
              <div className={style.input}>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" required />
              </div>
              <div className={style.input}>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" required />
              </div>
              <div className={style.input}>
                <label htmlFor="subject">Subject:</label>
                <input type="text" id="subject" name="subject" required />
              </div>
              <div className={style.input}>
                <label htmlFor="message">Your Message:</label>
                <textarea
                  id="message"
                  name="message"
                  rows="10"
                  required
                ></textarea>
              </div>
              <button className={style["contact-btn"]} type="submit">
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;

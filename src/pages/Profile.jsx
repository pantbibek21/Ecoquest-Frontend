import { useState, useEffect } from "react";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import styles from "../pages/Profile.module.css";
import SuzieTeamImg from "../Assets/SuzieTeamImg.jpg";
import SebastianTeamImg from "../Assets/SebastianTeamImg.jpg";
import NasrTeamImg from "../Assets/NasrTeamImg.jpg";

const Profile = () => {
  const [email, setEmail] = useState("manuela.muster@gmail.com");
  const [firstName, setFirstName] = useState("Manuela");
  const [lastName, setLastName] = useState("Muster");
  const [userId, setUserId] = useState("manuela94");
  const [userImage, setUserImage] = useState(SuzieTeamImg);
  const [previewUrl, setPreviewUrl] = useState("");
  const [imgUploadMessage, setImgUploadMessage] = useState("");
  const [formSubmissonMessage, setFormSubmissionMessage] = useState("");

  useEffect(() => {
    if (!(userImage instanceof Blob)) {
      setPreviewUrl("");
      return;
    }

    const url = URL.createObjectURL(userImage);
    setPreviewUrl(url);

    return () => URL.revokeObjectURL(url);
  }, [userImage]);
  const onFileChange = (e) => {
    const file = e.target.files?.[0] ?? null;
    setUserImage(file);
    setImgUploadMessage("Image uploaded successfully!");

    e.target.value = "";
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setFormSubmissionMessage("Changed saved succesfully!");
  };

  return (
    <>
      <Header />
      <div class={styles.container}>
        <div class={styles.formWrapper}>
          <div className={styles.introContent}>
            <h2 className={styles.heading}>Profile</h2>
            <p>
              View your profile and change the personal information shown in
              your profile.
            </p>
          </div>
          <h2 className={styles.heading}>Personal Information</h2>
          <form className={styles.userProfileForm}>
            <div className={styles.formField}>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className={styles.formField}>
              <label htmlFor="firstName">First Name:</label>
              <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className={styles.formField}>
              <label htmlFor="lastName">Last name:</label>
              <input
                type="text"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className={styles.formField}>
              <label htmlFor="userId">User ID:</label>
              <input
                type="text"
                id="userId"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
              />
            </div>
            <h2 className={`${styles.heading} ${styles.profileSectionHeading}`}>
              Profile Picture
            </h2>
            <div className={styles.formField}>
              <input
                type="file"
                accept="image/*"
                id="file"
                onChange={onFileChange}
              />

              <div className={styles.profileImgWrapper}>
                {!previewUrl && <img src={userImage} alt="" />}
                {previewUrl && <img src={previewUrl} alt="preview" />}
              </div>

              <label htmlFor="file" className={styles.customControl}>
                <span className={styles.uploadBtn}>Upload Image</span>
                <span className={styles.customMessage}>{imgUploadMessage}</span>
              </label>
            </div>

            <h3 className={styles.subHeading}>Choose your EcoQuest avatar</h3>
            <form></form>

            <div className={styles.avatarSection}>
              <div
                className={styles.avatarWrapper}
                onClick={() => setUserImage(SebastianTeamImg)}
              >
                <img src={SebastianTeamImg} alt="" />
              </div>
              <div
                className={styles.avatarWrapper}
                onClick={() => setUserImage(NasrTeamImg)}
              >
                <img src={NasrTeamImg} alt="" />
              </div>
              <div
                className={styles.avatarWrapper}
                onClick={() => setUserImage(SuzieTeamImg)}
              >
                <img src={SuzieTeamImg} alt="" />
              </div>
              <div
                className={styles.avatarWrapper}
                onClick={() => setUserImage(SuzieTeamImg)}
              >
                <img src={SuzieTeamImg} alt="" />
              </div>
              <div
                className={styles.avatarWrapper}
                onClick={() => setUserImage(SuzieTeamImg)}
              >
                <img src={SuzieTeamImg} alt="" />
              </div>
              <div
                className={styles.avatarWrapper}
                onClick={() => setUserImage(SuzieTeamImg)}
              >
                <img src={SuzieTeamImg} alt="" />
              </div>
            </div>

            <div className={styles.formSubmitControl}>
              <span className={styles.formSubmissonMessage}>
                {formSubmissonMessage}
              </span>

              <button type="submit" onClick={onSubmit}>
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;

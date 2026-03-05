import { useState, useEffect } from "react";
import { useAuth } from "../Context/AuthContext";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import styles from "../pages/Profile.module.css";
import AvatarBee from "../assets/AvatarBee.png";
import AvatarButterfly from "../assets/AvatarButterfly.png";
import AvatarFish from "../assets/AvatarFish.png";
import AvatarStarfish from "../assets/AvatarStarfish.png";
import AvatarTiger from "../assets/AvatarTiger.png";

const Profile = () => {
  
  const { user } = useAuth();

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [userImage, setUserImage] = useState(AvatarBee);
  const [previewUrl, setPreviewUrl] = useState(""); 
  const [imgUploadMessage, setImgUploadMessage] = useState(""); 
  const [formSubmissonMessage, setFormSubmissionMessage] = useState("");

  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (user) {
      setEmail(user.email);
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setUserName(user.userName);
      setUserImage(user.profilePicture || AvatarBee);
    }
  }, [user]);

  useEffect(() => {
    if (!userImage) {
      setPreviewUrl("");
      return;
    }

    if (userImage instanceof File || userImage instanceof Blob) {
      const url = URL.createObjectURL(userImage);
      setPreviewUrl(url);

      return () => URL.revokeObjectURL(url);
    }

    setPreviewUrl("");
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
      <div className={styles.container}>
        {isAuthenticated && (
          <div className={styles.formWrapper}>
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
                <label htmlFor="userName">Username:</label>
                <input
                  type="text"
                  id="userName"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
              <h2
                className={`${styles.heading} ${styles.profileSectionHeading}`}
              >
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
                  <span className={styles.customMessage}>
                    {imgUploadMessage}
                  </span>
                </label>
              </div>

              <h3 className={styles.subHeading}>Choose your EcoQuest avatar</h3>

              <div className={styles.avatarSection}>
                <div
                  className={styles.avatarWrapper}
                  onClick={() => setUserImage(AvatarBee)}
                >
                  <img src={AvatarBee} alt="" />
                </div>
                <div
                  className={styles.avatarWrapper}
                  onClick={() => setUserImage(AvatarButterfly)}
                >
                  <img src={AvatarButterfly} alt="" />
                </div>
                <div
                  className={styles.avatarWrapper}
                  onClick={() => setUserImage(AvatarFish)}
                >
                  <img src={AvatarFish} alt="" />
                </div>
                <div
                  className={styles.avatarWrapper}
                  onClick={() => setUserImage(AvatarStarfish)}
                >
                  <img src={AvatarStarfish} alt="" />
                </div>
                <div
                  className={styles.avatarWrapper}
                  onClick={() => setUserImage(AvatarTiger)}
                >
                  <img src={AvatarTiger} alt="" />
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
        )}

        {!isAuthenticated && <p>You need to be logged in!</p>}
      </div>
      <Footer />
    </>
  );
};

export default Profile;

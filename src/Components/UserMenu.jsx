import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import style from "./UserMenu.module.css";
import { FaChevronDown } from "react-icons/fa";
import AvatarBee from "../Assets/AvatarBee.png";

const UserMenu = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const triggerRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const handleLogout = () => {
    logout();
    setTimeout(() => {
      navigate("/");
    }, 50); //Added a small delay, otherwise the routing wasn't working (still "/profile" for some reason)
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

    const handleMouseEnter = () => setIsOpen(true);
    const handleMouseLeave = (event) => {
        if (
        menuRef.current &&
        triggerRef.current &&
        !menuRef.current.contains(event.relatedTarget) &&
        !triggerRef.current.contains(event.relatedTarget)
        ) {
        setIsOpen(false);
        }
    };

  return (
    <div
      className={style.wrapper}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
    >
      <div className={style.trigger} ref={triggerRef} onClick={toggleMenu}>
        Welcome back, {user.firstName} <img src={AvatarBee} alt="User Profile" className={style.userImage} /> <FaChevronDown />
      </div>

      {isOpen && (
        <div className={style.menu}>
          <div
            className={style.item}
            onClick={() => {
              navigate("/profile");
              setIsOpen(false);
            }}
          >
            Profile
          </div>

          <div
            className={style.item}
            onClick={() => {
              navigate("/dashboard");
              setIsOpen(false);
            }}
          >
            Dashboard
          </div>

          <div
            className={`${style.item} ${style.logout}`}
            onClick={handleLogout}
          >
            Logout
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
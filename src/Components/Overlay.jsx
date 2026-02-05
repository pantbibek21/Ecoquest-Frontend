import style from "../Components/Overlay.module.css";

const Overlay = ({ children, onClose }) => {
  return (
    <div className={style.overlayContainer} onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()}>{children}</div>
    </div>
  );
};

export default Overlay;

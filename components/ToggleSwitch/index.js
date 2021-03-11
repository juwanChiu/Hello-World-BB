import styles from "./ToggleSwitch.module.css";

const ToggleSwitch = ({ label1, label2, value, setValue }) => {
  return (
    <dir className={styles.switchContainer}>
      <label>{label1}</label>
      <div className={styles.switch}>
        <span onClick={() => setValue(!value)} className={value ? styles.toggleOn : null} />
      </div>
      <label>{label2}</label>
    </dir>
  );
}

export default ToggleSwitch;
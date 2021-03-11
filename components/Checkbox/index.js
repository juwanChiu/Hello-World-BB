import styles from "./Checkbox.module.css";

const Checkbox = ({ children, value, setValue }) => {

  return (
    <>
      <div className={styles.checkbox}>
        <i onClick={() => setValue(!value)} className="material-icons">{value ? "check_circle_outline" : "radio_button_unchecked"}</i>
        {children}
      </div>

    </>
  );
}

export default Checkbox;
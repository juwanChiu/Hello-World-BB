import Link from "next/link";
import btnStyles from "../styles/Button.module.css";

const Button = ({ href, as, styles, children }) => {



  return (
    <Link href={href} as={as}>
      <div style={styles} className={btnStyles.btn}>
        {children}
      </div>
    </Link>
  );
}

export default Button;
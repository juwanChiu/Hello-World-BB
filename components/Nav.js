import navStyles from "../styles/Nav.module.css";
import { touchStart, touchEnd } from "../utils/touch-animation";

const Nav = (props) => {

  return (
    <nav className={navStyles.container}>
      <h2>Hello World, BB</h2>
      <div className={navStyles.menu}>
        <ul>
          <li onMouseDown={(event) => touchStart(event, 0)}
            onMouseUp={touchEnd}
            onTouchStart={(event) => touchStart(event, 0)}
            onTouchEnd={touchEnd}
            className="material-icons">list</li>
          <li onMouseDown={(event) => touchStart(event, 1)}
            onMouseUp={touchEnd}
            onTouchStart={(event) => touchStart(event, 1)}
            onTouchEnd={touchEnd}
            className="material-icons">create</li>
        </ul>
        <dir className="nav-indicator" />
      </div>
    </nav>
  );
}

export default Nav;
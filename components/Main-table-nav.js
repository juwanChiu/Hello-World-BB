import tableNav from "../styles/Nav.module.css";

const MainTableNav = ({ sDate, eDate, changeStart, changeEnd }) => {
  return (
    <div className={tableNav.tableContainer}>
      <label>由</label>
      <input type="date"
        onChange={event => changeStart(event.target.value)}
        value={sDate} />
      <label>到</label>
      <input type="date"
        onChange={event => changeEnd(event.target.value)}
        value={eDate} />
    </div>
  );
}

export default MainTableNav;
import tableStyles from "../styles/table.module.css";

const MainList = ({ date, time, feed, bathCheck, washCheck, peeCheck, poop }) => {
  const month = parseInt(date.slice(5, 7));
  const day = parseInt(date.slice(8, 10));
  const refacturyDate = month.toString() + "月" + day.toString() + "日";

  return (
    <div className={tableStyles.mainRow}>
      <div className={tableStyles.col1}>
        <p>{refacturyDate}, {time} :</p>
      </div>
      <div className={tableStyles.col2}>
        <div>
          {feed.feedCheck ?
            (<>{feed.feedMethod ?
              <p className={tableStyles.stateActive}>🍼  {feed.milkAmount}安</p>
              : <p className={tableStyles.stateActive}>🤱🏻  {feed.milkAmount}安</p>}</>)
            : (<p className={tableStyles.stateInactive}>🍼</p>)}
        </div>

        <div>
          {bathCheck ?
            (<p className={tableStyles.stateActive}>🛀🏻</p>)
            : (<p className={tableStyles.stateInactive}>🛀🏻</p>)}
        </div>

        <div>
          {washCheck ?
            (<p className={tableStyles.stateActive}>🤲🏽</p>)
            : (<p className={tableStyles.stateInactive}>🤲🏽</p>)}
        </div>

        <div>
          {peeCheck ?
            (<p className={tableStyles.stateActive}>💦</p>)
            : (<p className={tableStyles.stateInactive}>💦</p>)}
        </div>

        <div>
          {poop.poopCheck ?
            (<p className={tableStyles.stateActive}>💩</p>)
            : (<p className={tableStyles.stateInactive}>💩</p>)}
        </div>
        <div>
          {poop.poopCheck && (poop.poopQuality < 1 || poop.poopColour > 1 || poop.poopRemark != "") ? <p className={tableStyles.stateCaution}>⚠️</p> : null}
        </div>
      </div>
    </div>
  );
}

export default MainList;
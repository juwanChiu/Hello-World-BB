import { useState, useEffect } from "react";
import tableStyles from "../styles/table.module.css";
import Link from "next/link";
import { Amount, Colour, Quality } from "./Poop-condition";

const MainList = ({ detailed, date, time, feed, bathCheck, washCheck, peeCheck, poop }) => {
  const month = parseInt(date.slice(5, 7)),
    day = parseInt(date.slice(8, 10)),
    refacturyDate = month.toString() + "月" + day.toString() + "日";




  return (
    <div className={tableStyles.mainRow}>
      {detailed ? (
        <div className={tableStyles.col3}>
          <p>{time}</p>
        </div>
      ) :
        (
          <div className={tableStyles.col1}>
            <Link href="/date/[date]" as={`/date/${date}`}>
              <a className={tableStyles.linkBtn}>{refacturyDate}, {time}</a>
            </Link>
          </div>
        )}

      <div className={tableStyles.col2}>
        <div className={tableStyles.row1}>


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

          {!detailed ?
            (<div>
              {poop.poopCheck && (poop.poopQuality < 1 || poop.poopColour > 1 || poop.poopRemark != "") ? <p className={tableStyles.stateCaution}>⚠️</p> : null}
            </div>
            ) : null}

          {(detailed && poop.poopCheck) ?
            (
              <>
                <div>
                  <p className={tableStyles.normalText}>份量：<Amount value={poop.poopAmount} /></p>
                  {/* <Amount value={poop.poopAmount} /> */}
                </div>

                <div>
                  <p className={tableStyles.normalText}>質地：<Quality value={poop.poopQuality} /></p>
                </div>

                <div>
                  <p className={tableStyles.normalText}>顏色：<Colour value={poop.poopColour} /></p>
                </div>
              </>
            ) : null}
        </div>
        {(detailed && poop.poopRemark != "") ?
          (
            <div className={tableStyles.row2}>
              <p>備註：{poop.poopRemark}</p>
            </div>
          ) : null}



      </div>
    </div>

  );
}

export default MainList;
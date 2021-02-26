import React, { useState, useEffect, useMemo } from 'react';
import { touchStart, touchMove, touchEnd } from "../utils/touch-animation";
import formStyles from "../styles/form.module.css";
import dbService from "../database/dbService";
import { toDate, toTime } from "../utils/date-time";


const InputForm = ({ index, cssClass }) => {
  const [date, setDate] = useState(toDate(new Date())),
    [time, setTime] = useState(toTime(new Date())),
    [feedCheck, setFeedCheck] = useState(false),
    [feedMethod, setFeedMethod] = useState(false),
    [milkAmount, setMilkAmount] = useState(),
    [bathCheck, setBathCheck] = useState(false),
    [washCheck, setWashCheck] = useState(false),
    [peeCheck, setPeeCheck] = useState(false),
    [poopCheck, setPoopCheck] = useState(false),
    [poopAmount, setPoopAmount] = useState(1),
    [poopQuality, setPoopQuality] = useState(1),
    [poopColour, setPoopColour] = useState(0),
    [poopRemark, setPoopRemark] = useState(""),
    [submitDelay, setSubmitDelay] = useState(false);

  const feed = useMemo(() => {
    return { feedCheck, feedMethod, milkAmount }
  }, [feedCheck, feedMethod, milkAmount]);
  const poop = useMemo(() => {
    return { poopCheck, poopAmount, poopQuality, poopColour, poopRemark }
  }, [poopCheck, poopAmount, poopQuality, poopColour, poopRemark]);
  const data = useMemo(() => {
    return { date, time, feed, bathCheck, washCheck, peeCheck, poop }
  }, [date, time, feed, bathCheck, washCheck, peeCheck, poop]);

  const saveData = async () => {
    try {
      const res = await dbService.create(data);
      console.log("Successfully add data to firebase database!");
    } catch (err) {
      console.error(); (err);
    }
  };

  const resetData = () => {
    setDate(toDate(new Date()));
    setTime(toTime(new Date()));
    setFeedCheck(false);
    setFeedMethod(false);
    setMilkAmount(0);
    setBathCheck(false);
    setWashCheck(false);
    setPeeCheck(false);
    setPoopCheck(false);
    setPoopAmount(1);
    setPoopQuality(1);
    setPoopColour(0);
    setPoopRemark("");
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitDelay(true);
    saveData();
    resetData();
  }

  // useEffect(() => {
  //   console.log(data);
  // }, [data]);



  return (
    <div id={index}
      onTouchStart={(event) => touchStart(event, index)}
      onTouchEnd={touchEnd}
      onTouchMove={touchMove}
      onMouseDown={(event) => touchStart(event, index)}
      onMouseUp={touchEnd}
      onMouseLeave={touchEnd}
      onMouseMove={touchMove}
      onContextMenu={(event) => {
        event.preventDefault();
        event.stopPropagation();
        return false;
      }}
      className="slide">

      <form
      // onMouseDown={(event) => {
      //   // event.preventDefault();
      //   event.stopPropagation();
      //   return false;
      // }}
      //   onTouchStart={(event) => {
      //     event.stopPropagation();
      //     return false;
      //   }}
      >
        {submitDelay ? (
          <div className={formStyles.container} onLoad={setTimeout(() => setSubmitDelay(false), 3000)}>
            <h2>收到資料了，3秒後回主畫面</h2>
            {/* {setTimeout(() => setSubmitDelay(false), 3000)} */}
          </div>) : (
            <div className={formStyles.container}>
              <div className={formStyles.row}>
                <div className={formStyles.datetimeTitle}>
                  <label>日期／時間：</label>
                </div>
                <div className={formStyles.dateTime}>
                  <input type="date"
                    onChange={event => setDate(event.target.value)}
                    value={date} />
                  <input type="time"
                    onChange={event => setTime(event.target.value)}
                    value={time} />
                </div>
              </div>

              <div className={formStyles.row}>
                <div className={formStyles.boxGroup}>
                  <div className={formStyles.checkBox}>
                    <i onClick={() => setFeedCheck(!feedCheck)} className="material-icons">{!feedCheck ? "radio_button_unchecked" : "check_circle_outline"}</i>
                    <label>飲奶？</label>
                  </div>

                  <div className={formStyles.checkBox}>
                    <i onClick={() => setBathCheck(!bathCheck)} className="material-icons">{!bathCheck ? "radio_button_unchecked" : "check_circle_outline"}</i>
                    <label>沖涼？</label>
                  </div>
                </div>

                <div className={feedCheck ? formStyles.hideContainer : formStyles.none}>
                  <div className={formStyles.feedContainer}>

                    <dir className={formStyles.switchContainer}>
                      <label>🤱🏻 </label>
                      <div className={formStyles.switch}>
                        <span onClick={() => setFeedMethod(!feedMethod)} className={feedMethod ? formStyles.toggleOn : undefined} />
                      </div>
                      <label>🍼</label>
                    </dir>

                    <div className={formStyles.milkAmountContainer}>
                      <input type="number"
                        onChange={event => setMilkAmount(event.target.value)}
                        value={milkAmount} placeholder="安" />
                      <label>安</label>
                    </div>

                  </div>

                </div>
              </div>

              <div className={formStyles.row}>
                <div className={formStyles.boxGroup}>
                  <div className={formStyles.checkBox}>
                    <i onClick={() => setWashCheck(!washCheck)} className="material-icons">{!washCheck ? "radio_button_unchecked" : "check_circle_outline"}</i>
                    <label>洗臉？</label>
                  </div>

                  <div className={formStyles.checkBox}>
                    <i onClick={() => setPeeCheck(!peeCheck)} className="material-icons">{!peeCheck ? "radio_button_unchecked" : "check_circle_outline"}</i>
                    <label>小便？</label>
                  </div>
                </div>

              </div>

              <div className={formStyles.row}>
                <div className={formStyles.boxGroup}>
                  <div className={formStyles.checkBox}>
                    <i onClick={() => setPoopCheck(!poopCheck)} className="material-icons">{!poopCheck ? "radio_button_unchecked" : "check_circle_outline"}</i>
                    <label>大便？</label>
                  </div>
                </div>


                <div className={poopCheck ? formStyles.hideContainer : formStyles.none}>

                  <div className={formStyles.poopContainer}>
                    <div>
                      <label>份量</label>
                    </div>

                    <div onChange={event => setPoopAmount(event.target.value)}>
                      <input type="radio" name="poopSize" value={0} />
                      <label> 小 </label>

                      <input type="radio" name="poopSize" value={1} />
                      <label> 正常 </label>

                      <input type="radio" name="poopSize" value={2} />
                      <label> 多 </label>
                    </div>
                  </div>

                  <div className={formStyles.poopContainer}>
                    <div>
                      <label>質地</label>
                    </div>
                    <div onChange={event => setPoopQuality(event.target.value)}>
                      <input type="radio" name="poopQual" value={0} />
                      <label> 水 </label>

                      <input type="radio" name="poopQual" value={1} />
                      <label> 正常 </label>

                      <input type="radio" name="poopQual" value={2} />
                      <label> 硬 </label>
                    </div>
                  </div>

                  <div className={formStyles.poopContainer}>
                    <div>
                      <label>顏色</label>
                    </div>
                    <div onChange={event => setPoopColour(event.target.value)}>
                      <input type="radio" name="poopColour" value={0} />
                      <label> 黃 </label>

                      <input type="radio" name="poopColour" value={1} />
                      <label> 深啡 </label>

                      <input type="radio" name="poopColour" value={2} />
                      <label> 綠 </label>

                      <input type="radio" name="poopColour" value={3} />
                      <label> 紅 </label>
                    </div>
                  </div>

                  <div className={formStyles.poopContainer}>
                    <input onChange={event => setPoopRemark(event.target.value)} type="text" name="poopRemark" placeholder="還有甚麼" value={poopRemark} />
                  </div>

                </div>
              </div>
              <div className={formStyles.row}>
                <button onClick={handleSubmit}>送出</button>
              </div>
            </div>
          )}
      </form>

    </div>
  );
}

export default InputForm;
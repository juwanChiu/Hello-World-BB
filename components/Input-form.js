import React, { useState, useMemo } from 'react';
import formStyles from "../styles/form.module.css";
import dbService from "../database/dbService";
import { toDate, toTime } from "../utils/date-time";
import Slide from "./Slide";
import Checkbox from "./Checkbox/";
import ToggleSwitch from "./ToggleSwitch/";


const InputForm = ({ index, cssClass }) => {
  const [date, setDate] = useState(toDate(new Date())),
    [time, setTime] = useState(toTime(new Date())),
    [temperature, setTemperature] = useState(0),
    [feedCheck, setFeedCheck] = useState(false),
    [feedMethod, setFeedMethod] = useState(true),
    [milkAmount, setMilkAmount] = useState(0),
    [bathCheck, setBathCheck] = useState(false),
    [washCheck, setWashCheck] = useState(false),
    [peeCheck, setPeeCheck] = useState(false),
    [poopCheck, setPoopCheck] = useState(false),
    [poopAmount, setPoopAmount] = useState(1),
    [poopQuality, setPoopQuality] = useState(1),
    [poopColour, setPoopColour] = useState(0),
    [poopRemark, setPoopRemark] = useState(""),
    [remark, setRemark] = useState(""),
    [submitDelay, setSubmitDelay] = useState(false);

  const feed = useMemo(() => {
    return { feedCheck, feedMethod, milkAmount }
  }, [feedCheck, feedMethod, milkAmount]);
  const poop = useMemo(() => {
    return { poopCheck, poopAmount, poopQuality, poopColour, poopRemark }
  }, [poopCheck, poopAmount, poopQuality, poopColour, poopRemark]);
  const data = useMemo(() => {
    return { date, time, temperature, feed, bathCheck, washCheck, peeCheck, poop, remark }
  }, [date, time, temperature, feed, bathCheck, washCheck, peeCheck, poop, remark]);

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
    setTemperature(0);
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
    setRemark("")
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitDelay(true);
    saveData();
    resetData();
  }


  return (
    <Slide index={index}>

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
            <h2>收到資料了</h2>
            <h2>3秒後回主畫面</h2>
          </div>) : (
          <div className={formStyles.container}>

            {/* Date & Time */}
            <div className={formStyles.datetimeTitle}>
              <p>日期／時間：</p>
            </div>

            <div className={formStyles.dateTime}>
              <input className={formStyles.dateInput} type="date"
                onChange={event => setDate(event.target.value)}
                value={date} />
              <input className={formStyles.timeInput} type="time"
                onChange={event => setTime(event.target.value)}
                value={time} />
            </div>

            {/* Temperature */}
            <div className={formStyles.temperature}>
              <p>體溫 🤒</p>

              <input className={formStyles.numberInput} type="number"
                onChange={event => setTemperature(event.target.value)}
                value={temperature} placeholder="0" />
              <p>℃</p>
            </div>

            {/* Feed Check */}
            <div>
              <Checkbox value={feedCheck} setValue={setFeedCheck}>飲奶 🍼 ？</Checkbox>
            </div>

            {/* Hidden containter */}
            <div className={feedCheck ? formStyles.feedContainer : formStyles.hideContainer}>
              <dir className={formStyles.generalGrid}>
                <ToggleSwitch label1="🤱🏻" label2="🍼" value={feedMethod} setValue={setFeedMethod} />
              </dir>

              <div className={formStyles.milkAmount}>
                <input className={formStyles.numberInput} type="number"
                  onChange={event => setMilkAmount(event.target.value)}
                  value={milkAmount} placeholder="0" />
                <p>{feedMethod ? "安" : "分鐘"}</p>
              </div>
            </div>

            {/* Bath Check */}
            <Checkbox value={bathCheck} setValue={setBathCheck}>沖涼 🛀🏻 ？</Checkbox>

            {/* Face wash Check */}
            <Checkbox value={washCheck} setValue={setWashCheck}>洗臉 🤲🏽 ？</Checkbox>

            {/* Pee Check */}
            <Checkbox value={peeCheck} setValue={setPeeCheck}>小便 💦 ？</Checkbox>

            {/* Poop Check */}
            <Checkbox value={poopCheck} setValue={setPoopCheck}>大便 💩 ？</Checkbox>

            {/* Hidden containter */}
            <div className={poopCheck ? formStyles.poopContainer : formStyles.hideContainer}>


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
                <label> 其他 </label>
              </div>


              <input className={formStyles.textInput} onChange={event => setPoopRemark(event.target.value)} type="text" name="poopRemark" placeholder="還有甚麼(18字)" maxLength={18} value={poopRemark} />

            </div>

            <input className={formStyles.textInput} onChange={event => setRemark(event.target.value)} type="text" name="remark" placeholder="備註(18字)" maxLength={18} value={remark} />


            <button className={formStyles.btn} onClick={handleSubmit}>送出</button>

          </div>
        )}
      </form>

    </Slide>
  );
}

export default InputForm;
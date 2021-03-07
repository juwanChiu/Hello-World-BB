import React, { useState, useEffect } from 'react';
import tableStyles from "../styles/table.module.css";
import dbService from "../database/dbService";
import { toDate, xDateBefore } from "../utils/date-time";
import MainTableNav from "./Main-table-nav";
import List from "./Main-list";
import Slide from "./Slide";


const MainTable = ({ index }) => {
  const [dailyDatas, setDailyDatas] = useState([]),
    [startDate, setStartDate] = useState(xDateBefore(3, new Date())),
    [endDate, setEndDate] = useState(toDate(new Date()));

  const getDataFromDB = lists => {
    let datas = [];

    lists.forEach(item => {
      let key = item.key;
      let dataInDB = item.val();

      datas.push({
        key: key,
        date: dataInDB.date,
        time: dataInDB.time,
        feed: {
          feedCheck: dataInDB.feed.feedCheck,
          feedMethod: dataInDB.feed.feedMethod,
          milkAmount: dataInDB.feed.milkAmount
        },
        bathCheck: dataInDB.bathCheck,
        washCheck: dataInDB.washCheck,
        peeCheck: dataInDB.peeCheck,
        poop: {
          poopCheck: dataInDB.poop.poopCheck,
          poopAmount: dataInDB.poop.poopAmount,
          poopQuality: dataInDB.poop.poopQuality,
          poopColour: dataInDB.poop.poopColour,
          poopRemark: dataInDB.poop.poopRemark
        }
      });
    });
    setDailyDatas(datas);
  };

  const fetchDataBetweenDate = async (sDate, eDate) => {
    try {
      const res = await dbService.getByBetweenDate(sDate, eDate).on("value", getDataFromDB);
    } catch (err) {
      console.error(err);
    }
  }

  const endFetchDataBetweenDate = async (sDate, eDate) => {
    try {
      const res = await dbService.getByBetweenDate(sDate, eDate).off("value", getDataFromDB);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchDataBetweenDate(startDate, endDate);
    return () => {
      endFetchDataBetweenDate(startDate, endDate);
    };
  }, [startDate, endDate]);

  // useEffect(() => {
  //   dbService.getAll().on("value", getDataFromDB);
  //   return () => {
  //     dbService.getAll().off("value", getDataFromDB);
  //   };
  // }, []);





  useEffect(() => {
    console.log(dailyDatas);
  }, [dailyDatas])



  return (
    <Slide index={index}>
      <MainTableNav sDate={startDate} changeStart={setStartDate} eDate={endDate} changeEnd={setEndDate} />
      <div className={tableStyles.mainTableContainer}>
        <div className={tableStyles.tableFrame}>
          {dailyDatas.map((data, i) =>
            <List key={i} detailed={false} {...data} />
          )}
        </div>
      </div>
    </Slide>
  );
}


export default MainTable;
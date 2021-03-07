import { useState, useEffect } from "react";
import tableStyles from "../styles/table.module.css";
import dbService from "../database/dbService";
import Link from "next/link";
import List from "./Main-list";
import Slide from "./Slide";

const DateTable = ({ date, index }) => {
  const [dateDatas, setDateDatas] = useState([]);

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
    setDateDatas(datas);
  };

  const fetchDataByDate = async (day) => {
    try {
      const res = await dbService.getByDate(day).on("value", getDataFromDB);
    } catch (err) {
      console.error(err);
    }
  }

  const endFetchDataByDate = async (day) => {
    try {
      const res = await dbService.getByDate(day).off("value", getDataFromDB);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchDataByDate(date);
    return () => {
      endFetchDataByDate(date);
    };
  }, []);

  useEffect(() => {
    console.log(dateDatas);
  }, [dateDatas])




  return (
    <Slide index={index}>
      <Link href="/"><h3>{date}</h3></Link>
      <div className={tableStyles.mainTableContainer}>
        <div className={tableStyles.tableFrame}>
          {dateDatas.map((data, i) =>
            <List key={i} detailed {...data} />
          )}
        </div>

      </div>
      <Link href="/"><p>返回主頁</p></Link>
    </Slide>
  );
}

export default DateTable;
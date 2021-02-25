import firebase from "./firebase";

const db = firebase.ref("/lists");

const getAll = () => {
  return db;
}

const getByDate = (date) => {
  return db.orderByChild("date").equalTo(date);
}

const getByBetweenDate = (startDate, endDate) => {
  return db.orderByChild("date").startAt(startDate).endAt(endDate);
}

const create = (data) => {
  return db.push(data);
}

const update = (key, data) => {
  return db.child(key).update(data);
}

const remove = (key) => {
  return db.child(key).remove();
}

const removeAll = () => {
  return db.remove();
}

export default {
  getAll,
  getByDate,
  getByBetweenDate,
  create,
  update,
  remove,
  removeAll
};
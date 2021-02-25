export const toDate = today => {
  const ten = i => (i < 10 ? "0" : "") + i,
    YYYY = today.getFullYear(),
    MM = ten(today.getMonth() + 1),
    DD = ten(today.getDate());

  return YYYY + "-" + MM + "-" + DD;
};

export const toTime = today => {
  const ten = i => (i < 10 ? "0" : "") + i,
    hh = ten(today.getHours()),
    mm = ten(today.getMinutes());

  return hh + ":" + mm;
};

export const xDateBefore = (x, today) => {
  const dateBefore = new Date(today.getTime() - (x * 24 * 60 * 60 * 1000)),
    ten = i => (i < 10 ? "0" : "") + i,
    YYYY = dateBefore.getFullYear(),
    MM = ten(dateBefore.getMonth() + 1),
    DD = ten(dateBefore.getDate());

  return YYYY + "-" + MM + "-" + DD;
}


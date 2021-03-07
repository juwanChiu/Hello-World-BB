export const Amount = ({ value }) => {
  switch (value * 1) {
    case 0:
      return "小";
    case 1:
      return "正常";
    case 2:
      return "多";
    default:
      return null;
  };
}

export const Colour = ({ value }) => {
  switch (value * 1) {
    case 0:
      return "黃";
    case 1:
      return "深啡";
    case 2:
      return "綠";
    case 3:
      return "紅";
    default:
      return null;
  };
}

export const Quality = ({ value }) => {
  switch (value * 1) {
    case 0:
      return "水";
    case 1:
      return "正常";
    case 2:
      return "硬";
    default:
      return null;
  };
}
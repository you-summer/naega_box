//api에서 쓰이는 날짜 포맷 리턴해주는 함수

export const formatDate = (date) => {
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();

  if (month < 10) {
    month = `0${month}`;
  }
  if (day < 10) {
    day = `0${day}`;
  }

  return `${year}${month}${day}`;
};

export const getYesterday = () => {
  // 어제 날짜 (오늘날짜보다 하루 앞)
  const today = new Date();
  today.setDate(today.getDate() - 1);
  return formatDate(today);
};

export const getTomorrowAndOneMonthLater = () => {
  const today = new Date();

  // 내일 날짜
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  // 내일 +1달뒤
  const oneMonthLater = new Date(tomorrow);
  oneMonthLater.setMonth(tomorrow.getMonth() + 1);

  return {
    tomorrow: formatDate(tomorrow),
    oneMonthLater: formatDate(oneMonthLater),
  };
};

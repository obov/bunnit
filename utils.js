export const cycler = (cycle) => (number) => {
  return ((number % cycle) + cycle) % cycle;
};

export const MsToSec = 1000;
export const SecToMin = 60;
export const MinToHour = 60;
export const HourToDay = 24;
export const MsToDay = MsToSec * SecToMin * MinToHour * HourToDay;

export const removeTimes = (date) => {
  const copy = new Date(date);
  copy.setHours(0, 0, 0, 0);
  return copy;
};
export const changeDate = (date) => (step) => {
  const copy = new Date(date);
  copy.setDate(copy.getDate() + step);
  return copy;
};
export const changeMonth = (date) => (step) => {
  const copy = new Date(date);
  copy.setMonth(copy.getMonth() + step);
  return copy;
};
export const getFirstDate = (date) => {
  const copy = new Date(date);
  copy.setDate(1);
  return copy;
};
export const getLastDate = (date) => {
  const copy = new Date(date);
  copy.setMonth(copy.getMonth() + 1);
  copy.setDate(0);
  return copy;
};
export const getNextSatur = (date) => {
  const copy = new Date(date);
  copy.setDate(copy.getDate() + 6 - copy.getDay());
  return copy;
};
export const getPrevSun = (date) => {
  const copy = new Date(date);
  copy.setDate(copy.getDate() - copy.getDay());
  return copy;
};
export const isSameDate = (date1, date2) => {
  if (date1.getYear() !== date2.getYear()) return false;
  if (date1.getDate() !== date2.getDate()) return false;
  if (date1.getMonth() !== date2.getMonth()) return false;
  return true;
};
export const isSameMonth = (date1, date2) => {
  if (date1.getYear() !== date2.getYear()) return false;
  if (date1.getMonth() !== date2.getMonth()) return false;
  return true;
};
export const getDateDiff = (date1, date2) => {
  const onlyDate1 = removeTimes(date1);
  const onlyDate2 = removeTimes(date2);
  return Math.abs((onlyDate1.getTime() - onlyDate2.getTime()) / MsToDay);
};
export const getDaysBetween = (date1, date2) => {
  if (isSameDate(date1, date2)) return [];
  const diff = getDateDiff(date1, date2);
  const changeD1 = changeDate(date1);
  let result = [];
  for (let i = 1; i < diff; i++) {
    result.push(changeD1(i));
  }
  return result;
};
export const getDaysRange = (date1, date2, include = [true, true]) => {
  const [isInclude1, isInclude2] = include;
  if (isInclude1 && isInclude2)
    return [date1, ...getDaysBetween(date1, date2), date2];
  if (isInclude1) return [date1, ...getDaysBetween(date1, date2)];
  if (isInclude2) return [...getDaysBetween(date1, date2), date2];
  return getDaysBetween(date1, date2);
};

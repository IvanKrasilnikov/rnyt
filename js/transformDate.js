export function transformDate(date, locale) {
  let curDate = new Date(Date.parse(date.substr(0, 10)));
  let monthArr;

  switch (locale) {
    case 'ru': {
      monthArr = [
        'января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля',
        'августа', 'сентября', 'октября', 'ноября', 'декабря'
      ]
      break;
    }
    case 'en': {
      monthArr = [
        'january', 'february', 'march', 'april', 'may', 'june', 'july',
        'august', 'september', 'october', 'november', 'december'
      ]
      break;
    }
  }

  return `${curDate.getDate()} ${monthArr[curDate.getMonth()]}`;
}

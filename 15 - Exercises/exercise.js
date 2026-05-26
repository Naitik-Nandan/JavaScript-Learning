import days from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import isSatSun from './isWeekend.js';

const today = days();
console.log(today.add(5, 'days').format('MMMM, dddd'));
console.log(today.add(1, 'month').format('MMMM, dddd'));
console.log(today.subtract(1, 'month').format('MMMM, dddd'));
console.log(today.format('dddd'));

console.log(isSatSun(today.subtract(2, 'day')));

import { money } from "../../scripts/utils/money.js";

console.log('test suite: money')
console.log('converts paise into rupees')
//Basic Test

if ((money(2095)) === '20.95')
    console.log('passed');
else
    console.log('failed');


//Edge Cases

console.log('works with 0');

if ((money(0)) === '0.00')
    console.log('passed');
else
    console.log('failed');

console.log('rounds up to the nearest paise')

if ((money(2000.5)) === '20.01')
    console.log('passed');
else
    console.log('failed');
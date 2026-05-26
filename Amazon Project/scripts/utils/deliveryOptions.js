import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js'
import isWeekend from '../utils/isWeekend.js'

export const deliveryOptions = [{
    id: '1',
    deliveryDays: 7,
    priceCents: 0
},
{
    id: '2',
    deliveryDays: 3,
    priceCents: 499
},
{
    id: '3',
    deliveryDays: 1,
    priceCents: 999
},
];

export function calculateDeliveryDate(deliveryOption) {
    const today = dayjs();
    let deliveryDate;
    let i = 0, weekEnds = 0;
    while (i < deliveryOption.deliveryDays) {
        i++;
        if(isWeekend(today.add(i,'day'))){
            weekEnds++;
        }
    }
    deliveryDate = today.add((deliveryOption.deliveryDays+weekEnds), 'day');
    const dateString = deliveryDate.format('dddd, MMMM D');
    return dateString;
}
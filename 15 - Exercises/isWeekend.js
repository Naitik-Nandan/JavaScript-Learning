export default function isWeekend(date) {
    const day = date.format('dddd');
    if(day === 'Saturday' || day === 'Sunday')
        return true;
    else
        return false;
}
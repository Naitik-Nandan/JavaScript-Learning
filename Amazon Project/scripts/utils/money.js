export function money (priceCents) {
    priceCents = (Number)(priceCents);
    return (Math.round(priceCents) /100).toFixed(2);
}
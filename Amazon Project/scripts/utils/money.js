export function money (priceCents) {
    priceCents = (Number)(priceCents);
    return (priceCents/100).toFixed(2);
}
import { money } from "../../scripts/utils/money.js";

describe('test suite: money', () => {
    it('converts paise into rupees', () => {
        expect(money(2095)).toEqual('20.95');
    });

    it('works with 0' , () => {
        expect(money(0)).toEqual('0.00');
    });

    it('rounds of to the nearest paise' , () => {
        expect(money(2000.5)).toEqual('20.01');
    });
})
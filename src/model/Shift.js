export default class Shift {
    constructor(timing, jPayout = 0, sPayout = 0, mPayout = 0, pPayout = 0) {
        this.timing = timing;
        this.payout = {
            junior: jPayout,
            senior: sPayout,
            master: mPayout,
            principle: pPayout
        };
    }
}
import Shift from "../model/Shift";

export const shift = {
    shift1: new Shift("6AM - 2PM", 3000, 3000, 5000, 5000),
    shift2: new Shift("9AM - 5PM"),
    shift3: new Shift("2PM - 10PM"),
    shift4: new Shift("6PM - 2AM", 4000, 4000, 7000, 7000)
}

export const perActiveClientsPayout = {
    junior: function (npsSlab) {
        return npsCalculator(npsSlab, 80, 120, 130, 140, 150, 160)
    },
    senior: function (npsSlab) {
        return npsCalculator(npsSlab, 85, 130, 140, 150, 160, 170)
    },
    master: function (npsSlab) {
        return npsCalculator(npsSlab, 95, 150, 160, 170, 180, 190)
    },
    principle: function (npsSlab) {
        return npsCalculator(npsSlab, 105, 160, 170, 180, 190, 200)
    }
}

function npsCalculator(npsSlab, lt30, bt30_40, bt40_50, bt50_60, bt60_70, gt70) {
    switch (true) {
        case npsSlab <= 30: {
            return lt30
        }
        case npsSlab > 30 && npsSlab <= 40: {
            return bt30_40
        }
        case npsSlab > 40 && npsSlab <= 50 : {
            return bt40_50
        }
        case npsSlab > 50 && npsSlab <= 60: {
            return bt50_60
        }
        case npsSlab > 60 && npsSlab <= 70: {
            return bt60_70
        }
        case npsSlab > 70: {
            return gt70
        }
        default: {
            console.log(npsSlab, typeof npsSlab)
        }
    }
}
// src/utils/payPeriod.js

const PAY_PERIOD_LENGTH = 14;
const PAY_PERIOD_START_DAY = 4; // Thursday (Sun = 0)

export function getCurrentPayPeriod(referenceDate = new Date()) {

    const start = getPayPeriodStart(referenceDate);

    const end = new Date(start);

    end.setDate(start.getDate() + PAY_PERIOD_LENGTH - 1);

    return {
        start,
        end
    };

}

export function getPreviousPayPeriod(referenceDate = new Date()) {

    const current = getCurrentPayPeriod(referenceDate);

    const start = new Date(current.start);

    start.setDate(start.getDate() - PAY_PERIOD_LENGTH);

    const end = new Date(start);

    end.setDate(start.getDate() + PAY_PERIOD_LENGTH - 1);

    return {
        start,
        end
    };

}

export function getNextPayPeriod(referenceDate = new Date()) {

    const current = getCurrentPayPeriod(referenceDate);

    const start = new Date(current.start);

    start.setDate(start.getDate() + PAY_PERIOD_LENGTH);

    const end = new Date(start);

    end.setDate(start.getDate() + PAY_PERIOD_LENGTH - 1);

    return {
        start,
        end
    };

}

export function getPayPeriodStart(referenceDate = new Date()) {

    const date = new Date(referenceDate);

    date.setHours(0, 0, 0, 0);

    while (date.getDay() !== PAY_PERIOD_START_DAY) {

        date.setDate(date.getDate() - 1);

    }

    return date;

}

export function getDatesInPayPeriod(startDate) {

    const dates = [];

    for (let i = 0; i < PAY_PERIOD_LENGTH; i++) {

        const date = new Date(startDate);

        date.setDate(startDate.getDate() + i);

        dates.push(date);

    }

    return dates;

}

export function formatDateKey(date) {

    return date.toISOString().substring(0, 10);

}

export function formatPayPeriodLabel(start, end) {

    return `${start.toLocaleDateString()} - ${end.toLocaleDateString()}`;

}
import { isNumber } from './util';

const isValidWidthUnit = (val) => {
    if (isNumber(val)) {
        return true;
    }
    else {
        return ['px', 'rem', 'em', 'vw', '%', 'vmin', 'vmax'].some(unit => val.endsWith(unit));
    }
};
const isValidComponentSize = (val) => ['', 'large', 'medium', 'small', 'mini'].includes(val);
const isValidDatePickType = (val) => [
    'year',
    'month',
    'date',
    'dates',
    'week',
    'datetime',
    'datetimerange',
    'daterange',
    'monthrange',
].includes(val);

export { isValidComponentSize, isValidDatePickType, isValidWidthUnit };

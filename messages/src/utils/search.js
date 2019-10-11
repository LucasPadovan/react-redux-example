import {isObject} from 'lodash';

export const getDateQuery = (dates) => {
    let queryParams;

    if (isObject(dates) && dates.startDate && dates.endDate) {
        queryParams = `?start_date=${dates.startDate}&page=1&end_date=${dates.endDate}`;

        return queryParams;
    }

    return '';
};

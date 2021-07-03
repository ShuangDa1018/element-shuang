import request from '../utils/request';

export const fetchData = (dataUrl, searchValue) => {
    return request({
        url: dataUrl || './table.json',
        method: 'get',
        params: searchValue
    });
};
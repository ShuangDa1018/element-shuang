import request from '../utils/request';

export const fetchData = (searchValue,dataUrl) => {
    return request({
        url: dataUrl||'./table.json',
        method: 'get',
        params: searchValue
    });
};

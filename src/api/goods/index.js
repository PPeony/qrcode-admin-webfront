import {server} from "../config";

export const allGoods = params => {
    return server({
        method: 'get',
        url: '/goods/allGoods',
        params
    });
};
export const goodsType = () => {
    return server({
        method: 'get',
        url: '/goods/goodsType',
    });
};

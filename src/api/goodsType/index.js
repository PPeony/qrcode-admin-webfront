import { server} from '../config';
export const add = data => {
    return server({
        method: 'post',
        url: '/goodsType/add',
        data
    });
};
export const deleteGoodsType = params => {
    return server({
        method: 'delete',
        url: '/goodsType/delete',
        params
    });
};


export const all = params => {
    return server({
        method: 'get',
        url: '/goodsType/all',
        params
    });
};

import { server} from './config';
export const login = data => {
    return server({
        method: 'post',
        url: '/admin/login',
        data
    });
};

export const allGoods = data => {
    return server({
        method: 'get',
        url: '/goods/allGoods',
        data
    });
};

export const goodsType = data => {
    return server({
        method: 'get',
        url: '/goods/goodsType',
        data
    });
};


export const goods = () => {
    return server({
        method: 'get',
        url: '/admin/goods',

    });
};
export const getPromotionGoods = () => {
    return server({
        method:'get',
        url:'/goods/getPromotionGoods'
    })
}

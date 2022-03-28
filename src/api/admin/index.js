import { server} from '../config';
export const login = data => {
    return server({
        method: 'post',
        url: '/admin/login',
        data
    });
};
export const updatePassword = data => {
    return server({
        method: 'put',
        url: '/admin/updatePassword',
        data
    });
};
export const logout = () => {
    return server({
        method: 'get',
        url: '/admin/logout',
    });
};

export const goods = params => {
    return server({
        method: 'get',
        url: '/admin/goods',
        params
    });
};
export const addGoods = data => {
    return server({
        method: 'post',
        url: '/admin/addGoods',
        data,
        headers: {
            'Content-Type': 'multipart/form-data'
        },
    });
};
export const updateGoods = data => {
    return server({
        method: 'put',
        url: '/admin/updateGoods',
        data,
        headers: {
            'Content-Type': 'multipart/form-data'
        },
    });
};

export const deleteGoods = params => {
    return server({
        method: 'delete',
        url: '/admin/deleteGoods',
        params
    });
};

export const addGoodsType = data => {
    return server({
        method: 'post',
        url: '/admin/addGoodsType',
        data
    });
};

export const deleteGoodsType = params => {
    return server({
        method: 'delete',
        url: '/admin/deleteGoodsType',
        params
    });
};
export const notice = params => {
    return server({
        method: 'get',
        url: '/admin/notice',
        params
    });
};

export const addNotice = data => {
    return server({
        method: 'post',
        url: '/admin/addNotice',
        data
    });
};

export const updateNotice = params => {
    return server({
        method: 'put',
        url: '/admin/updateNotice',
        params
    });
};
export const deleteNotice = params => {
    return server({
        method: 'delete',
        url: '/admin/deleteNotice',
        params
    });
};
export const QRCode = params => {
    return server({
        method: 'get',
        url: '/admin/QRCode',
        params
    });
};

export const addQRCode = params => {
    return server({
        method: 'post',
        url: '/admin/addNotice',
        params
    });
};

export const updateQRCode = params => {
    return server({
        method: 'put',
        url: '/admin/updateQRCode',
        params
    });
};
export const deleteQRCode = params => {
    return server({
        method: 'delete',
        url: '/admin/deleteQRCode',
        params
    });
};
export const user = params => {
    return server({
        method: 'get',
        url: '/admin/user',
        params
    });
};

export const addUser = data => {
    return server({
        method: 'post',
        url: '/admin/addUser',
        data
    });
};
export const updateUser = data => {
    return server({
        method: 'put',
        url: '/admin/updateUser',
        data
    });
};

export const deleteUser = params => {
    return server({
        method: 'delete',
        url: '/admin/user',
        params
    });
};

export const userBill = params => {
    return server({
        method: 'get',
        url: '/admin/userBill',
        params
    });
};
export const outputMoney = params => {
    return server({
        method: 'put',
        url: '/admin/outputMoney',
        params
    });
};

export const sales = params => {
    return server({
        method: 'get',
        url: '/admin/sales',
        params
    });
};
export const weeklySales = params => {
    return server({
        method: 'get',
        url: '/admin/weeklySales',
        params
    });
};
export const createGoodsPromotion = data => {
    return server({
        method: 'post',
        url: '/admin/goodsPromotion',
        data
    });
};
export const stopPromotion = params => {
    return server({
        method: 'delete',
        url: '/admin/stopPromotion',
        params
    });
};



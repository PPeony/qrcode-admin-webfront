import {server} from "../config";

export const saectAllOrderForms = (params) => {
    return server({
        method: 'get',
        url: '/orderForm/allOrderForms',
        params
    });
};

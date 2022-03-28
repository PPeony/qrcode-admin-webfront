<template>

    <a-layout style="background: white">

        <a-layout-content>
            <a-tabs style="width: 100%" default-active-key="1">

                <a-tab-pane tab="未付款" key="1">
                    <split-table :headData="headData" :bodyData="orderForms"
                                 :operFlag="false" :tableEditFlag="false" :checkFlag="false">
                    </split-table>

                    <a-pagination
                            :total="total1"
                            page-size.sync="9"
                            @change="currentChange1"
                            style="float: right;margin-top: 10px">
                    </a-pagination>
                </a-tab-pane>
                <a-tab-pane tab="已付款" key="2">
                    <split-table :headData="headData" :bodyData="orderForms1" :checkFlag="false"
                                 :operFlag="false" :tableEditFlag="false">
                    </split-table>
                    <a-pagination

                            :total="total1"
                            page-size.sync="9"
                            @change="currentChange2"
                            style="float: right;margin-top: 10px">
                    </a-pagination>
                </a-tab-pane>
            </a-tabs>

        </a-layout-content>
    </a-layout>

</template>

<script>

    import {saectAllOrderForms} from '../api/orderForm'
    import SplitTable from 'vue-split-table';

    export default {
        name: "PersonOrderForm",
        components: {SplitTable},
        data() {
            return {
                headData: ["订单id","订单号", "订单发起时间", "商品名称", "商品单价", "二维码数量", "商品类别", "订单总价"],
                orderForms: [],
                orderForms1: [],
                total1: 0,
                total2: 0
            }
        },
        created() {
            this.fetchData();
        },
        methods: {

            currentChange1(pageNum) {
                this.total1 = 0;
                saectAllOrderForms({
                    pageNum: pageNum
                }).then(res => {

                    for (let i = 0; i < res.data.data.list.length; i++) {

                        let item = res.data.data.list[i];
                        let orderForm = item.orderForm;
                        let details = item.details;
                        let goodsNames = [];
                        let goodsPrices = [];
                        let goodsQrcodeQuantitys = [];
                        let goodsTypeNames = [];
                        if (orderForm.orderFormStatus === 0) {
                            this.total1++;
                            for (let j = 0; j < details.length; j++) {
                                goodsNames.push(details[j].goodsName);
                                goodsPrices.push(details[j].goodsPrice);
                                goodsQrcodeQuantitys.push(details[j].goodsQrcodeQuantity);
                                goodsTypeNames.push(details[j].goodsTypeName);
                            }
                            this.orderForms.push(
                                {
                                    orderFormId: orderForm.orderFormId,
                                    orderFormNumber: orderForm.orderFormNumber,
                                    gmtCreated: orderForm.gmtCreated,
                                    goodsNames: goodsNames,
                                    goodsPrices: goodsPrices,
                                    goodsQrcodeQuantitys: goodsQrcodeQuantitys,
                                    goodsTypeNames: goodsTypeNames,
                                    orderFormPrice: orderForm.orderFormPrice,
                                }
                            );
                        }
                    }
                });
            },


            currentChange2(pageNum) {
                this.total2 = 0;
                saectAllOrderForms({
                    pageNum: pageNum
                }).then(res => {

                    for (let i = 0; i < res.data.data.list.length; i++) {

                        let item = res.data.data.list[i];
                        let orderForm = item.orderForm;
                        let details = item.details;
                        let goodsNames = [];
                        let goodsPrices = [];
                        let goodsQrcodeQuantitys = [];
                        let goodsTypeNames = [];
                        if (orderForm.orderFormStatus === 1) {
                            this.total2++;
                            for (let j = 0; j < details.length; j++) {
                                goodsNames.push(details[j].goodsName);
                                goodsPrices.push(details[j].goodsPrice);
                                goodsQrcodeQuantitys.push(details[j].goodsQrcodeQuantity);
                                goodsTypeNames.push(details[j].goodsTypeName);
                            }
                            this.orderForms.push(
                                {
                                    orderFormId: orderForm.orderFormId,
                                    orderFormNumber: orderForm.orderFormNumber,
                                    gmtCreated: orderForm.gmtCreated,
                                    goodsNames: goodsNames,
                                    goodsPrices: goodsPrices,
                                    goodsQrcodeQuantitys: goodsQrcodeQuantitys,
                                    goodsTypeNames: goodsTypeNames,
                                    orderFormPrice: orderForm.orderFormPrice,
                                }
                            );
                        }
                    }
                });
            },


            fetchData() {
                saectAllOrderForms().then(res => {

                    for (let i = 0; i < res.data.data.list.length; i++) {

                        let item = res.data.data.list[i];
                        let orderForm = item.orderForm;
                        let details = item.details;
                        let goodsNames = [];
                        let goodsPrices = [];
                        let goodsQrcodeQuantitys = [];
                        let goodsTypeNames = [];
                        if (orderForm.orderFormStatus === 0) {
                            this.total1++;
                            for (let j = 0; j < details.length; j++) {
                                goodsNames.push(details[j].goodsName);
                                goodsPrices.push(details[j].goodsPrice);
                                goodsQrcodeQuantitys.push(details[j].goodsQrcodeQuantity);
                                goodsTypeNames.push(details[j].goodsTypeName);
                            }
                            this.orderForms.push(
                                {
                                    orderFormId: orderForm.orderFormId,
                                    orderFormNumber: orderForm.orderFormNumber,
                                    gmtCreated: orderForm.gmtCreated,
                                    goodsNames: goodsNames,
                                    goodsPrices: goodsPrices,
                                    goodsQrcodeQuantitys: goodsQrcodeQuantitys,
                                    goodsTypeNames: goodsTypeNames,
                                    orderFormPrice: orderForm.orderFormPrice,
                                }
                            );
                        }else {
                            this.total2++;
                            goodsNames = [];
                            goodsPrices = [];
                            goodsQrcodeQuantitys = [];
                            goodsTypeNames = [];
                            for (let j = 0; j < details.length; j++) {
                                goodsNames.push(details[j].goodsName);
                                goodsPrices.push(details[j].goodsPrice);
                                goodsQrcodeQuantitys.push(details[j].goodsQrcodeQuantity);
                                goodsTypeNames.push(details[j].goodsTypeName);
                            }
                            this.orderForms1.push(
                                {
                                    orderFormId: orderForm.orderFormId,
                                    orderFormNumber: orderForm.orderFormNumber,
                                    gmtCreated: orderForm.gmtCreated,
                                    goodsNames: goodsNames,
                                    goodsPrices: goodsPrices,
                                    goodsQrcodeQuantitys: goodsQrcodeQuantitys,
                                    goodsTypeNames: goodsTypeNames,
                                    orderFormPrice: orderForm.orderFormPrice,
                                }
                            );
                        }


                    }
                });
            },
        }
    }
</script>

<style scoped>

    tr{
        height: 100px !important;
    }
</style>


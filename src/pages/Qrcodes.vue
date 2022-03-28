<template>

</template>

<script>
    export default {
        name: "Qrcodes",
        data() {
            return {
                baseURL: 'http://stu.hrbkyd.com/QRCodeMall/',
                goodsList: [],
                goodsName: '',
                goodsPrice: undefined,
                beginTime: undefined,
                goodsTypeName: '',
                endTime: undefined,
                pageNum: 1,
                currentPage: 1,
                total: 0,
                isFirstPage: true,
                isLastPage: true,
                prePage: 0,
                nextPage: 0,
                hasPreviousPage: false,
                hasNextPage: false,
                columns: [
                    {
                        title: '商品名',
                        dataIndex: 'goodsName',
                    },
                    {
                        title: '商品价格',
                        dataIndex: 'goodsPrice',
                    },
                    {
                        title: '商品类型',
                        dataIndex: 'goodsTypeName',
                    }, {
                        title: '二维码数量',
                        dataIndex: 'goodsQrcodeQuantity',
                    }, {
                        title: '商品状态',
                        dataIndex: 'isDeleted',
                        scopedSlots: {customRender: 'isDeleted'},
                    }, {
                        title: '商品类型',
                        dataIndex: 'goodsTypeName',
                    },
                    {
                        title: '商品图片',
                        dataIndex: 'goodsPicture',
                        scopedSlots: {customRender: 'goodsPicture'},
                    }, {
                        title: '商品详情图片',
                        dataIndex: 'goodsDetail',
                        scopedSlots: {customRender: 'goodsDetail'},
                    },
                    {
                        title: '商品上架时间',
                        dataIndex: 'gmtCreated',

                    },

                    {
                        title: '操作',
                        dataIndex: 'operation',
                        scopedSlots: {customRender: 'operation'},
                    },
                ],
            }
        },
    }
</script>

<style scoped>

</style>

<template>
    <a-layout>

        <a-layout-content>
            <a-table bordered :data-source="goodsList" :columns="columns" :pagination="false" style="background: white">
                <template slot="isDelete" slot-scope="text,record">
                    <span v-if="record.isDeleted===0">已上架</span>
                    <span v-else>已下架</span>
                </template>

                <template slot="operation" slot-scope="text, record">
                    <a-popconfirm
                            v-if="goodsList.length"
                            title="删除?"
                            @confirm="() => onDelete(record.goodsId)"
                    >
                        <a href="javascript:;">删除</a>
                    </a-popconfirm>
                </template>
            </a-table>
            <br>
            <a-pagination :default-current="currentPage" :total="total" @change="changePage" v-model="currentPage" style="float: right;margin-right: 4px" />
        </a-layout-content>
    </a-layout>
</template>

<script>

    import {goods, deleteGoods} from "../api/admin"

    export default {
        name: "Search",


        watch: {
            $route: {
                handler() {

                    let pageNum = this.$route.query.pageNum;
                    let pageSize = this.$route.query.pageSize;
                    let goodsName = this.$route.query.goodsName;
                    let goodsPrice = this.$route.query.goodsPrice;
                    let beginTime = this.$route.query.beginTime;
                    let goodsTypeName = this.$route.query.goodsTypeName;
                    let endTime = this.$route.query.endTime;

                    goods({
                        pageNum: pageNum,
                        pageSize: pageSize,
                        beginTime: beginTime,
                        endTime: endTime,
                        goodsName: goodsName,
                        goodsPrice: goodsPrice,
                        goodsTypeName: goodsTypeName,
                    }).then(res => {
                        this.goodsList = res.data.data.list;


                    })
                    //深度监听，同时也可监听到param参数变化
                },
                deep: true,
            }
        },
        components: {},
        data() {
            return {
                baseURL: 'http://localhost:8080/QRCodeMall/',
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
                        title: '操作',
                        dataIndex: 'operation',
                        scopedSlots: {customRender: 'operation'},
                    },
                ],
            }
        },


        created() {

            // eslint-disable-next-line no-debugger

            let pageNum = this.$route.query.pageNum;
            let pageSize = this.$route.query.pageSize;
            let goodsName = this.$route.query.goodsName;
            let goodsPrice = this.$route.query.goodsPrice;
            let beginTime = this.$route.query.beginTime;
            let goodsTypeName = this.$route.query.goodsTypeName;
            let endTime = this.$route.query.endTime;

            goods({
                pageNum: pageNum,
                pageSize: pageSize,
                beginTime: beginTime,
                endTime: endTime,
                goodsName: goodsName,
                goodsPrice: goodsPrice,
                goodsTypeName: goodsTypeName,
            }).then(res => {
                this.goodsList = res.data.data.list;
                this.currentPage=res.data.data.pageNum;
                this.isFirstPage=res.data.data.isFirstPage;
                this.isLastPage=res.data.data.isLastPage;
                this.isFirstPage=res.data.data.isFirstPage;
                this.prePage=res.data.data.prePage;
                this.nextPage=res.data.data.nextPage;
                this.hasPreviousPage=res.data.data.hasPreviousPage;
                this.hasNextPage=res.data.data.hasNextPage;
                this.total=res.data.data.total;
                // eslint-disable-next-line no-debugger
               console.log(this.currentPage);
               console.log(this.total);

            })


        },

        methods: {

            filterIsDelete() {
                let goodsListTemp = [];
                // eslint-disable-next-line no-debugger

                for (let i = 0; i < this.goodsList.length; i++) {
                    if (this.goodsList[i].isDeleted === 0) {
                        goodsListTemp.push(this.goodsList[i]);
                    }
                }

                this.goodsList = goodsListTemp;
            },

            onDelete(goodsId) {
                deleteGoods({
                    goodsId: goodsId
                }).then(() => {
                   this.$router.go(0);
                })
                // eslint-disable-next-line no-debugger

            },
            dateChange(date, dateString) {
                this.beginTime = dateString[0];
                this.endTime = dateString[1];
            },

            changePage(pageNum) {
                let goodsName = this.$route.query.goodsName;
                let goodsPrice = this.$route.query.goodsPrice;
                let beginTime = this.$route.query.beginTime;
                let goodsTypeName = this.$route.query.goodsTypeName;
                let endTime = this.$route.query.endTime;
                this.$router.push({
                    path: 'search', query: {
                        beginTime: beginTime,
                        endTime: endTime,
                        goodsName: goodsName,
                        goodsPrice: goodsPrice,
                        goodsTypeName: goodsTypeName,
                        pageNum: pageNum
                    }
                });
            },
            search() {
                // eslint-disable-next-line no-debugger

                this.$router.push({
                    path: 'search', query: {
                        beginTime: this.beginTime,
                        endTime: this.endTime,
                        goodsName: this.goodsName,
                        goodsPrice: this.goodsPrice,
                        goodsTypeName: this.goodsTypeName,
                    }
                });

            }
        }

    }
</script>

<style scoped>
    .ant-layout-header {
        background: #F0F2F5;
    }
</style>

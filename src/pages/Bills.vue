<template>
    <a-layout style="background: white">

            <a-table :data-source="userBills" :pagination="false">
                <a-table-column-group>
                    <a-table-column
                            data-index="userBillMoney"
                            title="金额"
                    >
                    </a-table-column>
                    <a-table-column
                            data-index="userBillDirection"
                            title="收入/支出"
                    >
                        <template scope="scope">
                            <span v-if="scope.userBillDirection===1">支出</span>
                            <span v-else>收入</span>
                        </template>
                    </a-table-column>

                    <a-table-column
                            data-index="userId"
                            title="用户名ID"
                    >
                    </a-table-column>

                    <a-table-column
                            data-index="userBillRemark"
                            title="备注"
                    >
                    </a-table-column>
                    <a-table-column
                            data-index="gmtCreated"
                            title="时间"
                    >
                    </a-table-column>


                </a-table-column-group>

            </a-table>

        <a-layout-footer>
            <a-pagination  :total="total" show-less-items  @change="currentChange" :page-size.sync="pageSize" style="float: right"/>
        </a-layout-footer>
    </a-layout>
</template>

<script>

    import {userBill} from "../api/admin";

    export default {
        name: "Bills",

        created() {
            this.fetchData();
        },
        data() {
            return {
                userBills: [],
                total: 0,
                pageSize:9
            }
        },
        methods: {
            currentChange(pageNum){
                userBill({
                    pageNum:pageNum
                }).then(res => {
                    this.userBills = res.data.data.list;
                });
            },
            fetchData() {
                userBill().then(res => {
                    this.userBills = res.data.data.list;
                    this.total = res.data.data.total;
                });
            }
        }
    }
</script>

<style scoped>

</style>

<template>
    <a-layout>
        <a-table :data-source="qrcodeBatch" style="background: white" :pagination="false">
            <a-table-column-group>
                <a-table-column key="qrcodeId" title="二维码id" data-index="qrcodeId">
                </a-table-column>
                <a-table-column title="二维码图片">
                    <template scope="scope">
                        <img :src="`https://api.pwmqr.com/qrcode/create/?url=http://stu.jeehon.com/view/view.html?qrcodeId=${scope.qrcodeId}`"
                             style="width: 120px;height: 120px" width="100px" height="100px" alt="二维码图片"/>
                    </template>
                </a-table-column>
                <a-table-column key="userName" title="用户名" data-index="userName">
                </a-table-column>
                <a-table-column key="goodsTypeName" title="商品类别" data-index="goodsTypeName">

                </a-table-column>
                <a-table-column key="qrcodeNumber" title="二维码数量" data-index="qrcodeNumber">

                </a-table-column>
                <a-table-column key="expressNumber" title="快递单号" data-index="expressNumber">

                </a-table-column>
                <a-table-column key="expressServicesCompany" title="快递公司" data-index="expressServicesCompany">
                </a-table-column>

                <a-table-column title="邮寄地址（省）">
                    <template scope="scope">
                        <span>{{scope.userAddress.userAddressProvince}}</span>
                    </template>
                </a-table-column>
                <a-table-column title="邮寄地址（市）">
                    <template scope="scope">
                        <span>{{scope.userAddress.userAddressCity}}</span>
                    </template>
                </a-table-column>
                <a-table-column title="邮寄地址（县，区）">
                    <template scope="scope">
                        <span>{{scope.userAddress.userAddressDistrict}}</span>
                    </template>
                </a-table-column>
                <a-table-column title="邮寄地址（详细地址）">
                    <template scope="scope">
                        <span>{{scope.userAddress.userAddressDetail}}</span>
                    </template>
                </a-table-column>

                <a-table-column key="receiveName" title="收件人">
                    <template scope="scope">
                        <span>{{scope.userAddress.receiveName}}</span>
                    </template>
                </a-table-column>

                <a-table-column key="receivePhone" title="收件人电话">
                    <template scope="scope">
                        <span>{{scope.userAddress.receivePhone}}</span>
                    </template>
                </a-table-column>

                <a-table-column title="操作" key="action">
                    <template scope="scope">
                        <a-button type="link" @click="show(scope.qrcodeBatchId)">修改快递公司，快递单号</a-button>
                    </template>
                </a-table-column>
            </a-table-column-group>
        </a-table>
        <a-layout-footer>
    <a-pagination style="float: right" @change="fetchData" :total="total" :page-size.sync="pageSize">

    </a-pagination>
        </a-layout-footer>

        <!--    <a-modal
                    :visible="visible"
                    @ok="updateExpress"
                    @cancel="cancel"
            >
               <a-form-model :model="ruleForm" >
                   <a-form-model-item>
                       <a-input placeholder="快递公司" v-model="ruleForm.expressServicesCompany"/>
                   </a-form-model-item>
                    <a-form-model-item>
                        <a-input placeholder="快递单号" v-model="ruleForm.expressNumber"/>
                    </a-form-model-item>
               </a-form-model>

            </a-modal>-->
    </a-layout>
</template>

<script>

    import {adminFind, updateBatch} from '../api/qrcodeBatch'

    export default {
        name: "BatchQrcode",

        data() {
            return {

                pageSize:9,
                ModalText: 'Content of the modal',
                visible: false,
                confirmLoading: false,
                total:0,
                qrcodeBatch: [],
                /*   visible:false,*/
                ruleForm: {
                    expressNumber: '',
                    expressServicesCompany: ''
                }
            }
        },
        created() {
            this.fetchData(1);
        },

        methods: {

            show(qrcodeBatchId) {
                this.$router.push({path: '/updateBatchQrcode', query: {qrcodeBatchId: qrcodeBatchId}});
            },
            cancel() {

                this.visible = false;
            },
            updateExpress(qrcodeBatchId) {
                let qrcodeBatch = {};
                for (let i = 0; i < this.qrcodeBatch.length; i++) {
                    if (this.qrcodeBatch[i].qrcodeBatchId === qrcodeBatchId) {
                        qrcodeBatch = this.qrcodeBatch[i];
                        break;
                    }
                }
                qrcodeBatch.expressNumber = this.ruleForm.expressNumber;
                qrcodeBatch.expressServicesCompany = this.ruleForm.expressServicesCompany;
                updateBatch(JSON.stringify(qrcodeBatch)).then(res => {
                    if (res.data.code === 200) {
                        this.cancel();
                        this.fetchData();
                    }
                });


            },


            fetchData(pageNum) {
                adminFind({
                    pageNum: pageNum
                }).then(res => {
                    this.qrcodeBatch = res.data.data.list;
                    this.total=res.data.data.total;
                    console.log(JSON.stringify(this.qrcodeBatch));
                });
            }
        },


    }
</script>

<style scoped>

</style>

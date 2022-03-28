<template>
    <a-layout>
        <a-form-model :model="ruleForm" style="width: 400px;margin: 20px auto">
            <a-form-model-item>
                <a-input placeholder="快递公司" v-model="ruleForm.expressServicesCompany"/>
            </a-form-model-item>
            <a-form-model-item>
                <a-input placeholder="快递单号" v-model="ruleForm.expressNumber"/>
            </a-form-model-item>
            <a-form-model-item>
                <a-button type="primary" @click="updateBatchQrcode">修改</a-button>
            </a-form-model-item>
        </a-form-model>
    </a-layout>
</template>

<script>

    import {updateBatch,adminFind} from '../api/qrcodeBatch'
    export default {
        name: "UpdateBatchQrcode",

        created() {
            adminFind({
                qrcodeBatchId: this.$route.query.qrcodeBatchId
            }).then(res=>{
                this.ruleForm=res.data.data.list[0];
                console.log(JSON.stringify(res.data.data.list));
            })
        },
        data() {
            return {


                ruleForm: {
                    expressNumber: '',
                    expressServicesCompany: '',
                    qrcodeBatchId: this.$route.query.qrcodeBatchId
                }
            }
        },

        methods: {
            updateBatchQrcode(){
                if(this.ruleForm.expressNumber===''||this.ruleForm.expressServicesCompany===''){
                    alert("快递单号或快递公司未填写")
                    return
                }


                updateBatch(JSON.stringify(this.ruleForm)).then(res=>{
                   if(res.data.code===200){
                       alert("成功");
                   }
                });
            }
        },


    }
</script>

<style scoped>

</style>

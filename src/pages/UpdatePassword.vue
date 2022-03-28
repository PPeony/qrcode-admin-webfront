<template>
    <a-layout>

            <a-form-model :model="form" :rules="rules" ref="ruleForm"   v-bind="layout" style="margin-top: 175px;margin-left: 300px">
                <a-form-model-item ref="oldPassword" label="旧密码" prop="oldPassword">
                    <a-input  v-model="form.oldPassword"/>
                </a-form-model-item>
                <a-form-model-item ref="newPassword" label="新密码" prop="newPassword">
                    <a-input-password  v-model="form.newPassword"/>
                </a-form-model-item>
                <a-form-model-item :wrapper-col="{ span: 4, offset: 9 }">
                    <a-button type="primary" @click="submit" size="large" style="margin-left: 40px">修改</a-button>
                </a-form-model-item>
            </a-form-model>


    </a-layout>
</template>

<script>
    import {login,updatePassword} from '../api/admin';

    let checkIsPassword = (rule, value, callback) => {
        if (value === '') {
            callback("旧密码不能为空");
        } else {
            login({
                account: this.adminName,
                password: this.password
            }).then(res => {
                if (res.data.code === 200) {
                    callback();
                } else {
                    callback('旧密码错误');
                }
            })
        }
        callback();
    }
    export default {
        name: "UpdatePassword",
        created() {

        },
        data() {

            return {
                layout: {
                    labelCol: { span: 4 },
                    wrapperCol: { span: 8 },
                },
                form: {
                    oldPassword: '',
                    newPassword: ''
                },
                adminName: localStorage.getItem('adminName'),
                rules: {
                    oldPassword: [{validator: checkIsPassword, trigger: 'blur'}],
                    newPassword: [{required: true, message: '新密码不能为空', trigger: 'blur'}],
                }
            }
        },
        methods: {

            submit(){

                // eslint-disable-next-line no-debugger
                debugger
                this.$refs.ruleForm.validate(valid=>{
                    if(valid){
                        updatePassword({
                            oldPassword:this.form.oldPassword,
                            newPassword:this.form.newPassword
                        }).then(res=>{
                           if(res.data.code===200){
                               alert("修改成功");
                               this.$refs['ruleForm'].resetFields();
                           }
                        });
                    }
                })
            }
        },

    }
</script>

<style scoped>

</style>

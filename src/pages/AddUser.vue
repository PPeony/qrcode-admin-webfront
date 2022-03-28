<template>
    <a-layout >
        <a-form-model :model="form" :rules="rules" :label-col="labelCol"
                      :wrapper-col="wrapperCol" ref="ruleForm">
            <a-form-model-item ref="userName" label="用户名" prop="userName">
                <a-input :value="form.userName" v-model="form.userName"/>
            </a-form-model-item>
            <a-form-model-item ref="userPassword" label="用户密码" prop="userPassword">
                <a-input-password :value="form.userPassword" v-model="form.userPassword"/>

            </a-form-model-item>
            <a-form-model-item ref="userPhone" label="手机号" prop="userPhone">
                <a-input :value="form.userPhone" v-model="form.userPhone"/>
            </a-form-model-item>
            <a-form-model-item ref="userEmail" label="邮箱" prop="userEmail">
                <a-input :value="form.userEmail" v-model="form.userEmail" type="email"/>
            </a-form-model-item>
            <a-form-model-item ref="userFatherProxyName" label="一级代理" prop="userFatherProxyName">
                <a-input :value="form.userFatherProxyName" v-model="form.userFatherProxyName"/>

            </a-form-model-item>
            <a-form-model-item ref="userGrandFatherProxyName" label="二级代理" prop="userGrandFatherProxyName">
                <a-input :value="form.userGrandFatherProxyName" v-model="form.userGrandFatherProxyName"/>

            </a-form-model-item>
            <a-form-model-item :wrapper-col="{ span: 30, offset: 16 }">

                <a-button type="primary" @click="submit()"  size="large" style="margin-left: 40px">提交</a-button>
            </a-form-model-item>
        </a-form-model>

    </a-layout>
</template>

<script>
    import { addUser, user} from "../api/admin";

    export default {
        name: "AddUser",


        data() {
            let checkUserPhone = (rule, value, callback) => {
                if(value===''){
                    callback("手机号不能为空");
                }
                else if (!/^1[3456789]\d{9}$/.test(value)) {
                    callback(new Error("请输入正确的手机号格式"));
                }else {
                    callback();
                }
            }
            return {
                labelCol: {span: 4},
                wrapperCol: {span: 14},

                form: {
                    userName: '',
                    userPhone: '',
                    userPassword: '',
                    userEmail: '',
                    userFatherProxyName: '',
                    userGrandFatherProxyName: ''

                },

                rules: {
                    userName: [{required: true, message: '用户名', trigger: 'blur'}],
                    userPhone: [{validator:checkUserPhone, trigger: 'blur'}],
                    userPassword: [{required: true, message: '密码不能为空', trigger: 'blur'}],


                }
            }
        },
        created() {
            // eslint-disable-next-line no-debugger
            // debugger
            let userId = this.$route.query.userId;

            user({
                userId: userId
            }).then(res => {
                console.log(JSON.stringify(res.data));
                this.form.userName = res.data.data.list[0].userName;
                this.form.userPhone = res.data.data.list[0].userPhone;
                this.form.userPassword = res.data.data.list[0].userPassword;
                this.form.userEmail = res.data.data.list[0].userEmail;
                this.form.userFatherProxyName = res.data.data.list[0].userFatherProxyName;
                this.form.userGrandFatherProxyName = res.data.data.list[0].userGrandFatherProxyName;

            });
        },
        methods:{
            submit(){
              console.log('submit')
                this.$refs.ruleForm.validate(valid => {
                    if (valid ) {
                        addUser(JSON.stringify(this.form)).then(res=>{
                            if(res.data.code===200){
                                alert("提交成功");
                            } else {
                                alert(res.data.message);
                            }
                        });

                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });

            }
        }
    }
</script>

<style scoped>

</style>

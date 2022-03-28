<template>


    <div  style="">

        <div style="width: 400px;margin: 100px auto 0;">
            <div style="margin-bottom: 140px">
                <h1 style="text-align: center"><strong>二维码商城管理员后台</strong></h1>
            </div>
            <a-form-model layout="horizontal" :model="admin" @submit="login" @submit.native.prevent>
                <a-form-item>
                    <a-input placeholder="账号" v-model="admin.adminName" max-length="400px"></a-input>
                    <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)"/>
                </a-form-item>
                <a-form-item>
                    <a-input-password placeholder="密码" v-model="admin.password" ></a-input-password>
                    <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)"/>
                </a-form-item>
                <a-row>
                    <span style="color: red">{{error}}</span>
                </a-row>
                <a-form-model-item>
                    <a-button
                            type="primary"
                            html-type="submit"
                            :disabled="admin.adminName === '' || admin.password === ''"
                            block>
                        登录
                    </a-button>
                </a-form-model-item>
            </a-form-model>
        </div>


    </div>


</template>

<script>

    import {login} from '../api/admin'
    import {deleteGoods} from "../api/admin";

    export default {
        name: "Login",

        created() {
           deleteGoods({
               goodsId:1
           }).then(res=>{
               console.log(res.data);
           })
        },
        props: ['error'],
        data() {
            return {
                admin: {
                    adminName: '',
                    password: ''
                }
            }
        },
        methods: {
            login() {
                let adminVO = {account: this.admin.adminName, password: this.admin.password};
                login(JSON.stringify(adminVO)).then(res => {
                     if(res.data.code===200){
                         sessionStorage.setItem('admin',JSON.stringify(adminVO));
                         this.$router.push({path:'/analyse'});
                     }

                })
            }
        }
    }
</script>

<style scoped>

</style>

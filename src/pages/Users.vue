<template>

    <a-layout>
        <a-layout-header style="background: none">

            <a-row :gutter="16">
                <a-col :span="4">
                    <a-input placeholder="用户名" v-model="userName"></a-input>
                </a-col>
                <a-col :span="4">
                    <a-input-number placeholder="手机号" v-model="userPhone"></a-input-number>
                </a-col>
                <a-col :span="4">
                    <a-input placeholder="用户邮箱" v-model="userEmail"></a-input>
                </a-col>
                <a-col :span="4">
                    <a-button type="primary" @click="search" :disabled="this.userName === '' && this.userPhone === '' && this.userEmail === ''">搜索</a-button>
                </a-col>
            </a-row>


        </a-layout-header>
        <a-layout-content>
            <a-table bordered :data-source="userList" :columns="columns" :pagination="false" style="background: white">

                <template slot="userFatherProxyName" slot-scope="text, record" >
                    <span v-if="record.userFatherProxyName!==null">{{record.userFatherProxyName}}</span>
                    <span v-else>无一级代理</span>
                </template>

                <template slot="userGrandFatherProxyName" slot-scope="text, record">
                    <span v-if="record.userGrandFatherProxyName!==null">{{record.userGrandFatherProxyName}}</span>
                    <span v-else>无二级代理</span>
                </template>
                <template slot="operation" slot-scope="text, record">
                    <router-link :to="{path: 'updateUser',query: {userId:record.userId}}">修改</router-link>
                </template>
            </a-table>
            <br>
            <a-pagination :default-current="currentPage" :total="total" @change="changePage" v-model="currentPage" style="float: right;margin-right: 4px" />
        </a-layout-content>
    </a-layout>
</template>

<script>

    import {user} from '../api/admin';

    export default {
        name: "Users",
        created() {
            let userName = this.$route.query.userName;
            let userPhone = this.$route.query.userPhone;
            let userEmail = this.$route.query.userEmail;

                user({
                    userName: userName,
                    userPhone: userPhone,
                    userEmail: userEmail
                }).then(res => {
                    this.userList = res.data.data.list;
                    this.currentPage=res.data.data.pageNum;
                    this.total=res.data.data.total;
                });

        },
        data() {
            return {
                userList: [],
                flag:true,
                currentPage: 1,
                total: 0,
                columns: [
                    {
                        title: '用户名',
                        dataIndex: 'userName',
                    },
                    {
                        title: '电话',
                        dataIndex: 'userPhone',
                    },
                    {
                        title: '邮箱',
                        dataIndex: 'userEmail',
                    }, {
                        title: '积分',
                        dataIndex: 'userPoint',
                    }, {
                        title: '一级代理',
                        dataIndex: 'userFatherProxyName',
                        scopedSlots: {
                            customRender: 'userFatherProxyName'
                        }
                    }, {
                        title: '二级代理',
                        dataIndex: 'userGrandFatherProxyName',
                        scopedSlots: {
                            customRender: 'userGrandFatherProxyName'
                        }
                    },
                    {
                        title: '操作',
                        dataIndex: 'operation',
                        scopedSlots: {customRender: 'operation'},
                    },
                ],

                    userName: '',
                    userPhone: '',
                    userEmail: '',


            }
        },
        methods: {
            changePage(pageNum) {
                let userName = this.$route.query.userName;
                let userPhone = this.$route.query.userPhone;
                let userEmail = this.$route.query.userEmail;

                this.$router.push({
                    path: 'search', query: {
                        userName: userName,
                        userPhone: userPhone,
                        userEmail: userEmail,
                        pageNum:pageNum
                    }
                });
            },

            search() {
                this.$router.push({
                    path: 'users',
                    query: {userName: this.userName, userPhone: this.userPhone, userEmail: this.userEmail}
                })
            }
        }
    }
</script>

<style scoped>

</style>

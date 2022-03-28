<template>

    <div id="app">

        <router-view name="admin"></router-view>
        <router-view name="login"></router-view>

    </div>


</template>

<script>


    import logout from './api/admin';

    export default {
        name: 'App',
        components: {


            /*Login*/
        },
        data() {
            return {
                menuList: [{menuFirst: {name: '系统数据监控'}, menuItems: [{name:'公司收入监控',link:'/analyse'}]},
                    {
                        menuFirst: {name: '商品信息'},
                        menuItems: [{name: '商品管理', link: '/search'}, {name: '商品类别管理', link: '/goodsTypes'},
                            {name: '添加商品', link: '/addGoods'},{name: '商品促销管理', link:'/goodsPromotion'}]
                    },
                    {
                        menuFirst: {name: '用户信息'},
                        menuItems: [{name: '用户管理', link: 'users'}, {name: '添加用户', link: '/addUser'}]
                    }, {
                        menuFirst: {name: '公告信息'},
                        menuItems: [{name: '公告管理', link: '/notices'}, {name: '添加公告', link: '/addNotice'}]
                    }, {
                        menuFirst: {name: '订单信息'},
                        menuItems: [{name: '订单管理', link: '/orderForms'}]
                    }, {
                        menuFirst: {name: '账单信息'},
                        menuItems: [{name: '账单管理', link: '/userBills'}]
                    }


                ],
                collapsed: false,
                flag: false,
                error: '',
            };
        },
        watch: {},
        methods: {

            logout() {
                logout().then(() => {
                    this.flag = false;
                });
            },
            getRes(res) {
                if (res.code === 200) {
                    this.flag = true;
                } else {
                    this.error = res.message;
                }
            }
        },
    }
</script>

<style>
    #components-layout-demo-custom-trigger .trigger {
        font-size: 18px;
        line-height: 64px;
        padding: 0 24px;
        cursor: pointer;
        transition: color 0.3s;
    }

    #components-layout-demo-custom-trigger .trigger:hover {
        color: #1890ff;
    }

    #components-layout-demo-custom-trigger .logo {
        height: 32px;
        color: white;
        margin: 16px;
    }
</style>

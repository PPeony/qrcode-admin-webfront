<template>

    <div id="app">
        <a-layout id="components-layout-demo-custom-trigger">
            <a-layout-sider v-model="collapsed" :trigger="null" collapsible >
                <div class="logo">
                    <a-icon type="home"></a-icon>
                    <span>二维码商城后台管理系统</span>
                </div>
                <a-menu theme="dark" mode="inline" :default-selected-keys="['1']" >

                    <a-sub-menu v-for="sub in menuList"  :key="sub.menuFirst.name">
                        <span slot="title">{{sub.menuFirst.name}}</span>
                        <a-menu-item v-for="menuItem in sub.menuItems" :key="menuItem.name" :index="menuItem.link">
                            <router-link :to="menuItem.link">{{menuItem.name}}</router-link>
                        </a-menu-item>
                    </a-sub-menu>
                </a-menu>
            </a-layout-sider>
            <a-layout>
                <a-layout-header style="background: #fff; padding: 0;margin-left: 20px">

                    <a-icon
                            class="trigger"
                            :type="collapsed ? 'menu-unfold' : 'menu-fold'"
                            @click="() => (collapsed = !collapsed)"
                    />


                    <a @click="logout" style="float: right;margin-right: 20px">&nbsp;退出登录</a>


                </a-layout-header>
                <a-layout-content
                        :style="{ margin: '', padding: '10px', minHeight: '620px' }"
                >

                    <router-view ></router-view>
                </a-layout-content>
                <a-layout-footer style="text-align: center">
                    二维码商城系统管理员后台
                </a-layout-footer>
            </a-layout>
        </a-layout>

    </div>


</template>

<script>


    import {logout} from '../api/admin';

    export default {
        name: 'Index',
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
                    },  {
                        menuFirst: {name: '二维码邮寄管理'},
                        menuItems: [{name: '邮寄二维码管理', link: 'qrcodeBatch'}]
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
                    this.$router.push({path:'/login'});
                });
            },

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

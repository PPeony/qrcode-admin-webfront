<template>
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
</template>

<script>
    export default {
        name: "Nav",

        data(){
            return{
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
                        menuItems: [{name: '订单管理', link: '/orderForms'}, {name: '添加订单', link: '/addOrderForm'}]
                    }, {
                        menuFirst: {name: '二维码信息'},
                        menuItems: [{name: '二维码管理', link: '/users'}, {name: '添加二维码', link: '/addQrcode'}]
                    }, {
                        menuFirst: {name: '用户地址信息'},
                        menuItems: [{name: '用户地址', link: '/userAddresses'}, {name: '添加地址', link: '/addUserAddress'}]
                    }, {
                        menuFirst: {name: '账单信息'},
                        menuItems: [{name: '账单管理', link: '/userBills'}, {name: '添加账单', link: '/addUserBill'}]
                    },{
                        menuFirst: {name: '管理员信息'},
                        menuItems: [{name: '修改管理员密码', link: '/updatePassword'}]
                    }


                ],
                collapsed: false,
                flag: false,
                error: '',
            }
        }
    }
</script>

<style scoped>

</style>

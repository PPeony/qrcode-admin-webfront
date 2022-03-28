import Vue from 'vue'
import App from './App.vue'

import VueRouter from 'vue-router';
import 'element-ui/lib/theme-chalk/index.css';
import ElementUI from 'element-ui';
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import VCharts from 'v-charts'
import axios from "axios";

import Analyse from "./pages/Analyse";
import Search from "./pages/Search";
import AddGoods from "./pages/AddGoods";
import AddNotice from "./pages/AddNotice";
import GoodsTypes from "./pages/GoodsTypes";
import UpdateGoods from "./pages/UpdateGoods";
import UpdateUser from "./pages/UpdateUser";
import Users from "./pages/Users";
import OrderForms from "./pages/OrderForms";
import Notices from "./pages/Notices";
import AddUser from "./pages/AddUser";
import UpdatePassword from "./pages/UpdatePassword";
import Test from "./pages/Test";
import GoodsPromotion from "./pages/GoodsPromotion";


import {
    Button,
    Col,
    DatePicker,
    Dropdown,
    Form,
    FormModel,
    Icon,
    Input,
    InputNumber,
    Layout,
    List,
    Menu,
    Pagination,
    Popconfirm,
    Popover,
    Row,
    Select,
    Table,
    Tabs,
    TimePicker,
} from 'ant-design-vue'
import Notice from "./pages/Notice";
import BatchQrcode from "./pages/BatchQrcode";
import UpdateBatchQrcode from "./pages/UpdateBatchQrcode";
import Bills from "./pages/Bills";
import Index from "./pages/Index";
import Login from "./pages/Login";


Vue.use(Pagination);
Vue.use(FormModel)
Vue.use(Layout)
Vue.use(Input)
Vue.use(InputNumber)
Vue.use(Button)
Vue.use(Select)
Vue.use(Form)
Vue.use(Row)
Vue.use(Col)
Vue.use(Table)
Vue.use(Tabs)
Vue.use(Icon)
Vue.use(Popover)
Vue.use(Dropdown)
Vue.use(List)
Vue.use(Menu)
Vue.use(DatePicker)
Vue.use(TimePicker)
Vue.use(Popconfirm)
Vue.use(ElementUI)
Vue.config.productionTip = false

Vue.use(VueRouter);
Vue.use(VCharts)
Vue.use(VueQuillEditor)

axios.defaults.withCredentials = true;

let router = new VueRouter({


    base: '/admin',   // 主要添加这个 /app/mall 注意这个 和上面的一致，为nginx location路径， 也就是请求路径

    routes: [


        {
            path: '/login',
            components: {
                login: Login
            }
        }
        ,
        {
            path: '/',
            components: {
                admin: Index
            },
            children: [
                {
                    path: '/test',
                    component: Test
                },
                {
                    path: '/',
                    redirect: '/analyse'
                },

                {
                    path: 'updateGoods',
                    components: UpdateGoods,
                    name: UpdateGoods
                }, {
                    path: "analyse",
                    component: Analyse,
                }, {
                    path: "addUser",
                    component: AddUser
                }, {
                    path: "search",
                    component: Search
                }, {
                    path: 'addGoods',
                    component: AddGoods
                }, {
                    path: 'updateGoods',
                    component: UpdateGoods,
                },
                {
                    path: 'addNotice',
                    component: AddNotice
                },
                {
                    path: 'goodsTypes',
                    component: GoodsTypes
                },
                {
                    path: 'users',
                    component: Users
                },
                {
                    path: 'orderForms',
                    component: OrderForms
                },
                {
                    path: 'notices',
                    component: Notices
                },
                {
                    path: 'noticeDetail',
                    component: Notice
                },
                {
                    path: 'updateUser',
                    component: UpdateUser
                }, {
                    path: 'qrcodeBatch',
                    component: BatchQrcode
                }, {
                    path: 'updatePassword',
                    component: UpdatePassword

                }, {
                    path: 'updateBatchQrcode',
                    component: UpdateBatchQrcode

                }, {
                    path: 'userBills',
                    component: Bills

                },{
                    path: 'goodsPromotion',
                    component: GoodsPromotion
                }
            ]
        },
    ]
})


router.beforeEach((to, from, next) => {
    var routers = to.path.split("/");
    var admin = sessionStorage.getItem('admin');
    var fatherRouter = routers[1];
    if (fatherRouter !== 'login' && admin === null) {
        alert("请登录");
        next("/login");
    } else {
        next();
    }
})
new Vue({
    render: h => h(App),
    router: router
}).$mount('#app')


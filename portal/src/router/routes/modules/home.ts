import { RouteRecordRaw } from 'vue-router';

const home: RouteRecordRaw = {
    path: '/home',
    name: 'Home',
    redirect: '/home/homePage',
    meta: {
        title: '首页',
        icon: 'ant-design:home-outlined',
        sort: 0,
        hideSubMenu: true
    },
    children: [
        {
            path: 'homePage',
            name: 'HomePage',
            component: () => import('@/views/home/index.vue')
        }
    ]
};

export default home;
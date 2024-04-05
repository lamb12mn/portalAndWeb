import { RouteRecordRaw } from 'vue-router';

// 获取动态路由模块
export const getRouteModuleList = async () => {
    const routeModuleList: RouteRecordRaw[] = [];

    // 动态引入modules目录下的所有路由模块
    const modules = import.meta.glob('./modules/**/*.ts');

    // 加入到动态路由集合中
    for (const path in modules) {
        const modObj = await modules[path]();
        // @ts-ignore
        const mod = modObj.default || {};
        const modList = Array.isArray(mod) ? [...mod] : [mod];
        routeModuleList.push(...modList);
    }

    return routeModuleList;
};

// 静态路由列表
export const staticRoutesList: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Root',
        redirect: '/home',
        meta: {
            title: 'Root',
        },
    },
];
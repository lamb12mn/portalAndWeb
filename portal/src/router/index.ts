import type { App } from 'vue';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import {
    getRouteModuleList,
    staticRoutesList
} from '@/router/routes/RouteList';

// 创建一个可以被 Vue 应用程序使用的路由实例
export const router = createRouter({
    history: createWebHistory('/'), // 这里路由使用的是history模式，该模式下链接里没有#，但是需要服务端做相关配置，如果服务器端不支持配置请使用hash模式，对应函数为createWebHashHistory
    routes: staticRoutesList,
    strict: true,
    scrollBehavior: () => ({ left: 0, top: 0 })
});

// 配置路由器
export async function setupRouter(app: App<Element>) {
    const dynamicRoutes = await getRouteModuleList();
    // 将动态路由添加到router里
    dynamicRoutes.forEach((item: RouteRecordRaw) => {
        router.addRoute(item);
    });
    app.use(router);
}
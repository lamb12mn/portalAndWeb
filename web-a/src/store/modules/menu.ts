/* 注意这个store在router中使用了，无法持久化 */
import { defineStore } from 'pinia';
import { store } from '@/store';

// ts接口规范
interface MenuState {
    MenuInfo: string[]; // 菜单
}

export const useMenuStore = defineStore({
    id: 'app-menu',
    state: (): MenuState => ({
        MenuInfo: [],
    }),
    getters: {
        getMenuInfo(): string[] {
            return this.MenuInfo;
        },
    },
    actions: {
        setMenuInfo(list: string[]) {
            this.MenuInfo = list;
        },
    },
});

// 用于组件setup以外的地方
export function useMenuStoreWithOut() {
    return useMenuStore(store);
}
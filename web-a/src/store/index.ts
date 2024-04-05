import type { App } from 'vue';
import { createPinia } from 'pinia';
//pinia 持久化插件
import piniaPluginPersist from 'pinia-plugin-persist';

const store = createPinia();
store.use(piniaPluginPersist);

export function setupStore(app: App<Element>) {
    app.use(store);
}

// 用于组件setup以外的地方
export { store };
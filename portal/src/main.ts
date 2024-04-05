import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
// import './main.css';

import { setupStore } from './store';
import { setupRouter } from './router';

async function start() {
    const app = createApp(App);

    // 设置pinia
    setupStore(app);

    // 设置vue-router
    await setupRouter(app)

    app.mount('#app');
}

start();

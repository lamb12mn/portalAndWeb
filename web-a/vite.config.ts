/* vite.config.ts */
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import legacy from '@vitejs/plugin-legacy';
import { resolve } from 'path';

import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import PurgeIcons from 'vite-plugin-purge-icons';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      {
        find: /@\//,
        replacement: resolve(process.cwd(), '.', 'src') + '/'
      }
    ]
  },
  plugins: [
    vueJsx(),
    // 提供传统浏览器兼容性支持，注意由于vue3本身不在支持ie11及以下版本，所以加了这个也不能在ie11中运行vue3项目
    legacy(),
    vue(),
    Components({
      dts: true, //ts支持
      dirs: ['src/components'], // 配置需要默认导入的自定义组件文件夹，该文件夹下的所有组件都会自动 import
      resolvers: [
        AntDesignVueResolver({
          importStyle: false, // 是否需要自动随引入加载对应的组件样式，禁用，因为某些二级组件（比如 DateRangePicker）没办法准确地识别正确路径，手动引入全局样式
          resolveIcons: true // 可使用@ant-design/icons-vue图标库
        })
      ]
    }),
    PurgeIcons() // 支持使用Iconify中所有的图标
  ],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true // 必须开启，不然ant的样式库引入时会报错
      }
    }
  }
});
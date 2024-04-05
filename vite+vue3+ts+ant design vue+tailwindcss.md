

# vite+vue3+ts+ant design vue+tailwindcss

## 简介

本文编写的目的是为了基于[vue3](https://cn.vuejs.org/guide/introduction.html)、[vite](https://vitejs.cn/)、 [ant-design-vue3](https://www.antdv.com/docs/vue/getting-started-cn)、[Tailwind CSS3](https://tailwindcss.com/docs/guides/vite)和[TypeScript](https://www.typescriptlang.org/)搭建开箱即用的前端应用框架模板，会实现axios、 [Vue Router](https://router.vuejs.org/zh/)和[Pinia](https://pinia.vuejs.org/)的封装和基本使用。

## 准备

1、开发工具选择VS Code（免费） 或者Webstorm（需购买或者自行寻找绿色版），或者其他开发工具也可以，本文使用的是VS Code

2、请提前安装好nodejs，版本>= 16.0.0，本文编写时的版本是16.14.0。

3、本文使用的包管理器是pnpm，也可以使用npm、cnpm、yarn等，npm安装pnpm使用下面的指令即可

```javascript
// 全局安装pnpm

npm install pnpm -g

// 下载包时很慢或者无法下载的话，可选择切换为淘宝镜像
pnpm config get registry // 查看源
pnpm config set registry http://registry.npm.taobao.org // 切换淘宝镜像

/*

pnpm常用命令

pnpm install 包

pnpm i 包
pnpm add 包    // -S  默认写入dependencies
pnpm add -D    // -D devDependencies
pnpm add -g    // 全局安装
pnpm remove 包         //移除包
pnpm remove 包 --global   //移除全局包
pnpm up                //更新所有依赖项
pnpm upgrade 包        //更新包
pnpm upgrade 包 --global   //更新全局包

*/
```

## 使用创建vue3项目

参考：[vite官方文档：搭建第一个vite应用](https://vitejs.cn/guide/#scaffolding-your-first-vite-project)

命令行执行一下命令

```javascript
pnpm create vite
```

根据提示输入项目名称、选择vue、选择vue-ts，等待下载模板，完成后会在当前目录生成项目名对应的文件夹

![img](https://img-blog.csdnimg.cn/cafb245c14b64d9fb1946998b6161896.png)

##  vscode - Eslint+Prettier配置VSCode自动格式化代码

参考：https://www.jianshu.com/p/dd43e06b710a

启动vscode，打开刚才创建的vite项目文件夹，控制台执行命令安装依赖

```javascript
pnpm install// 新增 prettier 依赖用于代码格式化

pnpm add -D prettier
```

vscode左侧选择扩展，安装ESLint、Prittier、Volar插件，如果以前安装过Vetur，请卸载或者禁用。

![img](https://img-blog.csdnimg.cn/8a2daf992c084b20aa7e21236b8dfb86.png)

 项目根目录下找到.vscode/extensions.json，一般会自动创建，没有的话可自行创建，填入代码

```javascript
{



  "recommendations": [



    "vue.volar",



    "vue.vscode-typescript-vue-plugin",



    "dbaeumer.vscode-eslint"



  ],



}
```

这几个是扩展插件的标识符，可点击已安装的插件查看右下方的标识符。

项目根目录下找到.vscode/settings.json（没有的话可自行创建），覆盖vscode的全局设置

```javascript
{



  // eslint 保存格式化



  "eslint.enable": true,



  "eslint.run": "onType",



  "eslint.options": {



    "extensions": [".js", ".ts", ".jsx", ".tsx", ".vue"]



  },



  // 编辑器保存格式化



  "editor.codeActionsOnSave": {



    "source.fixAll": true,



    "source.fixAll.eslint": true



  },



  // .ts 文件格式化程序



  "[typescript]": {



    "editor.defaultFormatter": "esbenp.prettier-vscode"



  },



  // .vue 文件格式化程序



  "[vue]": {



    "editor.defaultFormatter": "esbenp.prettier-vscode"



  },



  "[json]": {



    "editor.defaultFormatter": "esbenp.prettier-vscode"



  },



  // 操作时作为单词分隔符的字符



  "editor.wordSeparators": "`~!@#%^&*()=+[{]}\\|;:'\",.<>/?",



  // 一个制表符等于的空格数



  "editor.tabSize": 2,



  // 行尾字符



  "files.eol": "\n",



  // 保存到额时候用使用 prettier进行格式化



  "editor.formatOnSave": true,



  // css文件忽略警告



  "css.lint.unknownAtRules": "ignore",



}
```

在项目根目录下新建.prettierrc文件，填入配置

```javascript
{



  "semi": true,



  "singleQuote": true,



  "useTabs": true,



  "tabWidth": 2,



  "printWidth": 80,



  "trailingComma": "none"



}
```

● semi：语句末尾是否要加分号，默认值 true
● singleQuote：使用单引号还是双引号，选择 true，使用单引号
● useTabs：使用 tab 缩进
● tabWidth：tab 是空格的情况下，是几个空格
● printWidth：当行字符的长度
● trailingComma：在多行输入的尾逗号是否添加，设置为 none

在项目的根目录下新建 .prettierignore 忽略文件

```javascript
/dist/*



.local



.output.js



/node_modules/**







**/*.svg



**/*.sh







/public/*
```

在 .eslintrc.cjs 文件中配置规则，关闭 prettier 的警告

```javascript
/* eslint-env node */



require("@rushstack/eslint-patch/modern-module-resolution");



 



module.exports = {



  rules:{



    "prettier/prettier":"off",



  }



}
```

现在，项目源码里的vue、ts、json文件在保存时都会自动格式化了

## 安装Ant Design of Vue 3

为了能够自定义ant的默认样式，需要使用官方提供的 less 样式入口文件，所以先安装less

```javascript
pnpm add less -D
```

然后安装ant-design-vue3和@ant-design/icons-vue图标库

```javascript
pnpm add ant-design-vue @ant-design/icons-vue
```

按照官方的文档，可以选择全局引入ant或者局部引入。

全局引入使用时很方便，无需import单个组件，但是打包时会把没有使用的组件也打包，体积会变大

局部引入需要在使用组件时手动引入单个组件以及它的样式，有个插件叫 [unplugin-vue-components](https://github.com/antfu/unplugin-vue-components)配合vite可以自动帮我们引入组件，来安装它吧

```javascript
pnpm add unplugin-vue-components -D
```

打开项目根目录下vite的生成的vite.config.ts文件，引入unplugin-vue-components插件

```javascript
/* vite.config.ts */



import { defineConfig } from 'vite';



import vue from '@vitejs/plugin-vue';



 



import Components from 'unplugin-vue-components/vite';



import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';



 



// https://vitejs.dev/config/



export default defineConfig({



	plugins: [



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



		})



	],



	css: {



		preprocessorOptions: {



			less: {



				javascriptEnabled: true // 必须开启，不然ant的样式库引入时会报错



			}



		}



	}



});
```

在./src/assets/目录下新建global.less文件，引入ant全局样式文件，并且可以重写全局样式

```javascript
/* global.less */



@import "ant-design-vue/dist/antd.less"; // 引入官方提供的 less 样式入口文件



 



// 以下下内容用于覆盖上面定义的变量



// @primary-color: #1da57a; // 自定义全局主色



// @link-color: #535bf2; // 自定义链接色



 
```

打开./src/App.vue，修改默认生成的代码，引入global.less

```javascript
<script setup lang="ts">



import { message } from 'ant-design-vue'; //非组件模块，需手动引入后可用



 



const info = () => {



	message.info('This is a normal message');



};



</script>



 



<template>



	<div>



		<!-- 该自定义组件在src/components目录下，会自动引入 -->



		<HelloWorld :msg="'HelloWorld'" />



 



		<!-- ant的按钮组件，会自动引入 -->



		<a-button class="mt-2 mx-2" type="primary" @click="info">



			Display normal message



		</a-button>



		<a-button type="primary" ghost>111</a-button>



	</div>



</template>



 



<style lang="less">



@import './assets/global.less';



</style>
```

由于ant组件库是通过插件来按需引入的，所以此时vscode工具无法提供ant的语法提示，我们需要打开根目录下的tsconfig.json文件，在 tsconfig 的 types 项下添加 **ant-design-vue/typings/global** 即可提供组件的类型声明，没有引入也有组件类型提示

```javascript
/* tsconfig.json */



 



{



  "compilerOptions": {



    "target": "ESNext",



    "useDefineForClassFields": true,



    "module": "ESNext",



    "moduleResolution": "Node",



    "strict": true,



    "jsx": "preserve",



    "sourceMap": true,



    "resolveJsonModule": true,



    "isolatedModules": true,



    "esModuleInterop": true,



    "lib": ["ESNext", "DOM"],



    "skipLibCheck": true,



    "types":["ant-design-vue/typings/global"]



  },



  "include": ["src/**/*.ts", "src/**/*.d.ts", "src/**/*.tsx", "src/**/*.vue","./components.d.ts"],



  "references": [{ "path": "./tsconfig.node.json" }]



}
```

这时使用antdv的组件时就会有代码提示了

## 安装 Tailwind CSS v3

目前还没有中文文档，参考：https://tailwindcss.com/docs/guides/vite

为何使用v3版本，因为v3版本提供了自定义样式功能，长宽度颜色都可以自定义，2版本时只能使用固定的样式，自定义样式需要在配置文件里写

开始安装

```javascript
pnpm add -D tailwindcss postcss autoprefixer
```

生成配置文件

```javascript
pnpm dlx tailwindcss init -p
```

执行命令后根目录下生成了`tailwind.config.js和``postcss.config.js`.文件

打开并修改tailwind.config.js

```javascript
/** @type {import('tailwindcss').Config} */



module.exports = {



  content: [



    "./index.html",



    "./src/**/*.{vue,js,ts,jsx,tsx}",



  ],



  theme: {



    extend: {},



  },



  plugins: [],



  corePlugins: {



    preflight: false, // 禁止tailwindcss的默认属性base，防止和ant design vue的样式产生冲突



  }



}
```

在./src目录下新建main.css文件，填入

```javascript
@tailwind base;



 



/* 重写基本SVG样式以使用Ant Design 图标*/



svg {



  vertical-align: initial;



}



 



@tailwind components;



@tailwind utilities;
```

在./src/main.ts文件中引入main.css文件

```javascript
import { createApp } from 'vue';



import App from './App.vue';



 



import './main.css';



 



const app = createApp(App);



 



app.mount('#app');
```

重启服务并刷新页面，现在已经可以使用Tailwind 的语法了

官方提供了vscode的语法提示插件Tailwind CSS IntelliSense，可以在扩展里搜索安装，安装后就会有Tailwind 的语法提示了，如果开发工具使用的是webstrom的话，工具版本和tailwind css版本需要对应才会有语法提示，个人测试发现webstorm2022.1版本对应的tailwind css版本最高是v3.1.8，如果使用webstorm时发现没有语法提示可以降低tailwind css版本试试。

## 配置文件引用别名

首先需要安装@types/node模块

```sql
pnpm add @types/node -D
```

打开vite.config.ts，在defineConfig中增加resolve.alias配置

```javascript
import { defineConfig } from 'vite';



import vue from '@vitejs/plugin-vue';



import { resolve } from 'path';



 



import Components from 'unplugin-vue-components/vite';



import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';



 



// https://vitejs.dev/config/



export default defineConfig({



	resolve: {



		alias: [



			{



				find: /\/@\//,



				replacement: resolve(process.cwd(), '.', 'src') + '/'



			}



		]



	},



	plugins: [



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



		})



	],



	css: {



		preprocessorOptions: {



			less: {



				javascriptEnabled: true // 必须开启，不然ant的样式库引入时会报错



			}



		}



	}



});
```

然后打开tsconfig.json文件，在compilerOptions中添加baseUrl和paths

```javascript
{



    "compilerOptions": {



        ...



        "types":["ant-design-vue/typings/global", "node"], // 加载的声明文件包



        "baseUrl": ".",



        "paths": {



              "/@/*": ["src/*"],



        }



    },



    ...



}
```

现在在vue文件和ts文件中导入模块时就可以使用下面的方式了

```javascript
// /@/会被自动替换成 根目录/src/



import name from '/@/...'
```

## 配置jsx、legacy和PurgeIcons

安装下面的依赖插件

```javascript
pnpm add -D @vitejs/plugin-legacy @vitejs/plugin-vue-jsx terser vite-plugin-purge-icons
```

将安装的插件添加vite.config.ts里面，具体作用请看注释

```javascript
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



				find: /\/@\//,



				replacement: resolve(process.cwd(), '.', 'src') + '/'



			}



		]



	},



	plugins: [



		vue(),



		vueJsx(),



		// 提供传统浏览器兼容性支持，注意由于vue3本身不在支持ie11及以下版本，所以加了这个也不能在ie11中运行vue3项目



		legacy(),



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
```
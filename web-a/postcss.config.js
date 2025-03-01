export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
  corePlugins: {
    preflight: false, // 禁止tailwindcss的默认属性base，防止和ant design vue的样式产生冲突
  },
}

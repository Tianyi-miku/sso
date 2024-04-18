const { defineConfig } = require("@vue/cli-service");
const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  chainWebpack: (config) => {
    config.resolve.alias
      .set("@", resolve("src"))
  },
  devServer: {
    host: "0.0.0.0",
    port: 8000,
    proxy: {
      "/api": {
        pathRewrite: { "^/api": "" },
        target: `http://localhost:3000/`,
        ws: false,
        changeOrigin: true,
      },
    },
  },
});

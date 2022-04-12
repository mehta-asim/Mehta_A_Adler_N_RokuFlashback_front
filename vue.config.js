// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true
// })

const API_URL = "http://127.0.0.1:8000/roku_api"

const BASE_URL = "http://127.0.0.1:3000";
const UMS_PATH = "/users";

module.exports = {
  css: {
    loaderOptions: {
      sass: {
        data: `
          @import "@/assets/sass/vars.scss";
          @import "@/assets/sass/reset.scss";
          @import "@/assets/sass/main.scss";
        `
      }
    }
  },

  devServer: {
    proxy:{
      'users':{
      target: `${BASE_URL + UMS_PATH}`,
      changeOrigin: true,
      pathRewrite: { '^/users' : '' },
      },

      'roku_api': {
        target: `${API_URL}`,
        changeOrigin: true,
        pathRewrite: {'^/roku_api': ''},
      },
    }
  }

};
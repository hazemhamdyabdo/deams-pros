// const { defineConfig } = require('@vue/cli-service')

const path = require('path');
module.exports = {
  transpileDependencies: ['vuetify'],
  lintOnSave:false,
  publicPath:"/",
  configureWebpack: {
    resolve: {
      alias: {
        '@/': path.resolve(__dirname, 'src'),
        '@core': path.resolve(__dirname, 'src/@core'),
        '@validations': path.resolve(__dirname,'src/@core/utils/validations/validations.js'),
        '@axios': path.resolve(__dirname, 'src/libs/axios'),
      },
    },
  },
}


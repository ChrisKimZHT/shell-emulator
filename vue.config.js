const { defineConfig } = require('@vue/cli-service')
const { version } = require('./package.json')

module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].appVersion = version
      return args
    })
  },
  configureWebpack: {
    resolve: {
      fallback: {
        path: require.resolve("path-browserify"),
      }
    }
  }
})

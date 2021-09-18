var path = require('path')
function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  devServer: {
    port: 9090 // 此处修改你想要的端口号，
  },
  publicPath: process.env.NODE_ENV === 'development'
    ? '/'
    : './',
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('static', resolve('static'))
  },
  configureWebpack: {
    externals: {
      'BMap': 'BMap'
    }
  }
}

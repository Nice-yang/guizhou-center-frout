module.exports = {
    publicPath:'./',
    // 输出文件目录
    outputDir: 'dist',
    // 静态资源目录
    assetsDir: './static',
    devServer: {
        port: 8085, // 端口号
        host: "localhost",
        https: false, // https:{type:Boolean}
        open: true, //配置自动启动浏览器
        // proxy: 'http://localhost:4000' // 配置跨域处理,只有一个代理
        proxy: {
          "/api": {
            target: "<url>",
            ws: true,
            changeOrigin: true
          },
          "/foo": {
            target: "<other_url>"
          }
        }, // 配置多个代理
       
      },
      lintOnSave: false // 关闭eslint代码检查
}
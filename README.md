# project-name

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```

### Run your tests
```
yarn run test
```

### Lints and fixes files
```
yarn run lint
```



###Vue-cli3目录结构
```javascript
|-- src                              // 源码目录
|  |-- components                  // vue公共组件
|  |-- router                      // vue的路由管理
|  |-- App.vue                      // 页面入口文件
|  |-- main.js                      // 程序入口文件，加载各种公共组件
|-- public                          // 静态文件，比如一些图片，json数据等
|  |-- favicon.ico                      // 图标文件
|  |-- index.html                      // 入口页面
|-- vue.config.js                          // 是一个可选的配置文件，包含了大部分的vue项目配置
|-- .babelrc                        // ES6语法编译配置
|-- .editorconfig                    // 定义代码格式
|-- .gitignore                      // git上传需要忽略的文件格式
|-- .postcsssrc                      // postcss配置文件
|-- README.md                        // 项目说明
|-- package.json                    // 项目基本信息,包依赖信息等


│  .browserslistrc
│  .gitignore
│  .postcssrc.js // postcss 配置
│  babel.config.js
│  package.json // 依赖
│  README.md // 项目 readme
│  tsconfig.json // ts 配置
│  tslint.json // tslint 配置
│  vue.config.js // webpack 配置（~自己新建~）
│  yarn.lock
│  
├─public // 静态页面
│  │—favicon.ico
│  │—index.html
│ 
├─src // 主目录
│  ├─assets // 静态资源
│  │      logo.png
│  │  
│  ├─components
│  │      HelloWorld.vue
│  │ 
│  │─views // 页面
│  │      About.vue
│  │      Home.vue
│  │ 
│  │  App.vue // 页面主入口
│  │ 
│  │  main.ts // 脚本主入口
│  │ 
│  ├─router // 路由配置
│  │      index.ts
│  │  
│  │  registerServiceWorker.ts // PWA 配置
│  │ 
│  │  shims-tsx.d.ts
│  │  shims-vue.d.ts
│  │         
│  │  
│  ├─store // vuex 配置
│  │      index.ts
│  │      
│  ├─typings // 全局注入（~自己新建~）
│  │  
│  ├─utils // 工具方法(axios封装，全局方法等)（~自己新建~）
│  
│          
└─tests // 测试用例
    ├─e2e
    │  ├─plugins
    │  │      index.js
    │  │      
    │  ├─specs
    │  │      test.js
    │  │      
    │  └─support
    │          commands.js
    │          index.js
    │          
    └─unit
            HelloWorld.spec.ts
### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

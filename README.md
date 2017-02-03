# todoApp


####项目技术介绍
1.该工程托管于github上 <https://github.com/KelWenGek/todoApp.git>,<br/>克隆下来之后,`npm install`安装依赖,再执行`npm run dev-todo`,打开浏览器`localhost:8080`
2.利用node的环境变量配置,将webpack开发模式和生产模式的配置文件合并到一起,<br/>通过`process.env.npm_lifecycle_event`来判断当前是什么命令模式,<br/>例如`dev-todo`意味`todo`工程目录下的`dev`开发模式,<br/>例如`build-todo`意味`todo`工程目录下的`build`生产模式

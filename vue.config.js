module.exports = {


    publicPath: process.env.NODE_ENV === 'production'
        ? '/admin/'   // /app/mall/ 对应后面`nginx`路径，这里添加的目的是其他静态资源文件统一前缀路径
        : '/',
    devServer:{
        port:8081
    }

};

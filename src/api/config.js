import axios from 'axios';
let node_base_url;
if (process.env.NODE_ENV == 'development') {
  // node_base_url = 'http://localhost:32557/api';
    node_base_url = 'http://云主机ip:8080/api';
} else {
  //node_base_url = 'http://www.huiazir.com:9001/api';
  // node_base_url = 'http://localhost:32557/api';
    node_base_url = 'http://云主机ip:8080/api';
}

let server = axios.create({
    //todo
  // baseURL: 'http://localhost:32557/QRCodeMall', //请求url
    baseURL : 'http://云主机ip:8080/QRCodeMall',
  timeout: 5000, //超时处理
  withCredentials: true //是否跨域
});
let tcvod_server = axios.create({
  baseURL: node_base_url, //请求url
  timeout: 5000, //超时处理
  withCredentials: true //是否跨域
});
//添加一个请求拦截器
server.interceptors.request.use(
  function(config) {
    //在请求发出之前进行一些操作，比如请求头携带内容
    config.headers['Content-Type'] = 'application/json;charset=UTF-8';
    config.headers['Cache-Control'] = 'no-cache';
    return config;
  },
  function(error) {
    //Do something with request error
    return error;
  }
);

export { server, tcvod_server, axios };

  /**
   *  created by 太虚 on 2019/7/11
   *  这是项目中唯一的注释
   *  yarn add axios qs elementui  
   */
  // 引入axios 和 qs
  import axios from "axios";
  import qs from "qs";
  import local from "@/utils/local";  //本地存储提取
  import { Message } from "element-ui";

  // 服务器地址 写上以后 所有的请求 会自动在前面拼接这个地址
  axios.defaults.baseURL = "连接";
  axios.defaults.timeout = 5000; // 超时

  /**
   *  请求拦截：  请求拦截 就是在发送请求出去之前 拦截  
   *  主要用于token拦截
   */
  axios.interceptors.request.use((config) => {

    let token = local.get("存入的token键名") || ""; // 取出本地token
    if (token) {
      config.headers.Authorization = token; // 统一在请求头携带token
    }
    return config;
  });

  /**
   * 响应拦截： 后端响应数据之后 先拦截下来 可以进行某些处理 再接收
   */
  axios.interceptors.response.use((response) => {
    // 如果有code 和 message
    if (response.data.code !== undefined && response.data.msg !== undefined) {
      let { code, msg } = response.data; // 取出code 和 msg

      if (code === 0) {
        // 成功
        Message({ type: "success", message: msg });
      } else if (code === 1) {
        // 失败
        Message.error(msg);
      }
    }

    return response;
  });

  // 通用的get请求和post请求
  export default {
    get(url, params = {}) {
      return new Promise((resolve, reject) => {
        axios
          .get(url, { params })
          .then((response) => {
            resolve(response.data); // 成功
          })
          .catch((err) => {
            reject(err); // 失败
          });
      });
    },
    post(url, params = {}) {
      return new Promise((resolve, reject) => {
        axios
          .post(url, qs.stringify(params))
          .then((response) => {
            resolve(response.data); // 成功
          })
          .catch((err) => {
            reject(err); // 失败
          });
      });
    },
  };

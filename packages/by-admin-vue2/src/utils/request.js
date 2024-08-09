import axios from 'axios';

const instance = axios.create({
  timeout: 3 * 1000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 请求拦截器
instance.interceptors.request.use(
    config => {

      config.headers['token'] = 'asdasd'

      return config
    },
    error => {
      return Promise.reject(error)
    }
)

// 响应拦截器
instance.interceptors.response.use(
    response => {
      return response.data
    },
    error => {
      return Promise.reject(error)
    }
)

export default instance

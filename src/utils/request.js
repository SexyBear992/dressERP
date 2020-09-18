import axios from 'axios'
// import Cookie from 'js-cookie'

// 跨域认证信息 header 名
// const xsrfHeaderName = 'Authorization'

axios.defaults.timeout = 5000
// axios.defaults.withCredentials= true //cookie时候需要的
// axios.defaults.xsrfHeaderName= xsrfHeaderName
// axios.defaults.xsrfCookieName= xsrfHeaderName
// axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
// axios.defaults.headers.get['Content-Type'] = 'application/json;charset=UTF-8'


// http method
const METHOD = {
  GET: 'get',
  POST: 'post',
  DELETE: 'delete',
  PUT: 'put'
}

/**
 * axios请求
 * @param url 请求地址
 * @param method {METHOD} http method
 * @param params 请求参数
 * @returns {Promise<AxiosResponse<T>>}
 */
async function request(url, method, params) {
  switch (method) {
    case METHOD.GET:
      return axios.get(url, {params})
    case METHOD.POST:
      return axios.post(url, params)
    case METHOD.DELETE:
      return axios.delete(url, { params })  
    case METHOD.PUT:
      return axios.put(url, params)
    default:
      return axios.get(url, {params})
  }
}

/**
 * 设置ticket
 */
function setTicket(data) {
  localStorage.setItem('ticket',data)
}

/**
 * 移出ticket
 */
function removeTicket() {
  localStorage.removeItem('ticket')
}

/**
  * 查看ticket
 */
function checkTicket() {
  const localSettingStr = localStorage.getItem('ticket')
  return localSettingStr
}

/**
 * 加载 axios 拦截器
 * @param interceptors
 * @param options
 */
function loadInterceptors(interceptors, options) {
  const {request, response} = interceptors
  // 加载请求拦截器
  request.forEach(item => {
    console.log('加载请求拦截器')
    let {onFulfilled, onRejected} = item
    if (!onFulfilled || typeof onFulfilled !== 'function') {
      onFulfilled = config => config
    }
    if (!onRejected || typeof onRejected !== 'function') {
      onRejected = error => Promise.reject(error)
    }
    axios.interceptors.request.use(
      config => onFulfilled(config, options),
      error => onRejected(error, options)
    )
  })
  // 加载响应拦截器
  response.forEach(item => {
    console.log('加载响应拦截器')
    let {onFulfilled, onRejected} = item
    if (!onFulfilled || typeof onFulfilled !== 'function') {
      onFulfilled = response => response
    }
    if (!onRejected || typeof onRejected !== 'function') {
      onRejected = error => Promise.reject(error)
    }
    axios.interceptors.response.use(
      response => onFulfilled(response, options),
      error => onRejected(error, options)
    )
  })
}

export {
  METHOD,
  request,
  setTicket,
  removeTicket,
  checkTicket,
  loadInterceptors
}

import axios from 'axios';
import { appConstant, TOKEN_KEY } from '../constant/app-constant';

const SIGNIN_API = "/api/users/signin"

// for heroku api
export const myAxios = axios.create({
  baseURL: appConstant.URL,
  timeout: 10000
})

const refreshAxios = axios.create({
  baseURL: appConstant.URL,
  timeout: 10000
})

// for ssg callout
export const ssgAxios = axios.create({
  baseURL: appConstant.URL,
  timeout: 10000
})

// for mock internal api
export const otherAxios = axios.create({
  timeout: 10000
})

export const getUrl = (): string => {
  return `${document.location.origin}${appConstant.CONTEXT_PATH}`
}

myAxios.interceptors.request.use(config => {
  console.log(config.url)
  const token = localStorage.getItem(TOKEN_KEY)
  config.headers!!["Authorization"] = `Bearer ${token}`
  return config
}, (error) => {
  console.log("intercepted error req")
})

// Implementation sample of refresh-token with axios from `https://www.bezkoder.com/react-refresh-token/`
myAxios.interceptors.response.use(
  response => response
  , async (err) => {
    // Refresh token is not needed right now
    // const originalConfig = err.config // as AxiosRequestConfig
    // if (err.response && originalConfig.url !== SIGNIN_API) {
    //   if (err.response.status === 401 && !originalConfig._retry) {
    //     originalConfig._retry = true;
    //     try {
    //       const refreshToken = localStorage.getItem("b-token")
    //       const resp = await refreshAxios.post<IResponseEntity<string>>('/api/auth/refresh-token', { refreshToken })
    //       const newAccessToken = resp.data.data

    //       localStorage.setItem("a-token", newAccessToken)
    //       return myAxios(originalConfig)
    //     } catch (_err) {
    //       localStorage.clear()
    //       document.location.href = "/"
    //       return Promise.reject(_err)
    //     }
    //   }
    // }
    return Promise.reject(err)
  })

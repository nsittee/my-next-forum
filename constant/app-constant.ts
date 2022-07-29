// const appConstant = {
//   URL: process.env.REACT_APP_URL,
//   ENV: process.env.REACT_APP_ENV,
// }

export const appConstant = {
  URL: process.env.BACKEND_URL ? process.env.BACKEND_URL : "",
  ENV: process.env.ENVIRONMENT ? process.env.ENVIRONMENT : "",
}

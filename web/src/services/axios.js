import axios from 'axios'
import createAuthRefreshInterceptor from 'axios-auth-refresh'

export const instance = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? 'http://localhost/api/' : 'http://localhost:8081/'
})

instance.interceptors.request.use(function (config) {
  config.headers.Authorization = getAccessToken()
  return config
})

export const authInstance = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? 'http://localhost/authApi/' : 'http://localhost:8082/'
})

authInstance.interceptors.request.use(function (config) {
  config.headers.Authorization = getAccessToken()
  return config
})

const refreshAuthLogic = failedRequest => authInstance.post('/auth/grantNewAccessToken', getRefreshTokenInfo())
  .then(tokenRefresh => {
    const newToken = tokenRefresh.data.token
    localStorage.setItem('token', newToken)

    return Promise.resolve()
  })

function getRefreshTokenInfo () {
  return {
    _id: localStorage.getItem('userId'),
    refreshToken: localStorage.getItem('refreshToken')
  }
}

function getAccessToken () {
  let token = localStorage.getItem('token')
  return token
}

createAuthRefreshInterceptor(instance, refreshAuthLogic)
createAuthRefreshInterceptor(authInstance, refreshAuthLogic)

import axios from 'axios'
import createAuthRefreshInterceptor from 'axios-auth-refresh'

export const instance = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? 'http://localhost/api/' : 'http://localhost:8081/'
})

instance.defaults.headers.common['authorization'] = getAccessToken()

export const authInstance = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? 'http://localhost/authApi/' : 'http://localhost:8082/'
})

authInstance.defaults.headers.common['authorization'] = getAccessToken()

const refreshAuthLogic = failedRequest => authInstance.post('/auth/grantNewAccessToken', getRefreshTokenInfo())
  .then(tokenRefresh => {
    const newToken = tokenRefresh.data.token
    localStorage.setItem('token', newToken)

    failedRequest.response.config.headers['authorization'] = getAccessToken()
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

// createAuthRefreshInterceptor(instance, refreshAuthLogic)
createAuthRefreshInterceptor(authInstance, refreshAuthLogic)

import request from '@/utils/request'

export function login(data) {
  return request({
    url: 'http://127.0.0.1:9000/api-jwt-login/',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

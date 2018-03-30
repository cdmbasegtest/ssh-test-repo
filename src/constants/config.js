export const APP_ENV = process.env.NODE_ENV

export const api = {
  url:
    APP_ENV === 'production'
      ? 'https://pivot-backend-api.herokuapp.com/api/v1'
      : 'https://pivot-backend-api.herokuapp.com/api/v1'
}

export const domain = {
  development:
    typeof global.__PORT__ === 'undefined'
      ? 'http://localhost'
      : `http://localhost:${global.__PORT__}`,
  production: 'https://pivot-desktop.herokuapp.com'
}[APP_ENV]

export const auth0 = {
  domain: 'pivot.auth0.com',
  clientId: 'sLjDBcT9leckXjAN3ZFdu29N7bw7sQj3',
  audience: 'https://pivot-backend-api.herokuapp.com'
}

export const cookie = {
  sharedDomain: {
    production: '.pivot-backend-api.herokuapp.com'
  }[process.env.NODE_ENV],
  prefix: 'workaxle'
}

export const pusher = {
  token: 'b046ea6fb474adf1aa07',
  options: {
    authEndpoint: `${api.url}/pusher/auth`,
    encrypted: true
  }
}

export default {
  APP_ENV,
  cookie,
  api,
  auth0,
  domain,
  pusher
}

export const api = "http://localhost:5000/api"
export const uploads = "http://localhost:5000/uploads"

export const requestConfig = (method, data, token = null) => {
  let config 

  if(token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
}
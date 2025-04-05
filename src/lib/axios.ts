import axios from 'axios'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json',
  },
  // クッキーをリクエストに含めて送信
  withCredentials: true,
})

export default api

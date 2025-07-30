import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { MMKV } from 'react-native-mmkv'
import NetInfo from '@react-native-community/netinfo'

// API Configuration
const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000/api'

// Initialize MMKV storage
export const storage = new MMKV({
  id: 'app-storage',
  // Optional: encrypt the storage
  // encryptionKey: 'your-encryption-key'
})

interface ApiResponse<T = any> {
  data: T
  message?: string
  error?: string
}

interface ApiError {
  message: string
  status?: number
}

class ApiClient {
  private client: AxiosInstance
  private baseURL: string

  constructor(baseURL: string) {
    this.baseURL = baseURL
    this.client = axios.create({
      baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    this.setupInterceptors()
  }

  private setupInterceptors() {
    // Request interceptor
    this.client.interceptors.request.use(
      async (config) => {
        // Add auth token if available
        const token = storage.getString('auth_token')
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    // Response interceptor
    this.client.interceptors.response.use(
      (response: AxiosResponse) => {
        return response
      },
      async (error) => {
        if (error.response?.status === 401) {
          // Handle unauthorized - clear token and redirect to login
          storage.delete('auth_token')
          // You can dispatch a logout action here if using Redux/Zustand
        }
        return Promise.reject(error)
      }
    )
  }

  // Generic GET method
  async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.client.get<T>(url, config)
  }

  // Generic POST method
  async post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.client.post<T>(url, data, config)
  }

  // Generic PUT method
  async put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.client.put<T>(url, data, config)
  }

  // Generic DELETE method
  async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.client.delete<T>(url, config)
  }

  // Check network connectivity
  async checkConnectivity(): Promise<boolean> {
    const netInfo = await NetInfo.fetch()
    return netInfo.isConnected ?? false
  }

  // Set auth token
  async setAuthToken(token: string): Promise<void> {
    storage.set('auth_token', token)
  }

  // Clear auth token
  async clearAuthToken(): Promise<void> {
    storage.delete('auth_token')
  }
}

// Create and export the API client instance
const apiClient = new ApiClient(API_BASE_URL)

export default apiClient 
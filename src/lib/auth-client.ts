import { useState, useEffect } from 'react'
import apiClient from './api/client'

// Types for authentication
export interface User {
  id: string
  name: string
  email: string
  image?: string
}

export interface Session {
  user: User
  expires: string
}

export interface AuthError {
  message: string
  type: string
}

// Custom authentication client for React Native
class AuthClient {
  private session: Session | null = null
  private listeners: Set<(session: Session | null) => void> = new Set()

  // Sign in with email and password
  async signIn(email: string, password: string): Promise<{ error?: AuthError }> {
    try {
      const response = await apiClient.post('/api/auth/signin', {
        email,
        password,
      })

      if (response.data.token) {
        await apiClient.setAuthToken(response.data.token)
        this.session = response.data.session
        this.notifyListeners()
        return {}
      } else {
        return { error: { message: 'Invalid credentials', type: 'CredentialsSignin' } }
      }
    } catch (error: any) {
      return {
        error: {
          message: error.response?.data?.message || 'Sign in failed',
          type: 'CredentialsSignin'
        }
      }
    }
  }

  // Sign out
  async signOut(): Promise<void> {
    try {
      await apiClient.post('/api/auth/signout')
    } catch (error) {
      console.error('Sign out error:', error)
    } finally {
      await apiClient.clearAuthToken()
      this.session = null
      this.notifyListeners()
    }
  }

  // Get current session
  async getSession(): Promise<Session | null> {
    if (this.session) {
      return this.session
    }

    try {
      const response = await apiClient.get('/api/auth/session')
      this.session = response.data
      return this.session
    } catch (error) {
      console.error('Get session error:', error)
      return null
    }
  }

  // Subscribe to session changes
  subscribe(listener: (session: Session | null) => void): () => void {
    this.listeners.add(listener)
    return () => this.listeners.delete(listener)
  }

  private notifyListeners() {
    this.listeners.forEach(listener => listener(this.session))
  }
}

// Create singleton instance
const authClient = new AuthClient()

// React hook for session
export function useSession() {
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    authClient.getSession().then(session => {
      setSession(session)
      setIsLoading(false)
    })

    // Subscribe to changes
    const unsubscribe = authClient.subscribe(setSession)
    return unsubscribe
  }, [])

  return { data: session, isLoading }
}

// Export auth functions
export const signIn = authClient.signIn.bind(authClient)
export const signOut = authClient.signOut.bind(authClient) 
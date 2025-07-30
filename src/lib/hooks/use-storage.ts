import { useState, useEffect } from 'react'
import { storage } from '@/lib/api/client'
import * as SecureStore from 'expo-secure-store'

export interface StorageOptions {
  secure?: boolean
  defaultValue?: any
}

export function useStorage<T = any>(
  key: string,
  options: StorageOptions = {}
): [T | null, (value: T | null) => void, boolean] {
  const [value, setValue] = useState<T | null>(options.defaultValue || null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadValue()
  }, [key])

  const loadValue = async () => {
    try {
      let storedValue: string | null = null

      if (options.secure) {
        storedValue = await SecureStore.getItemAsync(key)
      } else {
        storedValue = storage.getString(key)
      }

      if (storedValue !== null && storedValue !== undefined) {
        setValue(JSON.parse(storedValue))
      }
    } catch (error) {
      console.error('Error loading from storage:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateValue = async (newValue: T | null) => {
    try {
      if (newValue === null) {
        if (options.secure) {
          await SecureStore.deleteItemAsync(key)
        } else {
          storage.delete(key)
        }
      } else {
        const serializedValue = JSON.stringify(newValue)
        if (options.secure) {
          await SecureStore.setItemAsync(key, serializedValue)
        } else {
          storage.set(key, serializedValue)
        }
      }
      setValue(newValue)
    } catch (error) {
      console.error('Error saving to storage:', error)
    }
  }

  return [value, updateValue, loading]
}

export function useSecureStorage<T = any>(
  key: string,
  defaultValue?: T
): [T | null, (value: T | null) => Promise<void>, boolean] {
  return useStorage<T>(key, { secure: true, defaultValue })
}

export function useAsyncStorage<T = any>(
  key: string,
  defaultValue?: T
): [T | null, (value: T | null) => void, boolean] {
  return useStorage<T>(key, { secure: false, defaultValue })
} 
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { storage } from '@/lib/api/client'

interface FormState {
  [formId: string]: {
    values: Record<string, any>
    errors: Record<string, string>
    touched: Record<string, boolean>
    isSubmitting: boolean
    submitErrors: string[]
  }
}

interface FormActions {
  initializeForm: (formId: string, initialValues: Record<string, any>) => void
  setFieldValue: (formId: string, field: string, value: any) => void
  setFieldError: (formId: string, field: string, error: string) => void
  setFieldTouched: (formId: string, field: string, touched: boolean) => void
  setSubmitting: (formId: string, isSubmitting: boolean) => void
  setSubmitErrors: (formId: string, errors: string[]) => void
  clearSubmitErrors: (formId: string) => void
  resetForm: (formId: string) => void
  getFieldValue: (formId: string, field: string) => any
  getFieldError: (formId: string, field: string) => string | undefined
  isFieldTouched: (formId: string, field: string) => boolean
}

export const useFormStore = create<FormState & FormActions>()(
  devtools(
    persist(
      (set, get) => ({
        // Form state
        forms: {},

        // Actions
        initializeForm: (formId, initialValues) =>
          set((state) => ({
            [formId]: {
              values: initialValues,
              errors: {},
              touched: {},
              isSubmitting: false,
              submitErrors: [],
            },
          })),

        setFieldValue: (formId, field, value) =>
          set((state) => ({
            [formId]: {
              ...state[formId],
              values: {
                ...state[formId]?.values,
                [field]: value,
              },
            },
          })),

        setFieldError: (formId, field, error) =>
          set((state) => ({
            [formId]: {
              ...state[formId],
              errors: {
                ...state[formId]?.errors,
                [field]: error,
              },
            },
          })),

        setFieldTouched: (formId, field, touched) =>
          set((state) => ({
            [formId]: {
              ...state[formId],
              touched: {
                ...state[formId]?.touched,
                [field]: touched,
              },
            },
          })),

        setSubmitting: (formId, isSubmitting) =>
          set((state) => ({
            [formId]: {
              ...state[formId],
              isSubmitting,
            },
          })),

        setSubmitErrors: (formId, errors) =>
          set((state) => ({
            [formId]: {
              ...state[formId],
              submitErrors: errors,
            },
          })),

        clearSubmitErrors: (formId) =>
          set((state) => ({
            [formId]: {
              ...state[formId],
              submitErrors: [],
            },
          })),

        resetForm: (formId) =>
          set((state) => ({
            [formId]: {
              values: {},
              errors: {},
              touched: {},
              isSubmitting: false,
              submitErrors: [],
            },
          })),

        getFieldValue: (formId, field) => {
          const state = get()
          return state[formId]?.values?.[field]
        },

        getFieldError: (formId, field) => {
          const state = get()
          return state[formId]?.errors?.[field]
        },

        isFieldTouched: (formId, field) => {
          const state = get()
          return state[formId]?.touched?.[field] || false
        },
      }),
      {
        name: 'form-store',
        storage: {
          getItem: (name) => {
            const value = storage.getString(name)
            return value ? JSON.parse(value) : null
          },
          setItem: (name, value) => {
            storage.set(name, JSON.stringify(value))
          },
          removeItem: (name) => {
            storage.delete(name)
          },
        },
        partialize: (state) => ({
          forms: state.forms,
        }),
      }
    )
  )
) 
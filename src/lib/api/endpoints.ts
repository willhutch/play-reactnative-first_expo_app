// API endpoints configuration
// This file documents all API endpoints used by the React Native app
// Import and use these constants in data.ts to keep documentation in sync

export const API_ENDPOINTS = {
  // Revenue endpoints
  REVENUE: '/api/revenue',
  
  // Invoice endpoints
  INVOICES: '/api/invoices',
  INVOICES_LATEST: '/api/invoices/latest',
  INVOICES_COUNT: '/api/invoices/count',
  INVOICES_STATUS_SUMMARY: '/api/invoices/status-summary',
  INVOICE_BY_ID: (id: string) => `/api/invoices/${id}`,
  
  // Customer endpoints
  CUSTOMERS: '/api/customers',
  CUSTOMERS_FILTERED: '/api/customers/filtered',
  CUSTOMERS_COUNT: '/api/customers/count',
  
  // Auth endpoints
  AUTH_SIGNIN: '/api/auth/signin',
  AUTH_SIGNOUT: '/api/auth/signout',
  AUTH_SESSION: '/api/auth/session',
} as const;

// Type for endpoint keys (for type safety)
export type EndpointKey = keyof typeof API_ENDPOINTS; 
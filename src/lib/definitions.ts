export type Revenue = {
  month: string;
  revenue: number;
};

export type LatestInvoice = {
  id: string;
  name: string;
  email: string;
  amount: string;
};

// The database returns a number for amount, but we later format it to a string with the currency symbol
export type LatestInvoiceRaw = Omit<LatestInvoice, 'amount'> & {
  amount: number;
  image_url: string;
};

export const statuses = [
  {
    value: 'pending',
    label: 'Pending',
  },
  {
    value: 'paid',
    label: 'Paid',
  },
] as const;

export const priorities = [
  {
    label: 'Low',
    value: 'low',
  },
  {
    label: 'Medium',
    value: 'medium',
  },
  {
    label: 'High',
    value: 'high',
  },
] as const;

export type Status = (typeof statuses)[number]['value'];
export type Priority = (typeof priorities)[number]['value'];

export type Task = {
  id: string;
  title: string;
  status: Status;
  priority: Priority;
  label: string;
};

export type Customer = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: string;
  total_paid: string;
};

export type Invoice = {
  id: string;
  customer_id: string;
  amount: number;
  status: 'pending' | 'paid';
  date: string;
};

export type CustomerField = {
  id: string;
  name: string;
  email: string;
  image_url: string;
};

export type InvoiceForm = {
  id: string;
  customer_id: string;
  amount: number;
  status: 'pending' | 'paid';
};

export type User = {
  id: string;
  name: string;
  email: string;
  image_url: string;
};

export type UserTable = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: number;
  total_paid: number;
};

// Additional types for the dashboard
export type InvoicesTable = {
  id: string;
  amount: number;
  date: string;
  status: 'pending' | 'paid';
  name: string;
  email: string;
  image_url: string;
};

export type CustomersTableType = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: number;
  total_paid: number;
}; 
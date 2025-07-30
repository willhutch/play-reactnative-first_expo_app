import {
  CustomerField,
  CustomersTableType,
  InvoiceForm,
  InvoicesTable,
  LatestInvoiceRaw,
  Revenue,
} from './definitions';
import { formatCurrency } from './utils';
import apiClient from './api/client';
import { API_ENDPOINTS } from './api/endpoints';

export async function fetchRevenue() {
  try {
    // Artificially delay a response for demo purposes.
    // Don't do this in production :)
    console.log('Fetching revenue data...');
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // Real API call to your Next.js backend
    const response = await apiClient.get<Revenue[]>(API_ENDPOINTS.REVENUE);
    console.log('Data fetch completed after 3 seconds.');
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

export async function fetchLatestInvoices() {
  try {
    // Real API call to your Next.js backend
    const response = await apiClient.get<LatestInvoiceRaw[]>(API_ENDPOINTS.INVOICES_LATEST);
    const data = response.data;

    const latestInvoices = data.map((invoice: LatestInvoiceRaw) => ({
      ...invoice,
      amount: formatCurrency(invoice.amount),
    }));
    return latestInvoices;
  } catch (error) {
    console.error('API Error:', error);
    throw new Error('Failed to fetch the latest invoices.');
  }
}

export async function fetchCardData() {
  try {
    // Real API calls to your Next.js backend
    const [invoiceCount, customerCount, invoiceStatus] = await Promise.all([
      apiClient.get(API_ENDPOINTS.INVOICES_COUNT),
      apiClient.get(API_ENDPOINTS.CUSTOMERS_COUNT),
      apiClient.get(API_ENDPOINTS.INVOICES_STATUS_SUMMARY),
    ]);

    const numberOfInvoices = Number(invoiceCount.data.count ?? '0');
    const numberOfCustomers = Number(customerCount.data.count ?? '0');
    const totalPaidInvoices = formatCurrency(invoiceStatus.data.paid ?? '0');
    const totalPendingInvoices = formatCurrency(invoiceStatus.data.pending ?? '0');

    return {
      numberOfCustomers,
      numberOfInvoices,
      totalPaidInvoices,
      totalPendingInvoices,
    };
  } catch (error) {
    console.error('API Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredInvoices(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    // Real API call to your Next.js backend
    const response = await apiClient.get<InvoicesTable[]>(API_ENDPOINTS.INVOICES, {
      params: { 
        query, 
        page: currentPage, 
        limit: ITEMS_PER_PAGE,
        offset 
      }
    });
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw new Error('Failed to fetch invoices.');
  }
}

export async function fetchInvoicesPages(query: string) {
  try {
    // Real API call to your Next.js backend
    const response = await apiClient.get(API_ENDPOINTS.INVOICES_COUNT, {
      params: { query }
    });
    const totalInvoices = response.data.count;
    const totalPages = Math.ceil(totalInvoices / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('API Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
}

export async function fetchInvoiceById(id: string) {
  try {
    // Real API call to your Next.js backend
    const response = await apiClient.get<InvoiceForm>(API_ENDPOINTS.INVOICE_BY_ID(id));
    const invoice = response.data;
    return { ...invoice, amount: invoice.amount / 100 };
  } catch (error) {
    console.error('API Error:', error);
    throw new Error('Failed to fetch invoice.');
  }
}

export async function fetchCustomers() {
  try {
    // Real API call to your Next.js backend
    const response = await apiClient.get<CustomerField[]>(API_ENDPOINTS.CUSTOMERS);
    return response.data;
  } catch (err) {
    console.error('API Error:', err);
    throw new Error('Failed to fetch all customers.');
  }
}

export async function fetchFilteredCustomers(query: string) {
  try {
    // Real API call to your Next.js backend
    const response = await apiClient.get<CustomersTableType[]>(API_ENDPOINTS.CUSTOMERS_FILTERED, {
      params: { query }
    });
    const data = response.data;

    const customers = data.map((customer: CustomersTableType) => ({
      ...customer,
      total_pending: formatCurrency(customer.total_pending),
      total_paid: formatCurrency(customer.total_paid),
    }));

    return customers;
  } catch (err) {
    console.error('API Error:', err);
    throw new Error('Failed to fetch customer table.');
  }
} 
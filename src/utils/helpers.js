// Shared utility functions used across components

// Format number as USD currency
export const usd = (n) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n);

// Get discounted price from original price and discount %
export const discountedPrice = (price, pct) =>
  parseFloat((price - (price * pct) / 100).toFixed(2));

// Truncate long strings with ellipsis
export const truncate = (str = '', len = 55) =>
  str.length > len ? str.slice(0, len) + '…' : str;

// Round rating to nearest 0.5
export const roundRating = (r) => Math.round(r * 2) / 2;

// Convert rating number to star string display
export const starsOf = (r) => {
  const full = Math.floor(r);
  const half = r % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(empty);
};

// Bootstrap badge color per order status
export const statusColor = (s) =>
  ({ pending: 'warning', processing: 'info', shipped: 'primary', delivered: 'success', cancelled: 'danger' }[s] || 'secondary');

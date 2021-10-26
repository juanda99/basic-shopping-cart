export  const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export const currencyToNumber =  (currency: string): number => Number(currency.replace(/[^0-9\.-]+/g,""));
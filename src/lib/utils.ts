export const formatCurrency = (value?: number) => {
  if (value === undefined || value === null || Number.isNaN(value)) {
    return "-";
  }
  return `$${value.toFixed(2)}`;
};

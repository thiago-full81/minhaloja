export function formatCurrency(cents: number): string {
  return (cents / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export function toCents(amount: number): number {
  return Math.round(amount * 100);
}

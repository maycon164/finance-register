export function formatDate(date: Date) {
  return date.toLocaleDateString("pt-BR");
}

export function formatToBRL(value: number) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export function formatMoney(value: number, currency: string) {
  // En móvil a veces JS fuerza el prefijo "COP ". 
  // Lo formateamos explícitamente a un formato más limpio: "$ 890.000"
  const formatted = new Intl.NumberFormat("es-CO", {
    style: "decimal",
    maximumFractionDigits: 0,
  }).format(value);
  
  return `$ ${formatted}`;
}

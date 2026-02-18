import type { CartItem, Product } from "~/types/catalog";
import { formatMoney } from "~/lib/money";

export type WhatsAppMessageInput = {
  storeName: string;
  currency: string;
  items: CartItem[];
  productsById: Record<string, Product>;
};

export function generateWhatsAppMessage(input: WhatsAppMessageInput) {
  const lines: string[] = [];

  lines.push(`Hola, quiero hacer un pedido en ${input.storeName}.`);
  lines.push("");
  lines.push("Resumen del pedido:");

  let total = 0;

  for (const item of input.items) {
    const product = input.productsById[item.productId];
    if (!product) continue;

    const lineTotal = product.price * item.quantity;
    total += lineTotal;

    lines.push(
      `- ${item.quantity} x ${product.name} (${formatMoney(product.price, input.currency)}) = ${formatMoney(lineTotal, input.currency)}`,
    );
  }

  lines.push("");
  lines.push(`Total: ${formatMoney(total, input.currency)}`);
  lines.push("");
  lines.push("Datos de entrega:");
  lines.push("- Nombre:");
  lines.push("- Dirección:");
  lines.push("- Barrio/Ciudad:");
  lines.push("- Referencia:");
  lines.push("- Forma de pago:");

  return encodeURIComponent(lines.join("\n"));
}

export function buildWhatsAppUrl(phoneE164: string, encodedMessage: string) {
  let normalized = phoneE164.replace(/\D/g, "");

  // Fix for Colombia: If number is 10 digits (mobile), prepend 57
  if (normalized.length === 10) {
    normalized = `57${normalized}`;
  }

  return `https://wa.me/${normalized}?text=${encodedMessage}`;
}

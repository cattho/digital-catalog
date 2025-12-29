export type Product = {
  id: string;
  name: string;
  price: number;
  description?: string;
  imageUrl?: string;
};

export type CartItem = {
  productId: string;
  quantity: number;
};

export interface Product {
  id: number | string;
  name: string;
  description: string;
  category: string;
  price: number;
  promoPrice?: number;
  stock: number;
  image: string;
}

export type ProductInput = Omit<Product, "id">;

export interface ProductFormValues {
  name: string;
  description: string;
  category: string;
  price: number;
  promoPrice?: number;
  stock: number;
  image: string;
}

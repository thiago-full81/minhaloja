import axios from "axios";
import { appConfig } from "../config/appConfig";
import type { Product, ProductInput } from "../types/product";

const client = axios.create({
  baseURL: appConfig.apiBaseUrl,
  headers: { "Content-Type": "application/json" },
});

export const productsApi = {
  async list(): Promise<Product[]> {
    const { data } = await client.get<Product[]>("/products");
    return data;
  },

  async getById(id: string): Promise<Product> {
    const { data } = await client.get<Product>(`/products/${encodeURIComponent(id)}`);
    return data;
  },

  async create(product: ProductInput): Promise<Product> {
    const { data } = await client.post<Product>("/products", product);
    return data;
  },

  async update(id: string, product: ProductInput): Promise<Product> {
    const { data } = await client.put<Product>(
      `/products/${encodeURIComponent(id)}`,
      product,
    );
    return data;
  },

  async remove(id: string): Promise<void> {
    await client.delete(`/products/${encodeURIComponent(id)}`);
  },
};

import api from './api';
import { Product } from '../types/Product.type';

export async function AddingProducts(products: Product[]) {
  const response = await api.post('Product/bulk', products);
  return response.data;
}

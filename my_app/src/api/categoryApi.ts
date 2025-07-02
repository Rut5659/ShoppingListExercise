import api from './api';
import { Category } from '../types/Category.type';

export async function fetchCategories(): Promise<Category[]> {
  const response = await api.get('Category');
  console.log(response)
  return response.data;
}

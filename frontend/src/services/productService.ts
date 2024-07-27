import apiClient from './apiClient';
import { Product } from 'types';

const getProducts = async (): Promise<Product[]> => {
  const response = await apiClient.get('/api/products');
  return response.data;
};

const getProductByName = async (name: string): Promise<Product[]> => {
  const response = await apiClient.get(`/api/products/${name}`);
  return response.data;
};

export default {
  getProducts,
  getProductByName,
};

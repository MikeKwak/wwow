import apiClient from './apiClient';
import { Product, Review } from 'types';

const getReviews = async (productName: any): Promise<any[]> => {
  console.log(productName);
  const response = await apiClient.get(`/api/products/reviews/${productName}`);
  // const response = await apiClient.get(`/api/reviews/${productName}`);
  console.log(response);
  return response.data;
};

const createReview = async (reviewData: any): Promise<Product[]> => {
  const response = await apiClient.post('/api/reviews', reviewData);
  return response.data;
};

export default {
  getReviews,
  createReview,
};

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, Typography, Grid, Box } from '@mui/material';
import apiClient from 'services/apiClient';
import productService from 'services/productService';
import { Product } from 'types';

// Sample data for products
const sampleProducts = [
  {
    _id: '6696f4eacfba408500ec1113',
    name: 'Product 1',
    type: 'Type A',
    price: 100,
    description: 'Description for Product 1',
  },
  {
    _id: '6696f4eacfba408500ec1114',
    name: 'Product 2',
    type: 'Type B',
    price: 150,
    description: 'Description for Product 2',
  },
  // Add more products here
];

const ProductListPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const freshPostings = await productService.getProducts();
        console.log(freshPostings);
        setProducts(freshPostings);
      } catch (error) {
        console.error('Error fetching products', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Products
      </Typography>
      <Grid container spacing={3}>
        {sampleProducts.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product._id}>
            <Card
              component={Link}
              to={`/product/${product._id}`}
              sx={{ textDecoration: 'none' }}
            >
              <CardContent>
                <Typography variant="h6">{product.name}</Typography>
                <Typography variant="body2">Type: {product.type}</Typography>
                <Typography variant="body2">Price: ${product.price}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ProductListPage;

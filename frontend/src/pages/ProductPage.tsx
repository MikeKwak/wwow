import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  Typography,
  Tabs,
  Tab,
  Avatar,
  Button,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Modal,
  TextField,
  Rating,
  Toolbar,
  Grid,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import { useParams } from 'react-router-dom';
import productService from '../services/productService';
import reviewService from '../services/reviewService';
import { Email } from '@mui/icons-material';
import { useUser } from 'userContext';

const ProductPage = () => {
  const { name } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [reviews, setReviews] = useState<any[]>([]);
  const [currentTab, setCurrentTab] = useState('description');
  const [openQrModal, setOpenQrModal] = useState(false);
  const [openReviewModal, setOpenReviewModal] = useState(false);
  const [reviewRating, setReviewRating] = useState<number | null>(null);
  const [reviewComments, setReviewComments] = useState('');
  const { user } = useUser();

  useEffect(() => {
    fetchProduct();
  }, [name]);

  useEffect(() => {
    if (product) fetchReviews();
  }, [product]);

  const fetchProduct = async () => {
    try {
      const freshPosting = await productService.getProductByName(name!);
      setProduct(freshPosting);
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  const fetchReviews = async () => {
    try {
      const productReviews = await reviewService.getReviews(name);
      console.log('reviews: ', productReviews);
      setReviews(productReviews);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };
  const handleChangeTab = (
    event: any,
    newValue: React.SetStateAction<string>
  ) => {
    setCurrentTab(newValue);
  };

  const handleOpenQrModal = () => {
    setOpenQrModal(true);
  };

  const handleCloseQrModal = () => {
    setOpenQrModal(false);
  };

  const handleOpenReviewModal = () => {
    setOpenReviewModal(true);
  };

  const handleCloseReviewModal = () => {
    setOpenReviewModal(false);
  };

  const handleReviewSubmit = async () => {
    try {
      const reviewData = {
        productName: name,
        email: user!.email,
        imgUrl: user!.imgUrl,
        rating: reviewRating,
        comments: reviewComments,
      };
      await reviewService.createReview(reviewData!);
      // Refetch reviews after submitting a new one
      const updatedReviews = await reviewService.getReviews(name!);
      setReviews(updatedReviews);
    } catch (error) {
      console.error('Error submitting review:', error);
    } finally {
      setReviewRating(null);
      setReviewComments('');
      setOpenReviewModal(false);
    }
  };

  if (!product) {
    return <Typography variant="h6">Loading...</Typography>;
  }

  const qrCodeData = product.qrCode.data;
  const qrCodeBase64 = btoa(String.fromCharCode(...new Uint8Array(qrCodeData)));

  return (
    <Card sx={{ p: 3 }}>
      <Toolbar />
      <Box sx={{ mb: 2, textAlign: 'center' }}>
        <Typography variant="h4">{product.productName}</Typography>
        <Typography variant="body1">
          Type: {product.productClassification}
        </Typography>
        <Typography variant="body1">Price: ${product.price}</Typography>
        <Avatar
          sx={{
            width: 150,
            height: 150,
            mt: 2,
            bgcolor: 'grey.300',
            margin: '0 auto',
            fontSize: 20,
          }}
        >
          Images coming soon!
        </Avatar>
      </Box>

      <Button variant="contained" color="primary" onClick={handleOpenQrModal}>
        Show QR Code
      </Button>

      <Modal open={openQrModal} onClose={handleCloseQrModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" component="h2">
            QR Code
          </Typography>
          <Box
            component="img"
            src={`data:image/png;base64,${qrCodeBase64}`}
            alt="QR Code"
            sx={{ mt: 2 }}
          />
        </Box>
      </Modal>

      <Tabs
        value={currentTab}
        onChange={handleChangeTab}
        sx={{
          px: 3,
          boxShadow: (theme) =>
            `inset 0 -2px 0 0 ${alpha(theme.palette.grey[500], 0.08)}`,
        }}
      >
        {[
          { value: 'description', label: 'Description' },
          { value: 'reviews', label: `Reviews (${reviews.length})` },
        ].map((tab) => (
          <Tab key={tab.value} value={tab.value} label={tab.label} />
        ))}
      </Tabs>

      {currentTab === 'description' && (
        <Box sx={{ my: 2 }}>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Created At</TableCell>
                <TableCell>
                  {new Date(product.createdAt).toLocaleString()}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Updated At</TableCell>
                <TableCell>
                  {new Date(product.updatedAt).toLocaleString()}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Supplier SKU</TableCell>
                <TableCell>{product.supplierSku}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Product ID</TableCell>
                <TableCell>{product._id}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Box>
      )}

      {currentTab === 'reviews' && (
        <Box>
          <ProductDetailsReview reviews={reviews} />
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            onClick={handleOpenReviewModal}
          >
            Write a Review
          </Button>
        </Box>
      )}

      {/* Review Modal */}
      <Modal open={openReviewModal} onClose={handleCloseReviewModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            width: 400,
          }}
        >
          <Typography variant="h6" component="h2">
            Write a Review
          </Typography>
          <Rating
            name="review-rating"
            value={reviewRating}
            onChange={(event, newValue) => {
              setReviewRating(newValue);
            }}
            sx={{ mt: 2 }}
          />
          <TextField
            label="Comments"
            multiline
            fullWidth
            rows={4}
            value={reviewComments}
            onChange={(e) => setReviewComments(e.target.value)}
            sx={{ mt: 2 }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Button onClick={handleCloseReviewModal}>Cancel</Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleReviewSubmit}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Modal>
    </Card>
  );
};

// Inline ProductDetailsDescription Component
const ProductDetailsDescription = ({
  description,
}: {
  description: string;
}) => (
  <Box sx={{ p: 3 }}>
    <Typography variant="body1">{description}</Typography>
  </Box>
);

const ProductDetailsReview = ({ reviews }: { reviews: any[] }) => (
  <Box sx={{ p: 3 }}>
    {reviews.length === 0 ? (
      <Typography variant="body1">No reviews yet.</Typography>
    ) : (
      reviews.map((review, index) => (
        <Box
          key={index}
          sx={{
            mb: 2,
            p: 2,
            border: '1px solid #ddd',
            borderRadius: '8px',
            boxShadow: 1,
            backgroundColor: '#f9f9f9',
          }}
        >
          <Grid container spacing={2}>
            <Grid item>
              <Avatar alt={review.email} src={review.imgUrl} />
            </Grid>
            <Grid item xs>
              <Typography variant="body1" gutterBottom>
                <strong>{review.email}</strong>
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {new Date(review.createdAt).toLocaleString()}
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                Rating: {review.rating} / 5
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                {review.comments}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      ))
    )}
  </Box>
);

export default ProductPage;

/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { Box, Grid, styled, Typography } from '@mui/material';
// img
import imgDetail from '../assets/download.jpeg';
import imgDetail2 from '../assets/marijuana-dispensary-products-illustration-1200x630-1085450290.jpg';

const CustomGridItem = styled(Grid)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
});

const CustomTypography = styled(Typography)({
  fontSize: '1.1rem',
  textAlign: 'start',
  lineHeight: '1.5',
  color: '#515151',
  marginTop: '1.5rem',
});

const GetStarted: React.FC = () => {
  return (
    <Grid
      container
      spacing={{ xs: 4, sm: 4, md: 0 }}
      sx={{
        py: 10,
        px: 2,
      }}
    >
      <CustomGridItem item xs={12} sm={8} md={6}>
        <Box
          component="section"
          sx={{
            px: 4,
          }}
        >
          <Typography
            variant="h4"
            component="h3"
            sx={{
              fontWeight: '700',
              textAlign: 'start',
            }}
          >
            We make it easy for tenants and landlords
          </Typography>
          <CustomTypography>
            Listings are updated continuously so you
            <br />
            won't miss out on homes that just hit
            <br />
            the market until you find your perfect home.
          </CustomTypography>
        </Box>
      </CustomGridItem>

      <Grid item xs={12} sm={4} md={6}>
        <img
          src={imgDetail}
          alt=""
          style={{
            width: '100%',
          }}
        />
      </Grid>

      <Grid
        item
        xs={12}
        sm={4}
        md={6}
        sx={{
          order: { xs: 4, sm: 4, md: 3 },
        }}
      >
        <img
          src={imgDetail2}
          alt=""
          style={{
            width: '100%',
          }}
        />
      </Grid>

      <CustomGridItem
        item
        xs={12}
        sm={8}
        md={6}
        sx={{
          order: { xs: 3, sm: 3, md: 4 },
        }}
      >
        <Box
          component="section"
          sx={{
            px: 4,
          }}
        >
          <Typography
            variant="h4"
            component="h3"
            sx={{
              fontWeight: '700',
              textAlign: 'start',
            }}
          >
            Match with the best agent
          </Typography>
          <CustomTypography>
            Our verified partner Agents are local experts who
            <br />
            earn an average of 4.8/5 stars from buyers and sellers.
          </CustomTypography>
        </Box>
      </CustomGridItem>
    </Grid>
  );
};

export default GetStarted;

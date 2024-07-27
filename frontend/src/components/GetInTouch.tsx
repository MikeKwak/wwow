import React from 'react';
import { Button, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const GetInTouch: React.FC = () => {
  return (
    <Stack
      component="section"
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{
        py: 10,
        mx: 6,
      }}
    >
      <Typography
        variant="h4"
        component="h3"
        sx={{
          fontWeight: '700',
          textAlign: 'center',
        }}
      >
        Contact us to buy property
      </Typography>
      <Typography
        sx={{
          maxWidth: 'sm',
          mx: 0,
          textAlign: 'center',
          py: 3,
          color: '#7b7b7b',
        }}
      >
        It is our commitment to ensure a professional and enjoyable new home
        buying experience for you. If you want to get a home to start living as
        a family in an area that you love click the button below.
      </Typography>
      <Button
        component={Link}
        to="/contact"
        variant="contained"
        type="submit"
        size="medium"
        sx={{
          fontSize: '0.9rem',
          textTransform: 'capitalize',
          py: 2,
          px: 4,
          mt: 3,
          mb: 2,
          borderRadius: 0,
          backgroundColor: '#14192d',
          '&:hover': {
            backgroundColor: '#1e2a5a',
          },
        }}
      >
        get in touch
      </Button>
    </Stack>
  );
};

export default GetInTouch;

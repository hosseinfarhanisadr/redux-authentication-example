import { ReactNode } from 'react';
import { Box, Container } from '@mui/material';
import AppLoading from './AppLoading';
import useAuth from '../hooks/useAuth';

const PrivateLayout = ({ children }: { children: ReactNode }): JSX.Element => {
  const { loading } = useAuth({ middleware: 'auth' });

  if (loading) {
    return <AppLoading />;
  }

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          my: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {children}
      </Box>
    </Container>
  );
};

export default PrivateLayout;

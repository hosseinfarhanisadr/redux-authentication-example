import { ReactNode } from 'react';
import { Box, Container, Button } from '@mui/material';
import AppLoading from './AppLoading';
import useAuth from '../hooks/useAuth';
import { useAppDispatch } from '../store';
import { logout } from '../store/authSlice';

const PrivateLayout = ({ children }: { children: ReactNode }): JSX.Element => {
  const { loading } = useAuth({ middleware: 'auth' });
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

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
        <Box maxWidth="sm">
          <Button variant="contained" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default PrivateLayout;

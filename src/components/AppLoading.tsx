import { Box, Container, Typography } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';

const AppLoading = (): JSX.Element => (
  <Container maxWidth="lg">
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography sx={{ mb: 2, fontSize: 20 }} color="textSecondary">
        Loading...
      </Typography>
      <LinearProgress
        color="secondary"
        sx={{ width: '20rem', maxWidth: '100%' }}
      />
    </Box>
  </Container>
);

export default AppLoading;

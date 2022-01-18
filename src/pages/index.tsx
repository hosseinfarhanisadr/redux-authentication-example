import { NextPage } from 'next';
import Head from 'next/head';
import { Typography } from '@mui/material';
import PrivateLayout from '../components/PrivateLayout';

const Home: NextPage = () => (
  <>
    <Head>
      <title>Home</title>
    </Head>
    <PrivateLayout>
      <Typography variant="h4" component="h1" gutterBottom>
        This is protected content. You can access this content because you are
        signed in.
      </Typography>
    </PrivateLayout>
  </>
);

export default Home;

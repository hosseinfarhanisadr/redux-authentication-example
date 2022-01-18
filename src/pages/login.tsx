import { NextPage } from 'next';
import Head from 'next/head';
import * as Yup from 'yup';
import { LoadingButton } from '@mui/lab';
import { FormikProps, useFormik, FormikHelpers } from 'formik';
import { Box, Container, TextField, Typography, Alert } from '@mui/material';
import useAuth from '../hooks/useAuth';
import { useAppDispatch } from '../store';
import { login } from '../store/authSlice';
import AppLoading from '../components/AppLoading';

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Must be a valid email')
    .required('Email is required'),
  password: Yup.string().required('Password is required'),
});

type FormValues = { email: string; password: string };

const Login: NextPage = () => {
  const dispatch = useAppDispatch();
  const { loading } = useAuth({ middleware: 'guest' });

  const handleLogin = async (
    values: FormValues,
    formikHelpers: FormikHelpers<FormValues>
  ) => {
    const resultAction = await dispatch(login(values));

    if (login.rejected.type === resultAction.type) {
      formikHelpers.setStatus(
        resultAction.payload.message || 'Something went wrong!'
      );
      formikHelpers.setSubmitting(false);
    } else {
      formikHelpers.resetForm();
    }
  };

  const {
    errors,
    values,
    status,
    touched,
    handleBlur,
    handleChange,
    isSubmitting,
    handleSubmit,
  }: FormikProps<FormValues> = useFormik({
    initialValues: {
      email: 'hossein@example.com',
      password: '123456',
    },
    validationSchema,
    onSubmit: handleLogin,
  });

  if (loading) {
    return <AppLoading />;
  }

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
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
          <form onSubmit={handleSubmit}>
            <Box sx={{ my: 3, textAlign: 'center' }}>
              <Typography color="textPrimary" variant="h4">
                Sign in
              </Typography>
            </Box>

            <TextField
              fullWidth
              type="email"
              name="email"
              margin="normal"
              variant="outlined"
              onBlur={handleBlur}
              value={values.email}
              label="Email Address"
              onChange={handleChange}
              helperText={touched.email && errors.email}
              error={Boolean(touched.email && errors.email)}
            />
            <TextField
              fullWidth
              margin="normal"
              name="password"
              type="password"
              label="Password"
              variant="outlined"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              helperText={touched.password && errors.password}
              error={Boolean(touched.password && errors.password)}
            />
            {status && (
              <Alert icon={false} severity="error">
                {status}
              </Alert>
            )}
            <Box sx={{ py: 2 }}>
              <LoadingButton
                fullWidth
                size="large"
                type="submit"
                color="primary"
                variant="contained"
                loading={isSubmitting}
              >
                Sign In Now
              </LoadingButton>
            </Box>
          </form>
        </Box>
      </Container>
    </>
  );
};

export default Login;

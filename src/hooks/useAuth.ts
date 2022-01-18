import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getUser } from '../store/authSlice';
import { useAppDispatch, useAppSelector } from '../store';

type Params = { middleware: string; redirectIfAuthenticated?: string };

function useAuth({ middleware, redirectIfAuthenticated = '/' }: Params) {
  const [isFetched, setIsFetched] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { isAuthenticated, loading, user } = useAppSelector(
    (state) => state.auth
  );

  useEffect(() => {
    dispatch(getUser()).then(() => {
      setIsFetched(true);
    });
  }, [dispatch]);

  useEffect(() => {
    if (!isFetched) {
      return;
    }
    if (middleware == 'guest' && isAuthenticated) {
      router.push(redirectIfAuthenticated);
    }
    if (middleware == 'auth' && !isAuthenticated) {
      router.push('/login');
    }
  }, [router, middleware, isAuthenticated, redirectIfAuthenticated, isFetched]);

  return { isAuthenticated, user, loading };
}

export default useAuth;

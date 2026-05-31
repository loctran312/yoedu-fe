import { useEffect } from 'react';
import { getMeThunk } from '@/features/auth/store/auth-thunk';
import { useAppSelector, useAppDispatch } from '@/app/redux/hooks';

export default function AppInit({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const { accessToken, user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (accessToken) {
      dispatch(getMeThunk());
    }
  }, [accessToken, dispatch]);

  if (!user) return null;

  return children;
}

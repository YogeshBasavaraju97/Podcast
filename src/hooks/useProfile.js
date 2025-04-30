import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { addUser } from '@/utils/userSlice';

const useProfile = () => {
  const dispatch = useDispatch();
  const userData = useSelector((store) => store.user);
  const router = useRouter();

  const fetchProfile = useCallback(async () => {
    try {
      const response = await axios.get('/api/profile/', {
        withCredentials: true,
      });
      dispatch(addUser(response?.data?.user));
    } catch (error) {
      console.log(error);
      if (error?.response?.status === 401) {
        router.push('/login');
      }
    }
  }, [dispatch, router]);

  // Automatically fetch on mount if user data is missing
  useEffect(() => {
    if (!userData || !userData._id) {
      fetchProfile();
    }
  }, [fetchProfile, userData]);

  return { userData, fetchProfile };
};

export default useProfile;

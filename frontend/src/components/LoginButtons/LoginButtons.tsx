import { useGoogleLogin } from '@react-oauth/google';
import { getGoogleUser, registerUser } from './util';
import { useCookies } from 'react-cookie';
import { User } from '../../global/user.types';
import { GoogleUser } from './types';
import { useContext, useEffect, useState, useCallback } from 'react';
import { UserContext } from '../../context/UserContext';
import { UserContextType } from '../../global/context.types';
import { useMutation } from '@tanstack/react-query';
import ErrorAlert from '../Alerts/ErrorAlert';

const LoginButtons = () => {
  const [cookies, setCookies, removeCookies] = useCookies(['user']);
  const { loggedIn, setLoggedIn, setUser } = useContext(
    UserContext,
  ) as UserContextType;
  const [error, setError] = useState<string>('');

  const mutation = useMutation({
    mutationFn: registerUser,
  });

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const userInfo: GoogleUser = await getGoogleUser(
        tokenResponse.access_token,
      );
      const user: User = {
        email: userInfo.email,
        firstName: userInfo.given_name,
        lastName: userInfo.family_name,
      };
      setCookies('user', user, { path: '/' });
      setLoggedIn(true);
      setUser(user);
      mutation.mutate(user);
    },
    onError: (errorResponse) => console.log(errorResponse),
  });

  const logout = useCallback(() => {
    setLoggedIn(false);
    setUser(null);
    removeCookies('user');
  }, [removeCookies, setLoggedIn, setUser]);

  const clearError = () => {
    setTimeout(() => {
      setError('');
    }, 5000);
  };

  useEffect(() => {
    if (mutation.isError) {
      setError('There was an error logging you in. Please try again.');
      clearError();
      logout();
    }
  }, [mutation.isError, logout]);

  return (
    <div className='flex flex-1 '>
      {loggedIn ? (
        <button className='w-full text-left' onClick={logout}>
          Logout
        </button>
      ) : (
        <button onClick={() => login()}>Sign in with Google 🚀</button>
      )}
      {error !== '' && <ErrorAlert error={error} />}
    </div>
  );
};

export default LoginButtons;

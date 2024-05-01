import { useGoogleLogin } from '@react-oauth/google';
import { getGoogleUser } from './util';
import { useCookies } from 'react-cookie';
import { User } from '../../global/user.types';
import { GoogleUser } from './types';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { UserContextType } from '../../global/context.types';

const LoginButtons = () => {
  const [cookies, setCookies, removeCookies] = useCookies(['user']);
  const { loggedIn, setLoggedIn, setUser } = useContext(
    UserContext,
  ) as UserContextType;

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
    },
    onError: (errorResponse) => console.log(errorResponse),
  });

  const logout = () => {
    setLoggedIn(false);
    setUser(null);
    removeCookies('user');
  };

  return (
    <div className='flex flex-1 '>
      {loggedIn ? (
        <button className='w-full text-left' onClick={logout}>
          Logout
        </button>
      ) : (
        <button onClick={() => login()}>Sign in with Google 🚀</button>
      )}
    </div>
  );
};

export default LoginButtons;

import React, { createContext, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { UserContextType } from '../global/context.types';
import { User } from '../global/user.types';

export const UserContext = createContext<UserContextType | null>(null);

const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [cookies, setCookies] = useCookies(['user']);

  useEffect(() => {
    if (cookies.user) {
      setLoggedIn(true);
      setUser(cookies.user);
    }
  }, [cookies.user, loggedIn, user]);

  return (
    <UserContext.Provider value={{ user, setUser, loggedIn, setLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;

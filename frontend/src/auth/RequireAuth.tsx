import { Navigate, Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar/NavBar';
import { useContext, useEffect, useState } from 'react';
import { UserContextType } from '../global/context.types';
import { UserContext } from '../context/UserContext';

const RequireAuth = () => {
  const { loggedIn } = useContext(UserContext) as UserContextType;
  return loggedIn ? <Outlet></Outlet> : <Navigate to='/' replace></Navigate>;
};

export default RequireAuth;

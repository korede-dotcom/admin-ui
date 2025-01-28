import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useSessionStorage } from './useSessionStorage';
console.log("🚀 ~ file: ProtectedRoute.js:4 ~ useSessionStorage:", useSessionStorage)

const Index = ({ component: Component, ...rest }) => {
  let isAuthorized = false;
  // const {getSessionStorage} = useSessionStorage("__appUser")
  // const token = getSessionStorage;
  // console.log(token)
  if (localStorage.getItem("token") != null ) {
    isAuthorized = true;
  }
  return isAuthorized ? <Outlet /> : <Navigate to='/' replace/>;
};

export default Index;
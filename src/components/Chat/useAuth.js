import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function useAuth() {
  
  const authorise = (res) => {
    localStorage.setItem('isAuthorised', 'Yes');
    localStorage.setItem('myData',JSON.stringify(res));
  };
  const unauthorise = () => {
    localStorage.setItem('isAuthorised', 'No');
  };

  const ProtectedRoutes = (props) => {    
    const isAuthenticated = localStorage.getItem('isAuthorised');
    const Rendering = isAuthenticated === 'Yes' ? 
    props.children : <Redirect to={{pathname:'/'}}></Redirect>

    return (
      <Route path={props.path}> 
        {Rendering}
      </Route>
    )
  }

  return [authorise, unauthorise, ProtectedRoutes]
};

export default useAuth;
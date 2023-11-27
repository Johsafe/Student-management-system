
import React from 'react'
import { Route, Navigate } from 'react-router-dom'

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isLoggedIn = JSON.parse(localStorage.getItem("token"));
  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? <Component {...props} /> : <Navigate to='/dashboard' />
      }
    />
  )
}
export default PrivateRoute;

// const PrivateRoute = ({...rest}) => {
//   const auth = JSON.parse(localStorage.getItem('token'));
//   if (auth){
//       if (auth.token){
//         return <Route {...rest}/>
//       }
//   }
// // return <Redirect to="/signin"/>
// };



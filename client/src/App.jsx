import React from 'react';
import './App.css';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PrivateRoute from 'components/Common/PrivateRoute';
import AdminRoute from 'components/Common/AdminRoute';
import PreloaderBox from 'components/Common/PreloaderBox';

import { useSelector, useDispatch } from 'react-redux';
import { fetchIsAuth, setIsFetching } from 'store/userSlice';
import { checkValidToken, setIsFetchingAdmin } from 'store/adminSlice';

import Header from 'components/Common/Header';
import Footer from 'components/Common/Footer';
import Main from 'pages/Main';
import SignIn from 'pages/SignIn';
import SignUp from 'pages/SignUp';
import Cabinet from 'pages/Cabinet';
import Services from 'pages/Services';
import MyOrders from './pages/MyOrders';
import NewOrder from './pages/NewOrder';
import AdminLogin from './pages/AdminLogin';
import Admin from './pages/Admin';

import { useMountEffect } from 'hooks/useMountEffect';

function App() {
  const { isFetching } = useSelector(state => state.user);
  const { isFetchingAdmin, isAuth } = useSelector(state => state.admin);
  const dispatch = useDispatch();

  useMountEffect(() => {
    const token = localStorage.getItem('token');
    const atoken = localStorage.getItem('atoken');

    if (token) {
      dispatch(setIsFetchingAdmin(false));
      dispatch(fetchIsAuth(token));
    } else if (atoken) {
      dispatch(setIsFetching(false));
      dispatch(checkValidToken(atoken));
    } else {
      dispatch(setIsFetching(false));
      dispatch(setIsFetchingAdmin(false));
    }
  });

  if (isFetching || isFetchingAdmin) {
    return <PreloaderBox />;
  }

  return (
    <Router>
      <Header />
      <main>
        <Switch>
          <Route path='/' exact>
            <Main />
          </Route>
          <Route path='/signin'>
            <SignIn />
          </Route>
          <Route path='/adminlogin'>
            <AdminLogin />
          </Route>
          <Route path='/signup'>
            <SignUp />
          </Route>
          <Route path='/services'>
            <Services />
          </Route>
          <PrivateRoute path='/neworder'>
            <NewOrder />
          </PrivateRoute>
          <PrivateRoute path='/myorders'>
            <MyOrders />
          </PrivateRoute>
          <PrivateRoute path='/cabinet'>
            <Cabinet />
          </PrivateRoute>
          <AdminRoute path='/admin'>
            <Admin />
          </AdminRoute>
          <Route path='*'></Route>
        </Switch>
      </main>
      {!isAuth && <Footer />}
    </Router>
  );
}

export default App;

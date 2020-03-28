import React from 'react';
import './App.css';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Header from 'components/Common/Header/Header';
import Footer from 'components/Common/Footer/Footer';
import Main from 'pages/Main';
import SignIn from 'pages/SignIn';
import SignUp from 'pages/SignUp';

function App() {
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
          <Route path='/signup'>
            <SignUp />
          </Route>
        </Switch>
      </main>
      <Footer />
    </Router>
  );
}

export default App;

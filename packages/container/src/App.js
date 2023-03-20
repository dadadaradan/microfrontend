import React, { lazy, Suspense, useState, useEffect } from 'react';
import Header from './components/Header';
import Progress from './components/Progress';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';

const LazyMarketingApp = lazy(() => import('./components/MarketingApp'));
const LazyAuthApp = lazy(() => import('./components/AuthApp'));
const LazyDashboard = lazy(() => import('./components/DashboardApp'));

const history = createBrowserHistory();

export default () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    if (isSignedIn) {
      history.push('/dashboard');
    }
  }, [isSignedIn]);

  const handleSignIn = () => {
    setIsSignedIn(true);
  };

  const handleSignOut = () => {
    setIsSignedIn(false);
  };

  return (
    <Router history={history}>
      <div>
        <Header signedIn={isSignedIn} onSignOut={handleSignOut} />
        <Suspense fallback={<Progress />}>
          <Switch>
            <Route exact path="/dashboard">
              {!isSignedIn && <Redirect to="/" />}
              <LazyDashboard />
            </Route>
            <Route path="/auth">
              <LazyAuthApp onSignIn={handleSignIn} />
            </Route>
            <Route path="/" component={LazyMarketingApp} />
          </Switch>
        </Suspense>
      </div>
    </Router>
  );
};

import React, { lazy, Suspense, useState } from 'react';
import Header from './components/Header';
import Progress from './components/Progress';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

const LazyMarketingApp = lazy(() => import('./components/MarketingApp'));
const LazyAuthApp = lazy(() => import('./components/AuthApp'));

export default () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  const handleSignIn = () => {
    setIsSignedIn(true);
  };

  const handleSignOut = () => {
    setIsSignedIn(false);
  };

  return (
    <BrowserRouter>
      <div>
        <Header signedIn={isSignedIn} onSignOut={handleSignOut} />
        <Suspense fallback={<Progress />}>
          <Switch>
            <Route path="/auth">
              <LazyAuthApp onSignIn={handleSignIn} />
            </Route>
            <Route path="/" component={LazyMarketingApp} />
          </Switch>
        </Suspense>
      </div>
    </BrowserRouter>
  );
};

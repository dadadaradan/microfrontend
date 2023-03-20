import React, { useRef, useEffect } from 'react';
import { mount } from 'auth/AuthApp';
import { useHistory } from 'react-router-dom';

export default ({ onSignIn }) => {
  const divRef = useRef(null);
  const history = useHistory();

  useEffect(() => {
    if (!divRef.current) return;

    const onNavigate = ({ pathname: nextPathname }) => {
      const { pathname } = history;

      if (nextPathname !== pathname) {
        history.push(nextPathname);
      }
    };

    const { onContainerNavigate } = mount(divRef.current, {
      onNavigate,
      initialPath: history.location.pathname,
      onSignIn,
    });

    history.listen(onContainerNavigate);
  }, [divRef.current]);

  return <div ref={divRef} />;
};

import React, { useRef, useEffect } from 'react';
import { mount } from 'marketing/Marketing';

export default () => {
  const divRef = useRef(null);

  useEffect(() => {
    if (!divRef.current) return;

    mount(divRef.current);
  }, [divRef.current]);

  return <div ref={divRef} />;
};

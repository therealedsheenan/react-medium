import React from 'react';

import Loading from './Loading';

/*
 * Utility React component that returns a loading component
 * if the `isLoading` paramater is true. Otherwise return the passed Component
 * @params isLoading - Boolean
 * @params Component - React Component
 */
const IsLoading = (isLoading, Component) =>
  isLoading ? <Loading /> : <Component />;

export default IsLoading;

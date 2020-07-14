// import React from 'react';
import ReactDom from 'react-dom';

import App from './app';

if (process.env.NODE_ENV === 'development') {
  console.log(`Looks like we are in ${process.env.NODE_ENV} model`);
}

ReactDom.render(App, document.getElementById('root'));

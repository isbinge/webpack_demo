import React from 'react';
import ReactDom from 'react-dom';

if (process.env.NODE_ENV === 'development') {
  console.log(`Looks like we are in ${process.env.NODE_ENV} model`);
}

ReactDom.render(<div>Hello world</div>, document.getElementById('root'));

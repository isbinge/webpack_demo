import ReactDom from 'react-dom';
import print from './utils';

import App from './app';

if (process.env.NODE_ENV === 'development') {
  console.log(`Looks like we are in ${process.env.NODE_ENV} model`);
}

print();
ReactDom.render(App, document.getElementById('root'));

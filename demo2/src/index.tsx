import { hot } from 'react-hot-loader/root';
import React from 'react';
import reactDOM from 'react-dom';

import styles from './index.scss';

if (process.env.NODE_ENV === 'production') {
  console.log(author);
}
// window.address = 'a';
const App = hot(() => <h1 className={styles.appContainer}>9527</h1>);

reactDOM.render(<App />, document.getElementById('root'));

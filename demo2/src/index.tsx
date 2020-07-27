import React from 'react';
import reactDOM from 'react-dom';

import styles from './index.scss';

if (process.env.NODE_ENV === 'production') {
  console.log(author);
}
// window.address = 'a';

reactDOM.render(
  <div className={styles.appContainer}>
    <h1>undefined</h1>
  </div>,
  document.getElementById('root'),
);

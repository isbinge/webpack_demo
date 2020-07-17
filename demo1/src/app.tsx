import React from 'react';

import Profile from './Profile';
import print from './utils';

import './index.scss';
import LazyButton from './components/LazyButton';

print();
const App = (
  <div>
    <h1>{HELLO}</h1>
    <Profile />
    <LazyButton />
  </div>
);

export default App;

import React from 'react';
import { Avatar } from 'antd';
import FiveMan from '@assets/images/timg.jpg';

import styles from './index.scss';
const Profile: React.FC = () => {
  return (
    <div>
      <Avatar shape="circle" alt="avatar" src={FiveMan} />
      <div className={styles['profile_avatar']}></div>
    </div>
  );
};

export default Profile;

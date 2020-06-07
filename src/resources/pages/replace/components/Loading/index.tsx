import React, { FC } from 'react';

import { Button, Spin } from 'antd';
import styles from './style.less';

interface LoadingProps {
  resetPref;
}
const Loading: FC<LoadingProps> = ({ resetPref }) => {
  return (
    <div className={styles.container}>
      <div className={styles.loading}>
        <Spin size={'large'} />
      </div>
      <Button block size={'large'} onClick={resetPref}>
        重置设置
      </Button>
    </div>
  );
};

export default Loading;

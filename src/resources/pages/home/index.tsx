import React, { FC } from 'react';
import { Button } from 'antd';

import styles from './index.less';

const Panel: FC = () => {
  return (
    <div>
      <h1 className={styles.title}>index</h1>
      <Button>交换</Button>
    </div>
  );
};

export default Panel;

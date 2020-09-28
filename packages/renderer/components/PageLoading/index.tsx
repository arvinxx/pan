import React from 'react';
import classNames from 'classnames';
import styles from './style.less';

const PageLoading: React.FC = () => {
  return (
    <div className={styles.body}>
      <div className={styles.ctnr}>
        <div className={styles.ldr}>
          <div className={styles.ldrBlk} />
          <div
            className={classNames({
              [styles.ldrBlk]: true,
              [styles.anDelay]: true,
            })}
          />
          <div
            className={classNames({
              [styles.ldrBlk]: true,
              [styles.anDelay]: true,
            })}
          />
          <div className={styles.ldrBlk} />
        </div>
      </div>
    </div>
  );
};
export default PageLoading;

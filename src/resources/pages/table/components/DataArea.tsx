import React, { FC } from 'react';
import { useIntl } from 'umi';
import CustomTable from './Table';
import styles from './style.less';

const DataArea: FC = () => {
  const { formatMessage } = useIntl();

  return (
    <div>
      <div className={styles.title}>
        {formatMessage({
          id: 'page.table.data-area.preview',
        })}
      </div>
      <CustomTable />
    </div>
  );
};

export default DataArea;

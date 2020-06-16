import React, { FC } from 'react';
import { Card } from 'antd';
import { useIntl } from 'umi';
import Table from './Table';
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
      <Card>
        <Table />
      </Card>
    </div>
  );
};

export default DataArea;

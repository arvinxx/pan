import React, { FC } from 'react';
import { Card } from 'antd';
import { useIntl } from 'umi';
import ProTable from '@ant-design/pro-table';
import { Tabs } from 'antd';

import Table from './Table';
import styles from './style.less';
import { useDispatch, useSelector } from 'dva';
import { ConnectState, TableModelState } from '@/models/connect';

const { TabPane } = Tabs;

const DataArea: FC = () => {
  const dispatch = useDispatch();
  const table = useSelector<ConnectState, TableModelState>(
    (state) => state.table
  );
  const { config, activeTabKey } = table;
  const { formatMessage } = useIntl();

  switch (activeTabKey) {
    case 'table':
      return <Table />;
    case 'pro-table':
      return <ProTable />;
    default:
      return <div />;
  }
};

export default DataArea;

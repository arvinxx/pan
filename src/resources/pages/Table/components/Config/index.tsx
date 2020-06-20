import React, { FC } from 'react';

import TableConfig from './TableConfig';
import CellConfig from './CellConfig';
import HeaderConfig from './HeaderConfig';

import { useDispatch, useSelector } from 'react-redux';
import { ConnectState, TableModelState } from '@/models/connect';
import styles from './style.less';
import ButtonGroup from './ButtonGroup';
import { Button, Col } from 'antd';

const Index: FC = () => {
  const dispatch = useDispatch();
  const { focusedCellKey, activeHeader } = useSelector<
    ConnectState,
    TableModelState
  >((state) => state.table);

  if (focusedCellKey === '' && activeHeader === '') {
    return <TableConfig />;
  }

  return (
    <div className={styles.container}>
      <ButtonGroup
        onBack={() => {
          dispatch({
            type: 'table/save',
            payload: { activeHeader: '', focusedCellKey: '' },
          });
        }}
      />

      <div>{activeHeader !== '' ? <HeaderConfig /> : <CellConfig />}</div>
    </div>
  );
};

export default Index;

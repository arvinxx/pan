import React, { FC, useEffect } from 'react';
import { Button } from 'antd';
import {
  nodeToSketchLayers,
  nodeTreeToSketchPage,
  nodeTreeToSketchGroup,
} from '@/utils/html2asketch';

import styles from './style.less';
import { useDispatch, useSelector } from 'dva';
import {
  ConnectState,
  GlobalModelState,
  TableModelState,
} from '@/models/connect';
import { sendRawMsgToEnd } from '@/bridge';

const Panel: FC = () => {
  const dispatch = useDispatch();
  const global = useSelector<ConnectState, GlobalModelState>(
    (state) => state.global
  );

  const generate = () => {
    const el = document.getElementById('test');

    if (el) {
      const layers = nodeToSketchLayers(el);

      console.log(layers);
      sendRawMsgToEnd('TEST_FIELD', layers);
    }
  };

  return (
    <div className={styles.container}>
      <div id={'test'} className={styles.test}>
        测试对象
      </div>
      <div>
        <Button onClick={generate}>生成</Button>
      </div>
    </div>
  );
};

export default Panel;

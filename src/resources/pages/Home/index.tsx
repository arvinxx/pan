import React, { FC, useEffect } from 'react';
import { Descriptions, Typography } from 'antd';

import styles from './style.less';
import { useDispatch, useSelector } from 'dva';
import {
  ConnectState,
  GlobalModelState,
  TableModelState,
} from '@/models/connect';

const { Text, Title } = Typography;
const { Item } = Descriptions;
const Panel: FC = () => {
  const dispatch = useDispatch();
  const global = useSelector<ConnectState, GlobalModelState>(
    (state) => state.global
  );
  useEffect(() => {}, []);
  const { sketch, plugin, env, platform } = global;

  return (
    <div className={styles.container}>
      <Title level={2} className={styles.title}>
        系统信息
      </Title>
      <Descriptions size={'small'}>
        <Item label={'开发环境'}>{env}</Item>
        <Item label={'插件版本'}>{plugin}</Item>
        <Item label={'插件平台'}>{platform}</Item>
        <Item label={'Sketch 版本'}>{sketch}</Item>
      </Descriptions>
    </div>
  );
};

export default Panel;

import React, { FC, useEffect } from 'react';
import { Descriptions, Tooltip, Typography } from 'antd';
import {
  UploadOutlined,
  SettingOutlined,
  QuestionCircleOutlined,
  GiftOutlined,
  PieChartOutlined,
  InboxOutlined,
  ShopOutlined,
  TableOutlined,
  StarOutlined,
  AppstoreAddOutlined,
  BgColorsOutlined,
} from '@ant-design/icons';

import styles from './style.less';
import { useDispatch, useSelector } from 'dva';
import {
  ConnectState,
  GlobalModelState,
  TableModelState,
} from '@/models/connect';

const { Text, Title } = Typography;
const { Item } = Descriptions;
const Toolbar: FC = () => {
  const dispatch = useDispatch();
  const global = useSelector<ConnectState, GlobalModelState>(
    (state) => state.global
  );

  const up = [
    { name: '上传', icon: <UploadOutlined />, key: 'upload' },
    { name: '商店', icon: <ShopOutlined />, key: 'upload' },
    { name: '资产', icon: <InboxOutlined />, key: 'inbox' },
    { name: '色板', icon: <BgColorsOutlined />, key: 'palette' },
    { name: '图标', icon: <StarOutlined />, key: 'icon' },
    { name: '填充', icon: <AppstoreAddOutlined />, key: 'fill' },
    { name: '图表', icon: <PieChartOutlined />, key: 'chart' },
    { name: '表格', icon: <TableOutlined />, key: 'table' },
  ];
  const down = [
    { name: '资讯', icon: <GiftOutlined />, key: 'gift' },
    { name: '帮助', icon: <QuestionCircleOutlined />, key: 'help' },
    { name: '设置', icon: <SettingOutlined />, key: 'setting' },
  ];
  return (
    <div className={styles.container}>
      <div className={styles.up}>
        <div className={styles.logo}>logo</div>
        {up.map((item) => {
          const { icon, key, name } = item;
          return (
            <div className={styles.item}>
              <div key={key} className={styles.icon}>
                {icon}
              </div>
              <div className={styles.title}>{name}</div>
            </div>
          );
        })}
      </div>
      <div className={styles.down}>
        {down.map((item) => {
          const { icon, key, name } = item;
          return (
            <div className={styles.item}>
              <div key={key} className={styles.icon}>
                {icon}
              </div>
              <div className={styles.title}>{name}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Toolbar;

import React, { useCallback, FC } from 'react';
import { Button, Tooltip, Timeline, Tag, Popover } from 'antd';
import {
  CheckOutlined,
  ClockCircleOutlined,
  RedoOutlined,
} from '@ant-design/icons';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import groupBy from 'lodash/groupBy';
import 'dayjs/locale/zh-cn';
import useHotKeysForUndo from '@/hooks/useHotKeysForUndo';
import { IconFont } from '@/components';
import { useIntl } from 'umi';

import styles from './footer.less';

dayjs.locale('zh-cn');
dayjs.extend(relativeTime);

interface FooterProps {
  config: any;
  handleGenerate: any;
  canRedo: any;
  canUndo: any;
  redo: any;
  undo: any;
  resetConfig: any;
  history: any;
  onApplyHistory: any;
  onClearHistory: any;
}

const Footer: FC<FooterProps> = React.memo((props) => {
  const { formatMessage } = useIntl();
  const {
    config,

    handleGenerate,
    canRedo,
    canUndo,
    redo,
    undo,
    resetConfig,
    history,
    onApplyHistory,
    onClearHistory,
  } = props;

  const generateHistoryGroupedByDate = groupBy(history, (item) =>
    dayjs().diff(dayjs(item.date), 'week') > 1 ? '更早' : '本周之内'
  );

  const resortedKeyObject = {
    本周之内: generateHistoryGroupedByDate['本周之内'] || [],
    更早: generateHistoryGroupedByDate['更早'] || [],
  };

  const clearHistory = useCallback(() => {
    onClearHistory('TABLE');
  }, [onClearHistory, config]);

  const historyList = Object.keys(resortedKeyObject).map((title) => {
    // @ts-ignore
    const list = resortedKeyObject[title];
    const tagProps =
      title === '更早'
        ? {
            style: { color: 'rgba(0,0,0,.65)' },
            color: 'rgba(163,177,191,0.15)',
          }
        : { color: '#108ee9' };
    return (
      <Timeline.Item key={title}>
        <div className="history-date-title">
          <Tag {...tagProps}>{title}</Tag>
        </div>
        <ul className="history-list">
          {list
            .reverse()
            .map(
              (
                item: { date: string | number | dayjs.Dayjs | Date },
                index: number
              ) => {
                return (
                  <li key={index} className="history-item">
                    <span className="history-item-title" title={'表格'}>
                      表格
                    </span>
                    <span className="history-item-date">
                      {dayjs(item.date).fromNow()}
                    </span>
                    <a
                      className="history-item-apply"
                      href="#"
                      onClick={() => onApplyHistory(item)}
                      title={dayjs(item.date).format('YYYY-MM-DD HH:mm:ss')}
                    >
                      应用
                    </a>
                  </li>
                );
              }
            )}
        </ul>
      </Timeline.Item>
    );
  });

  const hasHistory = history && history.length > 0;

  const handleRedo = useCallback(() => {
    if (!canRedo) {
      return;
    }
    redo();
  }, [redo, canRedo]);

  const handleUndo = useCallback(() => {
    if (!canUndo) {
      return;
    }
    undo();
  }, [undo, canUndo]);

  const handleReset = useCallback(() => {
    resetConfig(config);
  }, [config, resetConfig]);

  useHotKeysForUndo(handleUndo, handleRedo);

  return (
    <div className={styles.container}>
      <div className={styles.history}>
        <Popover
          title={null}
          overlayClassName="history-popover"
          content={
            <div>
              <Timeline
                style={{
                  width: 260,
                  maxHeight: 'calc(100vh - 120px)',
                  overflow: 'auto',
                  padding: '8px 16px',
                }}
              >
                {hasHistory ? (
                  historyList
                ) : (
                  <div className="history-popover-notfound">
                    <img
                      src="https://gw.alipayobjects.com/zos/rmsportal/iUiSlmAMRtsydJpvrOhE.svg"
                      alt="404"
                    />
                    <div className="history-popover-notfound-text">
                      暂无历史记录
                    </div>
                    <div className="history-popover-notfound-desc">
                      图表生成后会保存配置和数据以便复原
                    </div>
                  </div>
                )}
              </Timeline>
              {hasHistory ? (
                <a className="clear-history" onClick={clearHistory}>
                  清空历史
                </a>
              ) : null}
            </div>
          }
          placement="bottom"
          arrowPointAtCenter
        >
          <ClockCircleOutlined className="history" title="历史记录" />
        </Popover>
      </div>
      <div
        className={`${styles.unRedo} ${styles.undo}`}
        style={{ color: `${canUndo ? '#00000099' : '#ccc'}` }}
        onClick={handleUndo}
      >
        <Tooltip
          placement="top"
          title={formatMessage({ id: 'components.footer.undo' })}
        >
          <IconFont type="icon-Undo" />
        </Tooltip>
      </div>
      <div
        className={`${styles.unRedo} ${styles.redo}`}
        style={{ color: `${canRedo ? '#00000099' : '#ccc'}` }}
        onClick={handleRedo}
      >
        <Tooltip
          placement="top"
          title={formatMessage({ id: 'components.footer.redo' })}
        >
          <IconFont type="icon-Redo" />
        </Tooltip>
      </div>
      <Button icon={<RedoOutlined />} onClick={handleReset}>
        {formatMessage({ id: 'components.footer.reset' })}
      </Button>
      <Button icon={<CheckOutlined />} type="primary" onClick={handleGenerate}>
        {formatMessage({ id: 'components.footer.generate' })}
      </Button>
    </div>
  );
});

export default Footer;

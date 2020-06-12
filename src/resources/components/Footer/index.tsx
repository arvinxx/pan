import React, { useCallback } from 'react';
import { Button, Popconfirm, Tooltip, Timeline, Tag, Popover } from 'antd';
import Icon from '@ant-design/icons';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import groupBy from 'lodash/groupBy';
import 'dayjs/locale/zh-cn';
import useHotKeysForUndo from '@/hooks/useHotKeysForUndo';
import { IconFont as CustomIcon } from '@/components';
import './footer.less';

dayjs.locale('zh-cn');
dayjs.extend(relativeTime);

const chartNameMap = {
  Area: '面积图',
  StackArea: '堆叠面积图',
  PercentageStackArea: '百分比堆叠面积图',
  Bar: '条形图',
  GroupBar: '分组条形图',
  StackBar: '堆叠条形图',
  PercentageStackBar: '百分比堆叠条形图',
  Column: '柱形图',
  GroupColumn: '分组柱形图',
  StackColumn: '堆叠柱形图',
  PercentageStackColumn: '百分比堆叠柱形图',
  Line: '折线图',
  Pie: '饼图',
  Ring: '环形图',
  Radar: '雷达',
};

const Footer = React.memo((props) => {
  const {
    config,
    onBack,
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
    dayjs().diff(dayjs(item.date), 'weeks') > 1 ? '更早' : '本周之内'
  );

  const resortedKeyObject = {
    本周之内: generateHistoryGroupedByDate['本周之内'] || [],
    更早: generateHistoryGroupedByDate['更早'] || [],
  };

  const clearHistory = useCallback(() => {
    const type = config.category ? 'TABLE' : 'CHART';
    onClearHistory(type);
  }, [onClearHistory, config]);

  const historyList = Object.keys(resortedKeyObject).map((title) => {
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
          {list.reverse().map((item) => {
            const itemTitle = item.category
              ? '表格'
              : chartNameMap[item.configs.type];
            return (
              <li key={item.date} className="history-item">
                <span className="history-item-title" title={itemTitle}>
                  {itemTitle}
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
          })}
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
    <div className="footer">
      <div className="footer-router">
        {/* <Popconfirm
          overlayClassName="footer-popconfirm"
          title="返回首页会丢失已有修改，确认返回吗？"
          onConfirm={onBack}
          icon={null}
          width=""
          okText="确定"
          cancelText="取消"
        >
          <div className="footer-router-item footer-router-back">返回首页</div>
        </Popconfirm> */}
        {canRedo || canUndo ? (
          <Popconfirm
            overlayClassName="footer-popconfirm"
            title="返回首页会丢失已有修改，确认返回吗？"
            onConfirm={onBack}
            icon={null}
            okText="确定"
            cancelText="取消"
          >
            <div className="footer-router-item footer-router-back">
              {window.ks_i18n['Back Home']}
            </div>
          </Popconfirm>
        ) : (
          <div
            className="footer-router-item footer-router-back"
            onClick={onBack}
          >
            {window.ks_i18n['Back Home']}
          </div>
        )}
      </div>
      <div className="history">
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
          <Icon
            type="clock-circle-o"
            className="history"
            title="图表生成历史"
          />
        </Popover>
      </div>
      <div
        className="un-redo undo"
        style={{ color: `${canUndo ? '#00000099' : '#ccc'}` }}
        onClick={handleUndo}
      >
        <Tooltip placement="top" title="撤销">
          <CustomIcon type="icon-Undo" />
        </Tooltip>
      </div>
      <div
        className="un-redo redo"
        style={{ color: `${canRedo ? '#00000099' : '#ccc'}` }}
        onClick={handleRedo}
      >
        <Tooltip placement="top" title="重做">
          <CustomIcon type="icon-Redo" />
        </Tooltip>
      </div>
      <Button icon="undo" onClick={handleReset}>
        {window.ks_i18n.Reset}
      </Button>
      <Button icon="check" type="primary" onClick={handleGenerate}>
        {window.ks_i18n.Generate}
      </Button>
    </div>
  );
});

export default Footer;

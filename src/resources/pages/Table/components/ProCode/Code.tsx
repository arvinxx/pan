import React, { FC, useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { prism } from 'react-syntax-highlighter/dist/esm/styles/prism';
import copy from 'copy-to-clipboard';
import { Col, Row, Typography, Space, message, Checkbox } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import styles from './style.less';
import { useDispatch, useSelector } from 'dva';
import { ConnectState, TableModelState } from '@/models/connect';

const { Text } = Typography;

interface CodeProps {
  code: string;
  title: string;
  language?: string;
  type: 'columns' | 'dataSource' | 'table';
}

const Code: FC<CodeProps> = ({
  title,
  code,
  type,
  language = 'javascript',
}) => {
  const dispatch = useDispatch();
  const { codeComment } = useSelector<ConnectState, TableModelState>(
    (state) => state.table
  );

  const onClick = () => {
    copy(code);
    message.success('代码复制成功 🎉');
  };

  return (
    <div className={styles.container}>
      <Row justify={'space-between'}>
        <Col>
          <Space>
            <Text strong>{title}</Text>
            <div className={styles.copy} onClick={onClick}>
              <CopyOutlined />
            </div>
          </Space>
        </Col>
        <Col>
          <Space>
            <div>注释</div>
            <Checkbox
              checked={codeComment[type]}
              onChange={(e) => {
                dispatch({
                  type: 'table/switchCodeComment',
                  payload: { [type]: e.target.checked },
                });
              }}
            />
          </Space>
        </Col>
      </Row>
      <SyntaxHighlighter showLineNumbers language={language} style={prism}>
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

export default Code;

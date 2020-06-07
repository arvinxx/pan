import React, {
  FC,
  useState,
  useEffect,
  useRef,
  KeyboardEventHandler,
} from 'react';
import { Button, Space, Row, Col, Input, Checkbox, Radio } from 'antd';
import { sendMsg } from '@/services';
import { Loading } from './components';
import styles from './style.less';

const Replace: FC = () => {
  const [options, setOptions] = useState({
    caseSensitive: false,
    wholeWord: false,
    selection: false,
    replaceStart: false,
  });
  const [mounted, setMounted] = useState(false);
  const [findMode, setFindMode] = useState(2);

  const [findString, setFindString] = useState('');
  const [replaceString, setReplaceString] = useState('');
  const [replaceStart, setReplaceStart] = useState(false);

  const replaceInput = useRef<Input>();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCaseSensitive = () => {
    const { caseSensitive } = options;
    setOptions({ ...options, caseSensitive: !caseSensitive });
    // sendMsg('REPLACE_FIND', state);
  };

  const handleWholeWord = () => {
    const { wholeWord } = options;
    setOptions({ ...options, wholeWord: !wholeWord });
  };

  const closeWindow = () => {
    sendMsg('REPLACE_CLOSE');
  };

  const resetPref = () => {
    setMounted(false);
    sendMsg('REPLACE_RESET_PREF');
    setTimeout(() => {
      setMounted(true);
    }, 1000);
  };

  const replace = () => {
    setReplaceStart(true);
    const state = {
      ...options,
      findMode,
      findString,
      replaceString,
      replaceStart: true,
    };
    sendMsg('REPLACE_REPLACE', state);
  };

  const { caseSensitive, wholeWord, selection } = options;

  return !mounted ? (
    <Loading resetPref={resetPref} />
  ) : (
    <div className={styles.container}>
      <Space direction={'vertical'}>
        <Row>
          <Col span={4}>
            <div>查找:</div>
          </Col>
          <Col span={20}>
            <Input
              size={'small'}
              autoFocus={mounted}
              value={findString}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  replaceInput.current!.focus();
                }
              }}
              onChange={(e) => {
                setFindString(e.target.value);
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col span={4}>
            <div>替换:</div>
          </Col>
          <Col span={20}>
            <Input
              size={'small'}
              value={replaceString}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  replace();
                }
              }}
              onChange={(e) => {
                setReplaceString(e.target.value);
              }}
              ref={(ref) => {
                if (!ref) return;
                replaceInput.current = ref;
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col span={4}>替换范围:</Col>
          <Col span={20}>
            <Radio.Group
              defaultValue={findMode}
              onChange={(e) => {
                setFindMode(e.target.value);
              }}
            >
              <Radio disabled={!selection} value={1}>
                所选对象
              </Radio>
              <Radio value={2}>当前页面</Radio>
              <Radio value={3}>全文档</Radio>
            </Radio.Group>
          </Col>
        </Row>
        <Row>
          <Col span={4}>选项:</Col>
          <Col span={20}>
            <Checkbox onClick={handleCaseSensitive} checked={caseSensitive}>
              英文区分大小写
            </Checkbox>
            <Checkbox onClick={handleWholeWord} checked={wholeWord}>
              完全匹配
            </Checkbox>
          </Col>
        </Row>

        <Row justify={'space-between'} gutter={8} style={{ marginTop: 16 }}>
          <Col>
            <Button disabled={replaceStart}>重置</Button>
          </Col>
          <Col>
            <Space>
              <Button disabled={replaceStart} onClick={closeWindow}>
                取消
              </Button>
              <Button onClick={replace} type={'primary'} loading={replaceStart}>
                替换
              </Button>
            </Space>
          </Col>
        </Row>
      </Space>
    </div>
  );
};

export default Replace;

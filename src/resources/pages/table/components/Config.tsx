import React, { FC } from 'react';
import { useIntl } from 'umi';
import styles from './style.less';

interface ConfigProps {
  config: any;
  current: string;
  ConfigComponent: any;
  onChange: Function;
}
const Config: FC<ConfigProps> = ({ config, ConfigComponent, onChange }) => {
  const { formatMessage } = useIntl();

  const onChangeField = (...args: any[]) => {
    const { target } = args[0];
    let newState: object | null = {};

    if (target) {
      const { type, name, checked, value } = target;

      if (type === 'checkbox') {
        newState = {
          [name]: checked,
        };
      } else if (type === 'radio' || type === 'text') {
        newState = {
          [name]: value,
        };
      } else if (type === 'tel') {
        const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
        if (
          (!Number.isNaN(value) && reg.test(value)) ||
          value === '' ||
          value === '-'
        ) {
          newState = {
            [name]: value,
          };
        }
      }
    } else {
      const name = args[0];
      const value = args[1];

      newState = {
        [name]: value,
      };
    }
    onChange({
      ...(config || ConfigComponent.defaultProps),
      ...newState,
    });
    newState = null; // 内存回收
  };

  return (
    <div>
      <div className={styles.title}>
        {formatMessage({ id: 'page.table.element' })}
      </div>
      <ConfigComponent
        {...(config || ConfigComponent.defaultProps)}
        onChangeField={onChangeField}
      />
    </div>
  );
};

export default Config;

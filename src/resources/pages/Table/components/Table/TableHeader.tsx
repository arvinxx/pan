import React, { FC } from 'react';
import { Resizable, ResizeCallbackData } from 'react-resizable';
import styles from './TableHeader.less';
import { useDispatch } from 'dva';

interface ResizeableTitleProps {
  onResize: (e: React.SyntheticEvent, data: ResizeCallbackData) => any;
  width: number;
  title: string;
  active: boolean;
  dataIndex: string;
}

const TableHeader: FC<ResizeableTitleProps> = (props) => {
  const { onResize, width, title, dataIndex, active, ...restProps } = props;

  const dispatch = useDispatch();

  return (
    <Resizable
      className={styles.container}
      width={width}
      height={0}
      handle={
        <span
          className={styles.handle}
          onClick={(e) => {
            e.stopPropagation();
          }}
        />
      }
      onResize={onResize}
      draggableOpts={{ enableUserSelectHack: false }}
    >
      <th {...restProps} />
    </Resizable>
  );
};

export default TableHeader;

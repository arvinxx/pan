import React, { FC } from 'react';
import { Resizable, ResizeCallbackData } from 'react-resizable';
import styles from './ResizeableTitle.less';

interface ResizeableTitleProps {
  onResize: (e: React.SyntheticEvent, data: ResizeCallbackData) => any;
  width: number;
}

const ResizeableTitle: FC<ResizeableTitleProps> = (props) => {
  const { onResize, width, ...restProps } = props;

  if (!width) {
    return <th {...restProps} />;
  }

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

export default ResizeableTitle;

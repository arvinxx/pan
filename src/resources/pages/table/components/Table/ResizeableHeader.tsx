import React, { ChangeEvent, FC, useState } from 'react';
import { Resizable, ResizeCallbackData } from 'react-resizable';
import styles from './ResizeableHeader.less';
import { useDispatch } from 'dva';
import { Input } from 'antd';

interface ResizeableTitleProps {
  onResize: (e: React.SyntheticEvent, data: ResizeCallbackData) => any;
  width: number;
  title: string;
  dataIndex: string;
}

const ResizeableHeader: FC<ResizeableTitleProps> = (props) => {
  const { onResize, width, title, dataIndex, children, ...restProps } = props;

  if (!width) {
    return <th {...restProps} />;
  }

  const [editTitle, setEditTitle] = useState(false);
  const dispatch = useDispatch();

  const handleText = (e: ChangeEvent<HTMLInputElement>) => {
    setEditTitle(false);
    dispatch({
      type: 'table/handleHeaderText',
      payload: {
        text: e.target.value,
        dataIndex,
      },
    });
  };
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
      {editTitle ? (
        <th>
          <Input
            defaultValue={title}
            autoFocus={editTitle}
            size={'small'}
            className={styles.input}
            onBlur={handleText}
            // @ts-ignore
            onPressEnter={handleText}
          />
        </th>
      ) : (
        <th
          // onClick={() => {
          //   setEditTitle(true);
          // }}
          onMouseEnter={() => {
            setEditTitle(true);
          }}
          {...restProps}
        >
          <div style={{ lineHeight: '24px' }}>{children}</div>
        </th>
      )}
    </Resizable>
  );
};

export default ResizeableHeader;

import { Input } from 'antd';
import React, { FC, useState } from 'react';
import { useDispatch } from 'dva';

interface EditableCellProps {
  field: 'titleText' | 'footerText';
  text: string;
}
const EditableCell: FC<EditableCellProps> = ({ field, text }) => {
  const [editTitle, setEditTitle] = useState(false);
  const dispatch = useDispatch();

  return editTitle ? (
    <Input
      defaultValue={text}
      onChange={(e) => {
        dispatch({
          type: 'table/save',
          payload: { [field]: e.target.value },
        });
      }}
      onBlur={() => {
        setEditTitle(false);
      }}
      onPressEnter={() => {
        setEditTitle(false);
      }}
    />
  ) : (
    <div
      // onClick={() => {
      //   setEditTitle(true);
      // }}
      onMouseEnter={() => {
        setEditTitle(true);
      }}
    >
      {text}
    </div>
  );
};

export default EditableCell;

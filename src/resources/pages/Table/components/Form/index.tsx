import React from 'react';

import { Form } from 'antd';

const { Item } = Form;
const CustomForm = () => {
  return (
    <Form>
      <Item children={<div>123</div>}></Item>
    </Form>
  );
};
export default CustomForm;

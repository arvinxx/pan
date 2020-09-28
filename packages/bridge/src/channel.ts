export const channel = {
  // 测试场
  TEST_FIELD: 'TEST_FIELD',

  REPLACE_CLOSE: 'REPLACE_CLOSE',
  REPLACE_REPLACE: 'REPLACE_REPLACE',
  REPLACE_FIND: 'REPLACE_FIND',

  GLOBAL_SYSTEM_INFO: 'GLOBAL_SYSTEM_INFO',
};

export type ChannelType = keyof typeof channel;

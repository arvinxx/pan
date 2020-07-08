const channel = {
  // 测试场
  TEST_FIELD: 'TEST_FIELD',

  REPLACE_CLOSE: 'REPLACE_CLOSE',
  REPLACE_REPLACE: 'REPLACE_REPLACE',
  REPLACE_FIND: 'REPLACE_FIND',
  REPLACE_RESET_PREF: 'REPLACE_RESET_PREF',

  GLOBAL_SYSTEM_INFO: 'GLOBAL_SYSTEM_INFO',
};
export default channel;
export type ChannelType = keyof typeof channel;

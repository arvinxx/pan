const channel = {
  REPLACE_CLOSE: 'REPLACE_CLOSE',
  REPLACE_REPLACE: 'REPLACE_REPLACE',
  REPLACE_FIND: 'REPLACE_FIND',
  REPLACE_RESET_PREF: 'REPLACE_RESET_PREF',
};
export default channel;
export type ChannelType = keyof typeof channel;

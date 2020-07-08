import { sendMsgToEnd } from '@/bridge';

/**
 * 生成 table
 */
export const replaceText = (state: any) => {
  sendMsgToEnd('REPLACE_REPLACE', state);
};

export const closeWin = () => {
  sendMsgToEnd('REPLACE_CLOSE');
};

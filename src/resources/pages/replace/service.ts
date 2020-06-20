import { sendMsg } from '@/bridge';

/**
 * 生成 table
 */
export const replaceText = (state: any) => {
  sendMsg('REPLACE_REPLACE', state);
};

export const closeWin = () => {
  sendMsg('REPLACE_CLOSE');
};
export const resetPreference = () => {
  sendMsg('REPLACE_RESET_PREF');
};

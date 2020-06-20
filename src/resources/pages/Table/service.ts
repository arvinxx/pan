import { sendMsgToEnd } from '@/bridge';
import { TableModelState } from '@/pages/Table/model';

/**
 * 生成 table
 */
export const generateTable = (table: TableModelState) => {
  sendMsgToEnd('TABLE_GENERATE', table);
};

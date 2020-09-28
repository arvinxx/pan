import { ChannelType } from '../../../../src/bridge/channel';
import { Dispatch } from '@/models/connect';

export default (dispatch: Dispatch) => (
  channel: ChannelType,
  payload?: any
) => {
  switch (channel) {
    case 'GLOBAL_SYSTEM_INFO':
      dispatch({
        type: 'global/save',
        payload: JSON.parse(payload),
      });
    case 'TABLE_FROM_LAYER_DATA':
      dispatch({
        type: 'table/init',
        payload: JSON.parse(payload),
      });
  }
};

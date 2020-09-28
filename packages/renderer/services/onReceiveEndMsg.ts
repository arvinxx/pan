import { ChannelType } from '@pan/bridge';
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
  }
};

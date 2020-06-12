import React from 'react';
import PropTypes from 'prop-types';

import { Icon, Tooltip } from 'antd';

export default class PreviewArea extends React.PureComponent {
  static contextTypes = {
    track: PropTypes.func,
  };

  handlePreview = () => {
    const { onPreviewChange } = this.props;
    const { track } = this.context;
    track({
      action: '点击预览图标',
    });
    onPreviewChange();
  };

  render() {
    const { config, PreviewComponent, large, preview } = this.props;
    return (
      <div className="preview-area">
        <div className="title">
          {window.ks_i18n.Preview}
          {!large && (
            <Tooltip
              placement="right"
              title={
                preview
                  ? window.ks_i18n['Editing Mode']
                  : window.ks_i18n['Preview Mode']
              }
            >
              <Icon
                className="preview-area-magnify"
                type={preview ? 'eye' : 'eye-o'}
                onClick={this.handlePreview}
              />
            </Tooltip>
          )}
        </div>
        <PreviewComponent {...(config || PreviewComponent.defaultProps)} />
      </div>
    );
  }
}

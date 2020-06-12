import React from 'react';

export default class DataArea extends React.PureComponent {
  render() {
    const { DataComponent, preview, ...restProps } = this.props;
    return (
      <div className="data-area">
        <div className="title">
          {preview ? window.ks_i18n.Preview : window.ks_i18n['Origin data']}
        </div>
        <DataComponent preview={preview} {...restProps} />
      </div>
    );
  }
}

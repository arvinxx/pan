import React, { Component, ErrorInfo } from 'react';
import { Button, Alert } from 'antd';
import { formatMessage } from 'umi';

interface ErrorBoundaryProps {
  onRetry: React.MouseEventHandler<HTMLElement>;
}
export default class ErrorBoundary extends Component<ErrorBoundaryProps> {
  state = {
    error: '',
    info: {
      componentStack: '',
    },
  };

  componentDidCatch(error: Error, info: ErrorInfo) {
    this.setState({ error, info });
  }

  render() {
    const { children, onRetry } = this.props;
    const { error, info } = this.state;
    if (error) {
      return (
        <div style={{ padding: 24 }}>
          <Alert
            type="error"
            message={error.toString()}
            showIcon
            description={
              <div>
                <div
                  style={{ overflow: 'auto', maxHeight: 'calc(100vh - 200px)' }}
                >
                  {info && info.componentStack ? info.componentStack : null}
                </div>
                <div style={{ marginTop: 24 }}>
                  <Button type="primary" onClick={onRetry}>
                    {formatMessage({ id: 'components.footer.home' })}
                  </Button>
                </div>
              </div>
            }
          />
        </div>
      );
    }
    return children;
  }
}

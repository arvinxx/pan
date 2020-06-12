import React, { Component } from 'react';
import { Button, Alert } from 'antd';

interface ErrorBoundaryProps {
  onRetry: React.MouseEventHandler<HTMLElement>;
}
export default class ErrorBoundary extends Component<ErrorBoundaryProps> {
  state = {
    error: undefined,
    info: {
      componentStack: '',
    },
  };

  componentDidCatch(error, info) {
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
                    重试
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

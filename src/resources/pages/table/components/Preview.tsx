import React, { FC } from 'react';
import { useIntl } from 'umi';
import { Tooltip } from 'antd';
import { EyeOutlined, EyeFilled } from '@ant-design/icons';
import styles from './style.less';

interface PreviewProps {
  config: any;
  PreviewComponent: any;
  large: boolean;
  preview: boolean;
  onPreviewChange: any;
}
const Preview: FC<PreviewProps> = ({
  config,
  PreviewComponent,
  large,
  preview,
  onPreviewChange,
}) => {
  const { formatMessage } = useIntl();

  const handlePreview = () => {
    onPreviewChange();
  };

  return (
    <div className={styles.preview}>
      <div className={styles.title}>
        {formatMessage({
          id: 'page.table.preview-area.preview',
        })}

        {!large && (
          <Tooltip
            placement="right"
            title={formatMessage({
              id: preview
                ? 'page.table.preview-area.editing-mode'
                : 'page.table.preview-area.preview-mode',
            })}
          >
            {preview ? (
              <EyeFilled className={styles.magnify} onClick={handlePreview} />
            ) : (
              <EyeOutlined className={styles.magnify} onClick={handlePreview} />
            )}
          </Tooltip>
        )}
      </div>
      <PreviewComponent {...(config || PreviewComponent.defaultProps)} />
    </div>
  );
};
export default Preview;

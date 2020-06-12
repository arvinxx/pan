import React, { FC } from 'react';
import { useIntl } from 'umi';
import styles from './style.less';

interface DataAreaProps {
  DataComponent: any;
  dataForHandsontable: any;
  tableProps: any;
  onDataChange: any;
  preview: boolean;
}
const DataArea: FC<DataAreaProps> = ({
  DataComponent,
  preview,
  ...restProps
}) => {
  const { formatMessage } = useIntl();

  return (
    <div>
      <div className={styles.title}>
        {formatMessage({
          id: preview
            ? 'page.table.data-area.preview'
            : 'page.table.data-area.origin',
        })}
      </div>
      <DataComponent preview={preview} {...restProps} />
    </div>
  );
};
export default DataArea;

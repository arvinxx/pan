import { TableConfig } from 'typings/table';

/**
 * 表格字符串
 */
export const tableString = (config: TableConfig, showComment: boolean) => {
  const {
    title,
    footer,
    checkable,
    bordered,
    size,
    loading,
    showHeader,
    footerText,
    titleText,
  } = config;
  return `<Table
  ${showComment ? '// 数据源\n  ' : ''}dataSource={dataSource}
  ${showComment ? '// 行 key\n  ' : ''}rowKey={'dataIndex'}
  ${showComment ? '// 分页器\n  ' : ''}pagination={false}
  ${showComment ? '// 显示边框\n  ' : ''}bordered={${bordered}}
  ${showComment ? '// 加载态\n  ' : ''}loading={${loading}}
  ${showComment ? '// 标题\n  ' : ''}title={${
    title ? "'" + titleText + "'" : title
  }}
  ${showComment ? '// 页脚\n  ' : ''}footer={${
    footer ? "'" + footerText + "'" : footer
  }}
  ${showComment ? '// 折叠收起\n  ' : ''}rowSelection={${checkable}}
  ${showComment ? '// 大小\n  ' : ''}size="${size}"
  ${showComment ? '// 是否显示表头\n  ' : ''}showHeader={${showHeader}}
/>`;
};

/**
 * 数据源字符串
 */
export const dataSourceString = (dataSource: any): string =>
  `const dataSource = ${JSON.stringify(dataSource, null, 2)}`;

/**
 * 列字符串
 */
export const columnsString = (columns: any): string =>
  `const columns = ${JSON.stringify(columns, null, 2)}`;

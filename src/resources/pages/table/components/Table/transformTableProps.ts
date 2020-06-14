export const defaultData = [
  ['Header 1', 'Header 2', 'Header 3', 'Header 4', 'Header 5'],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
];

/**
 * 解析表格
 **/
const transformTableProps = (data = defaultData) => {
  const header = defaultData[0];
  const columns = header.map((key, i) => ({
    title: (data[0] || [])[i],
    dataIndex: key,
    key,
    width: 120,
    style: {},
    render: (text: string | { content: string }) =>
      typeof text === 'string' ? text : text.content,
  }));
  const dataSource: any[] = [];
  data.slice(1, data.length).forEach((row, rowIndex) => {
    const newRow = {};
    row.forEach((item, columnIndex) => {
      // const cell = window.hotTableInstance.getCell(rowIndex, columnIndex);
      newRow[columns[columnIndex].dataIndex] = {
        content: item,
      };
    });
    dataSource.push(newRow);
  });
  return {
    dataSource,
    columns,
  };
};

// Return the API
export default transformTableProps;

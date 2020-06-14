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
  // const data = window.hotTableInstance.getData();
  const header = defaultData[0];
  const columns = header.map((key, i) => ({
    title: (data[0] || [])[i],
    dataIndex: key,
    key,
    width: 120,
    style: {
      //   flex: window.hotTableInstance.getColWidth(i),
      //   textAlign: window.hotTableInstance.getCell(0, i)
      //     ? textAlignToLeftOrRight(
      //         window.getComputedStyle(window.hotTableInstance.getCell(0, i), null)
      //           .textAlign
      //       )
      //     : undefined,
    },
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
        // style: {
        //   textAlign: cell
        //     ? textAlignToLeftOrRight(
        //         window.getComputedStyle(cell, null).textAlign
        //       )
        //     : undefined,
        // },
      };
    });
    dataSource.push(newRow);
  });
  return {
    dataSource,
    columns,
  };
};

const textAlignToLeftOrRight = (textAlign: 'start' | 'end' | string) => {
  if (textAlign === 'start') {
    return 'left';
  }
  if (textAlign === 'end') {
    return 'right';
  }
  return textAlign;
};

// Return the API
export default transformTableProps;

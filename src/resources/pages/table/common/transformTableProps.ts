/**
 * 解析表格
 **/
const transformTableProps = () => {
  if (!window.hotTableInstance || window.hotTableInstance.isDestroyed) {
    return {
      dataSource: [],
      columns: [],
    };
  }
  const data = window.hotTableInstance.getData();
  const header = window.hotTableInstance.getColHeader();
  const columns = header.map((key, i) => ({
    title: (data[0] || [])[i],
    dataIndex: key,
    key,
    style: {
      flex: window.hotTableInstance.getColWidth(i),
      textAlign: window.hotTableInstance.getCell(0, i)
        ? textAlignToLeftOrRight(
            window.getComputedStyle(window.hotTableInstance.getCell(0, i), null)
              .textAlign
          )
        : undefined,
    },
    render: (text) => text.content || text,
  }));
  const dataSource = [];
  data.slice(1, data.length).forEach((row, rowIndex) => {
    const newRow = {};
    row.forEach((item, columnIndex) => {
      const cell = window.hotTableInstance.getCell(rowIndex, columnIndex);
      newRow[columns[columnIndex].dataIndex] = {
        content: item,
        style: {
          textAlign: cell
            ? textAlignToLeftOrRight(
                window.getComputedStyle(cell, null).textAlign
              )
            : undefined,
        },
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

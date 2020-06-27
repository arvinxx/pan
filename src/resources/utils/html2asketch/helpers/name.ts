export enum NodeType {
  'div' = 1,
  'text' = 2,
}

export const getName = (nodeType: number) => {
  switch (nodeType) {
    case NodeType.div:
      return '编组';
    default:
      return nodeType.toString();
  }
};

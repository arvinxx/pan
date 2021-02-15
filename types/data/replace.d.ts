declare interface ReplaceModel {
  findString: string;
  /**
   * 替换对象
   */
  replaceString: string;
  /**
   * 全文档
   */
  document: boolean;
  regexActive: boolean;
  caseSensitive: boolean;
  wholeWord: boolean;
  count: number;

  findMode?: number;
  selection?: boolean;
  regex?: any;
  init?: boolean;
}

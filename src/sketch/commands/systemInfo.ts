declare global {
  namespace NodeJS {
    interface ProcessVersions {
      plugin: string;
      sketch: string;
    }
  }
}

/**
 * 输出插件基本信息
 */
export default (context: Sketch.Context) => {
  console.info('=======System Info=======');
  console.info(`开发环境: ${process.env.NODE_ENV}`);
  console.info(`Command Name: ${process.title}`);
  console.info(`Plugin Version: ${process.versions.plugin}`);
  console.info(`Sketch Version: ${process.versions.sketch}`);
  console.info('=======System End=======');
  context.document.showMessage('Hello Pan~🥘');
};

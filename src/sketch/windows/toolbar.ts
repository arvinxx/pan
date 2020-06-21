import { join } from 'path';

import { getWinURL } from '@/sketch/utils/windows';
import { winIdentifier } from './index';
import { isDev } from '@/common/env';

const toolbarWindow = () => {
  const wkwebviewConfig = WKWebViewConfiguration.alloc().init();

  const toolbar = WKWebView.alloc().initWithFrame_configuration(
    CGRectMake(0, 0, 40, 0),
    wkwebviewConfig
  );

  toolbar.setIdentifier(winIdentifier.TOOLBAR);

  // if (isDev) {
  //   toolbar.loadRequest(
  //     NSURLRequest.requestWithURL(NSURL.URLWithString(getWinURL('toolbar')))
  //   );
  // } else {
  console.log(process);
  const url = join(`/Resources/toolbar.html`);
  const webAppUrl = join(process.cwd(), `/Contents/Resources`);
  console.log(url);

  toolbar.loadFileURL(url, NSURL.fileURLWithPath(url), false);
  // }
  return toolbar;
};

export default toolbarWindow;

import { getWinURL } from '@/sketch/utils/windows';
import { winIdentifier } from './index';

const toolbarWindow = () => {
  const wkwebviewConfig = WKWebViewConfiguration.alloc().init();

  const toolbar = WKWebView.alloc().initWithFrame_configuration(
    CGRectMake(0, 0, 40, 0),
    wkwebviewConfig
  );

  toolbar.setIdentifier(winIdentifier.TOOLBAR);

  toolbar.loadRequest(
    NSURLRequest.requestWithURL(NSURL.URLWithString(getWinURL('toolbar')))
  );
  return toolbar;
};

export default toolbarWindow;

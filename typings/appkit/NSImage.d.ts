declare class NSImage {
  static alloc(): NSImage;
  initWithData(imgData: any): this;

  initWithContentsOfURL(url: NSURL);
}

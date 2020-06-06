declare interface SketchContext {
  api(): any;
  command: MSPluginCommand;
  document: MSDocument;
  scriptPath: string;
  scriptURL: NSURL;
  selection: NSArray;
}
declare interface SketchActionContext<T extends MSAction>
  extends SketchContext {
  actionContext: {
    document: MSDocument;
    action?: T;
    exports?: { path: string; request: MSExportRequest }[];
  };
  action: string;
}

/*
ABOUT:
The rest of this file are bare minimum types referenced in sketch.d.ts.
NS*, CG*, WK*: AppKit types
MS*: Sketch interface (@interface) or delegate (@protocol)
SCK*: More Sketch classes
others are likely more Sketch things
*/

/**
 * Instance properties in Mocha are set up as setters for the value type directly, and a
 * getter that returns a method that gets the value. We can't document this properly
 * in TypeScript, so we'll have to settle for this, and type your getters.
 */
type MochaProperty<T> = T | (() => T);

declare const NSUTF8StringEncoding: number;
declare const NSViewWidthSizable: number;
declare const NSViewHeightSizable: number;
declare const NSTitledWindowMask: number;
declare const NSWindowStyleMaskClosable: number;
declare const NSResizableWindowMask: number;
declare const NSBackingStoreBuffered: number;
declare const NSLayoutAttributeHeight: number;
declare const NSLayoutRelationEqual: number;
declare const NSLayoutAttributeTop: any;
declare const NSPasteboardTypeString: unique symbol;

declare function NSClassFromString(name: string): any;
declare function NSMakeRect(x: number, y: number, w: number, h: number): NSRect;
declare function NSMakeSize(w: number, h: number): NSSize;
declare class NSSize {
  width: number;
  height: number;
}
declare class AFAmazonS3Manager {}
declare class BCCache {}
declare class BCColorPickerBaseView {}
declare class BCDownloadManager {}
declare class BCEdgePaddings {}
declare class BCHSBColorPicker {}
declare class BCJSONDecoder {}
declare class BCJSONEncoder {}
declare class BCJSONZippedDecoder {}
declare class BCJSONZippedEncoder {}
declare class BCKeyEventActionTableView {}
declare class BCObjectPool {}
declare class BCPopover {}
declare class BCRangeMap {}
declare class BCRect {}
declare class BCSideBarViewController {}
declare class BCSketchToolRunner {}
declare class BCStructuredFile {}
declare class BCToolbarPopover {}
declare class BCToolbarPopoverContentViewController {}
declare class BCWindowBadge {}
declare class CABasicAnimation {}
declare class CALayer {}
declare class CGAffineTransform {}
declare class CGPoint {
  x: number;
  y: number;
}
declare class CGRect {}
declare class CGSize {}
declare class CHProgressSheet {}
declare class CHSheetController {}
declare class CHSingletonObject {}
declare class CHWindowController {}
declare class COScript {}
declare class DKDistortionTransform {}
declare class ECLogChannel {}
declare class ECLogHandler {}
declare class MSArtboardPresetsViewControllerDelegate {}
declare class MSAssetLibraryDelegate {}
declare class MSAssetPickerHeaderViewDelegate {}
declare class MSAssetPreferenceItemDelegate {}
declare class MSBasicDelegate {}
declare class MSCloudExportableDocument {}
declare class MSCloudShareUploadControllerDelegate {}
declare class MSCloudViewControllerDelegate {}
declare class MSColorInspectorDelegate {}
declare class MSColorInspectorSectionDelegate {}
declare class MSColorPreviewButtonDelegate {}
declare class MSContentDrawViewDelegate {}
declare class MSDocumentDataDelegate {}
declare class MSEditArtboardPresetViewControllerDelegate {}
declare class MSEventHandlerManagerDelegate {}
declare class MSFirstLineTypesetterDelegate {}
declare class MSGestureRecognizerDelegate {}
declare class MSGradientBarViewDelegate {}
declare class MSGradientEventHandlerDelegate {}
declare class MSGradientPointArrayDelegate {}
declare class MSHighLevelExportDelegate {}
declare class MSImporter {}
declare class MSModeModePickerDelegate {}
declare class MSPluginUpdater {}
declare class MSPopToolbarItemActionObject {}
declare class MSPresetPickerViewDelegate {}
declare class MSRenderingContextCacheProvider {}
declare class MSReorderingContainerDelegate {}
declare class MSSelectVectorHandleGestureRecognizerDelegate {}
declare class MSSidebarControllerDelegate {}
declare class MSSliceLayerWatcher {}
declare class MSStylePartInspectorDelegate {}
declare class MSTextLayerEditingDelegate {}
declare class MSTileDelegate {}
declare class MSTiledLayerDelegate {}
declare class MSTilePlacerDelegate {}
declare class MSTileRenderOperationDelegate {}
declare class MSVectorCanvasDelegate {}
declare class NSAffineTransform {}
declare class NSArray<T = NSObject> {
  [index: number]: T;
  count(): number;
  objectAtIndex(index: number): T;
}
declare class NSArrayController {}
declare class NSATSTypesetter {}
declare class NSAttributedString {}
declare class NSBezierPath {}
declare class NSBitmapImageRep {}
declare class NSBundle {}
declare class NSButton {}
declare class NSButtonCell {}
declare class NSCache {}
declare class NSClipView {}
declare class NSCollectionView {}
declare class NSCollectionViewItem {}
declare class NSColor {}
declare class NSColorSpace {}
declare class NSColorWell {}
declare class NSComboBox {}
declare class NSControl {}
declare class NSCursor {}
declare class NSData {}
declare class NSDate {}
declare class NSDictionary {
  [key: string]: any;
}
declare class NSDocument {}
declare class NSDocumentController {}
declare class NSEdgeInsets {}
declare class NSError {}
declare class NSEvent {}
declare class NSFont {}
declare class NSFormatter {}
declare class NSGradient {}
declare class NSGraphicsContext {}
declare class NSHashTable {}
declare class NSImage {}
declare class NSImageCell {}
declare class NSImageView {}
declare class NSIndexPath {}
declare class NSIndexSet {}
declare class NSKeyedArchiver {}
declare class NSKeyedUnarchiver {}
declare class NSLayoutConstraint {
  static constraintWithItem_attribute_relatedBy_toItem_attribute_multiplier_constant_(
    view1: NSView,
    attr1: number,
    relation: number,
    view2: NSView,
    attr2: number,
    multiplier: number,
    c: number
  ): NSLayoutConstraint;
}
declare class NSLayoutManager {}
declare class NSMapTable {}
declare class NSMenu {}
declare class NSMenuItem {}
declare class NSMutableArray {}
declare class NSMutableAttributedString {}
declare class NSMutableData {}
declare class NSMutableDictionary {}
declare class NSMutableSet {}
declare class NSMutableString {}
declare class NSNib {}
declare class NSNumber extends Number {}
declare class NSNumberFormatter {}
declare class NSObject {
  class(): any;
  className(): NSString;
  isKindOfClass<T extends NSObject>(arg: { new (): T }): this is T;
}
declare class NSOperation {}
declare class NSOperationQueue {}
declare class NSPanGestureRecognizer {}
declare class NSPopoverTouchBarItem {}
declare class NSPopUpButton {}
declare class NSPopUpButtonCell {}
declare class NSPredicate {}
declare class NSProgressIndicator {}
declare class NSResponder {}
declare class NSScrollView {}
declare class NSScrubberItemView {}
declare class NSSearchField {}
declare class NSSecureTextField {}
declare class NSSegmentedControl {}
declare class NSSet {}
declare class NSSlider {}
declare class NSSplitView {}
declare class NSStackView {}
declare class NSStoryboard {}
declare class NSString extends String {
  static stringWithContentsOfFile_encoding_error(...args: any[]): any;
  static stringWithFormat(...args: any[]): any;
}
declare class NSTableCellView {}
declare class NSTableView {}
declare class NSTextField {}
declare class NSTextFieldCell {}
declare class NSTextStorage {}
declare class NSTextView {}
declare class NSTimer {}
declare class NSToolbar {}
declare class NSToolbarItem {}
declare class NSTouchBar {}
declare class NSTouchBarItem {}
declare class NSUndoManager {}
declare class NSURL {
  static URLWithString(url: string): NSURL;
  static fileURLWithPath(path: string): NSURL;
}
declare class NSURLSession {}
declare class NSView {
  adjustSubviews(): void;
  subviews: MochaProperty<NSArray<NSView> | NSView[]>;
  identifier: MochaProperty<string>;
}
declare class NSViewController {}
declare class NSWindow {
  contentView(): NSView;
}
declare class NSWindowController {}
declare class NSWorkspace {
  static sharedWorkspace(): NSWorkspace;
  openURL(url: NSURL): boolean;
}
declare class NSXMLElement {}
declare class PDFFunction {}
declare class PDFParser {}
declare class PDFPattern {}
declare class PDFScanner {}
declare class SCKAPIOperation {}
declare class SCKShare {}
declare class SMKMirrorClient {}
declare class SMKMirrorController {}
declare class SnapItem {}
declare class SVGImporter {}
declare class WebView {}
declare class _CHTransformStruct {}
declare class SCKAvatar {}
declare class SCKShareUploadOperation {}
declare class NSProgress {}
declare class NSPanel {
  static alloc(): any;
}
declare class BCSingleton {}
declare class _MSImmutableOverrideValue {}
declare class MSOverlayRenderingDelegate {}
declare class _MSOverrideValue {}
declare class MSRenderer {}
declare class MSProfilingRendererDelegate {}
declare class CATextLayer {}
declare class _NSRange {}
declare class NSRange {}
declare class NSValue {}
declare class CGVector {
  dx: CGFloat;
  dy: CGFloat;
}
declare class CGFloat extends Number {}
declare class NSCopying {}
declare class NSFileWrapper {}
declare class NSURLSessionDataTask {}
declare class NSURLProtocol {}
declare class NSURLSessionTask {}
declare class NSMutableURLRequest {}
declare class SCKAPIAuthentication {}
declare class SCKAPISignable {}
declare class SCKArtboardViewport {}
declare class NSURLRequest {
  static requestWithURL(url: NSURL): NSURLRequest;
}
declare class NSURLSessionDownloadTask {}
declare class NSUUID {}
declare class NSURLSessionUploadTask {}
declare class SCKShareUploadDataSource {}
declare class WKWebView extends NSView {
  static alloc(): any;
  loadRequest(request: NSURLRequest): void;
  setAutoresizingMask(mask: number): void;
  evaluateJavaScript_completionHandler(js: string, cb: () => void): void;
}
declare class WKWebViewConfiguration {
  static alloc(): any;
}
declare class SCKCloudDocument {}
declare class MSAlignmentEngineDelegate {}
declare class MSLine {}
declare class MSInspectorSectionDelegate {}
declare class MSLineSegment {}
declare class MSCloudLoginWindowControllerDelegate {}
declare class MSDataMenuProviderDelegate {}
declare class MSDataSupplierManagerDelegate {}
declare class MSInspectorItemDelegate {}
declare class MSInspectorValueAdaptorDelegate {}
declare class MSSnappable {}
declare class MSLocalDataSupplierDelegate {}
declare class MSOverlayRendererDelegate {}
declare class MSPluginDataSupplierDelegate {}
declare class MSPluginLogAction {}
declare class MSMenuBuilderDelegate {}
declare class MSStylePartPreviewButtonDelegate {}
declare class MSStylePartInspectorItemDelegate {}
declare class MSTextLayerTextViewDelegate {}
declare class MSIncrementDecrementDelegate {}
declare class _TtC17SketchControllers22MSAlignmentEngineCycle {}
declare class NSValueTransformer {}
declare class NSTableRowView {}
declare class SCKAPIEnvironment {}
declare class SCKUser {}
declare class SCKOrganization {}
declare class MSCloudSharesControllerDelegate {}
declare class MSCollapsibleHeaderInspectorItemTarget {}
declare class MSColorHexStringTransformerDelegate {}
declare class MSDataSupplierDelegate {}
declare class MSGPUTexture {}
declare class MSInspectorFlowHandlerDelegate {}
declare class NSSegmentedCell {}
declare class NSSliderCell {}
declare class MSInspectorTableViewManagerDelegate {}
declare class MSLayerCoordinateSpace {}
declare class NSEnumerator {}
declare class MSInspectorMathValueAdaptorDelegate {}
declare class MTLCommandBuffer {}
declare class CAMetalDrawable {}
declare class MTLRenderPipelineState {}
declare class MTLCommandQueue {}
declare class CAMetalLayer {}
declare class MTLLibrary {}
declare class _opaque_pthread_mutex_t {}
declare class MTLTexture {}
declare class _TtC17SketchControllers15MSResizeSession {}
declare class NSOpenGLLayer {}
declare class NSOpenGLContext {}
declare class MSTiledRendererHostView {}
declare class NSTrackingArea {}
declare class _TtC6Sketch21MSResizingPreviewView {}

declare class NSToolbarItemGroup {}
declare class MSSharedStylesPopUpButtonCellDelegate {}
declare class MSStackViewScrollViewDelegate {}
declare class MSStylePartPreviewButtonWithBlendModeDelegae {}
declare class MSSymbolInstanceSectionDelegate {}
declare class MSTextHeaderInspectorItemDelegate {}
declare class MSGPURenderer {}
declare class MSInspectorItemProvider {}
declare class NSRect {}
declare class NSThread {
  static mainThread(): NSThread;
  threadDictionary(): NSDictionary;
}
declare class NSPasteboard {
  static generalPasteboard(): NSPasteboard;
  stringForType(t: typeof NSPasteboardTypeString): NSString;
  setString_forType(
    data: string | NSString,
    t: typeof NSPasteboardTypeString
  ): void;
}
declare class NSCollectionViewFlowLayout {}
declare class NSCollectionViewLayoutAttributes {}
declare class MSAssetCollectionViewSourceDelegate {}
declare class MSAsset {}
declare class MSAssetCollectionViewSourceItemProvider {}
declare class BCLine {}
declare class BCLineSegment {}
declare class MSAssetCollectionViewItemDelegate {}
declare class MSAssetPickerControllerDelegate {}
declare class MSAssetPickerScrubberControllerDelegate {}
declare class NSScrubber {}
declare class NSPointerArray {}
declare class _MSColorAsset {}
declare class MSColorComponentAdaptorDelegate {}
declare class MSColorComponentsControllerDelegate {}
declare class MSColorModePickerControllerDelegate {}
declare class MSColorModelPickerDelegate {}
declare class MSColorPickerViewControllerDelegate {}
declare class MSFlowInfo {}
declare class _MSFreeformGroupLayout {}
declare class MSFrequentColorsControllerDelegate {}
declare class MSFrequentImagesControllerDelegate {}
declare class MSFrequentObjectsControllerDelegate {}
declare class _MSGradientAsset {}
declare class BCColorPickerSliderView {}
declare class _MSGroupLayout {}
declare class _MSImmutableAssetContainer {}
declare class _MSImmutableColorAsset {}
declare class _MSImmutableFreeformGroupLayout {}
declare class _MSImmutableGradientAsset {}
declare class _MSImmutableGroupLayout {}
declare class _MSImmutableInferredGroupLayout {}
declare class _MSImmutableOverrideProperty {}
declare class _MSInferredGroupLayout {}
declare class _TtC17SketchControllers12MSLayerMover {}
declare class MSDragLayerToolUserInterface {}
declare class MTLBuffer {}
declare class MTLDepthStencilState {}
declare class NSCountedSet {}
declare class _MSOverrideProperty {}
declare class BCAtomicStack {}
declare class MSThemeImageViewDelegate {}

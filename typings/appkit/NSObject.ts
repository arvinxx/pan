declare class NSObject {
  /**
   * Implemented by subclasses to initialize a new object (the receiver)
   * immediately after memory for it has been allocated.
   *
   */
  init(): this;

  static alloc(): NSObject;
  class(): any;
  className(): NSString;
  isKindOfClass<T extends NSObject>(arg: { new (): T }): this is T;

  data(): NSData;

  dataLock(): NSObject;
  debugDescription(): NSString;
  description(): NSString;
  hash(): number;
}

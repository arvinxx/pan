import FileFormat from '@sketch-hq/sketch-file-format-ts';

/**
 * Versions based on discussion info: http://sketchplugins.com/d/316-sketch-version
 */
// Internal Sketch Version (ex: 95 => v47 and below)
const SKETCH_HIGHEST_COMPATIBLE_VERSION = '95';

/**
 * 将 符合 Sketch JSON 转换为原生图层类对象 , 如果出错则抛出错误
 * @param {FileFormat.AnyLayer | FileFormat.AnyObject} jsonTree JSON 对象
 * @param {String} version 最高版本号
 */
const fromSJSON = <T>(
  jsonTree: FileFormat.AnyLayer | FileFormat.AnyObject,
  version = SKETCH_HIGHEST_COMPATIBLE_VERSION
): T => {
  const err = MOPointer.alloc().init();
  const unarchivedObjectFromDictionary =
    // v64 及以上版本
    MSJSONDictionaryUnarchiver.unarchivedObjectFromDictionary_asVersion_corruptionDetected_error ||
    // v64 以下版本
    MSJSONDictionaryUnarchiver.unarchiveObjectFromDictionary_asVersion_corruptionDetected_error;
  const decoded = unarchivedObjectFromDictionary(jsonTree, version, null, err);

  if (err.value() !== null) {
    console.error(err.value());
    throw new Error(err.value());
  }

  const mutableClass = decoded.class().mutableClass();
  return mutableClass.alloc().initWithImmutableModelObject(decoded);
};

export default fromSJSON;

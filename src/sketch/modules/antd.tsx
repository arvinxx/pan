import React from 'react';
import sketch from 'sketch';
import Table from 'antd-sketchapp/lib/components/Table';
import Checkbox from 'antd-sketchapp/lib/components/Checkbox';
import { Page } from 'sketch/dom';
import { renderToJSON, makeSymbol, render, View } from 'react-sketchapp';

// import { fromSJSONDictionary } from '@skpm/sketchapp-json-plugin';

/**
 * 修复 Sketch 64 更改方法名导致的问题
 *
 * import { fromSJSONDictionary } from '@skpm/sketchapp-json-plugin';
 *
 * 当以下依赖版本发布后，可以换回原来实现
 * https://github.com/darknoon/sketchapp-json-plugin/issues/16
 *
 */
function fromSJSONDictionary64(jsTree) {
  const sketchVersion = process.versions.sketch;

  const err = MOPointer.alloc().init();
  const uace =
    // v64 及以上版本
    MSJSONDictionaryUnarchiver.unarchivedObjectFromDictionary_asVersion_corruptionDetected_error ||
    // v64 以下版本
    MSJSONDictionaryUnarchiver.unarchiveObjectFromDictionary_asVersion_corruptionDetected_error;

  const decoded = uace(jsTree, sketchVersion, null, null);

  if (err.value() !== null) {
    throw new Error(err.value());
  }
  const mutableClass = decoded.class().mutableClass();

  return mutableClass.alloc().initWithImmutableModelObject(decoded);
}

export default (props) => {
  const currentDocument = sketch.getSelectedDocument();
  const CheckboxJSX = () => <Checkbox name="normalBBB" />;
  const CheckedCheckboxJSX = () => <Checkbox checked name="checked" />;
  const NormalSymbol = makeSymbol(
    CheckboxJSX,
    'checkbox/normal',
    currentDocument
  );
  const CheckedSymbol = makeSymbol(
    CheckedCheckboxJSX,
    'checkbox/checked',
    currentDocument
  );
  const CheckableJSX = () => (
    <NormalSymbol
      name="normal status"
      overrides={{
        // @ts-ignore
        normalBBB: CheckedSymbol,
      }}
    />
  );
  // 解决 Symbol 丢失的问题
  // 需要手动插入一个 Checkbox Symbol 的实例到文档里
  if (props.checkable) {
    const tempPage = new Page({
      parent: sketch.getSelectedDocument(),
      name: '__antd-checkbox-symbol-temp_page__',
    });
    render(
      <View>
        <CheckableJSX />
      </View>,
      tempPage
    );
    tempPage.remove();
  }

  const layerJSON = renderToJSON(<Table {...props} />);

  return fromSJSONDictionary64(layerJSON);
};

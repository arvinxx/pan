import { UI, Settings, Document } from 'sketch';
import BrowserWindow from 'sketch-module-web-view';
import { isWebviewPresent, sendToWebview } from 'sketch-module-web-view/remote';
import pack from '../../../package.json';
import { getSettings, getWinURL, setSettings } from '../utils';
import channel from '@/common/channel';

const PREF_UNIQUE_KEY = 'cx.ap.sketch-find-and-replace.pref';
const STATE_UNIQUE_KEY = 'cx.ap.sketch-find-and-replace.state';

// to delete saved settings uncoment the next line
// Settings.setSettingForKey(PREFUNIQUKEY, JSON.stringify({}))
enum FindMode {
  'selection' = 1,
  'currentPage' = 2,
  'allPages' = 3,
}
interface State {
  findString: string;
  replaceString: string;
  document: boolean;
  regexActive: boolean;
  caseSensitive: boolean;
  wholeWord: boolean;
  count: number;
  darkMode?: boolean;
  findMode?: number;
  selection?: boolean;
  regex?: any;
  init?: boolean;
}

const defaultSettings: State = {
  findString: '',
  replaceString: '',
  document: false,
  regexActive: false,
  caseSensitive: false,
  wholeWord: false,
  count: 0,
};

// Clean find input so it's suitable for use in the regex
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

function escapeReplaceString(string) {
  return string;
}

// wholeword: (?:^|\b)(Occupation)(?=\b|\$)
// no wholeword: (Occupation)

// exact match ^(Occupation)$

// start ^(Occupation)
// end (Occupation)$

export default function() {
  const theme = UI && UI.getTheme ? UI.getTheme() : '';
  defaultSettings.darkMode = theme === 'dark';

  // load state

  const savedSate = getSettings(STATE_UNIQUE_KEY);
  console.log(`savedSate: ${savedSate}`);
  let state: State = defaultSettings;

  if (typeof savedSate === 'string' && savedSate == 'Loaded') {
    setSettings(STATE_UNIQUE_KEY, '');

    // load pref
    const savedSettings = JSON.parse(getSettings(PREF_UNIQUE_KEY));

    console.log(`savedSettings: ${savedSettings}`);
    if (savedSettings === 'object') {
      state = { ...defaultSettings, ...savedSettings };
    } else {
      setSettings(PREF_UNIQUE_KEY, JSON.stringify({}));
    }
  }

  setSettings(STATE_UNIQUE_KEY, 'Loaded');

  let layers = [];
  let overrides = [];

  const document = Document.getSelectedDocument();

  let selection = null;

  if (document) {
    selection = document.selectedLayers;
    if (selection.length > 0) {
      UI.message('Find and replace in the selection (v' + pack.version + ')');
      state = { ...state, findMode: 1, selection: true };
    } else {
      UI.message(
        'Find and replace in the current page (v' + pack.version + ')'
      );
      const page = document.selectedPage;
      selection = page.layers;
      state = { ...state, findMode: 2, selection: false };
    }
  }

  const saveSettings = (obj) => {
    setSettings(PREF_UNIQUE_KEY, obj);
  };

  const windowOptions: BrowserWindowConstructorOptions = {
    identifier: 'cx.ap.sketch-find-and-replace.webWiew',
    width: 460,
    height: 240,
    resizable: false,
    alwaysOnTop: true,
    fullscreenable: false,
    title: '查找替换',
    acceptFirstMouse: true,
    minimizable: false,
    maximizable: false,
    hidesOnDeactivate: false,
  };

  let browserWindow = new BrowserWindow(windowOptions);

  browserWindow.on('closed', () => {
    browserWindow = null;
  });

  browserWindow.loadURL(getWinURL('replace'));

  let contents = browserWindow.webContents;

  const initRegExp = (newState) => {
    state = newState;
    UI.message(`${state.findString} replace by ${state.replaceString}`);
    // reset layers
    layers = [];
    // reset overrides
    overrides = [];
    // wholeWord
    const rexExpFlag = `g${state.caseSensitive == true ? '' : 'i'}`;
    const regExpPrefix = state.wholeWord ? '(?:\\^|\\b)' : '';
    const regExpSufix = state.wholeWord ? '(?=\\b|\\$)' : '';
    const regExpPattern = state.regexActive
      ? `${regExpPrefix}${state.findString}${regExpSufix}`
      : `${regExpPrefix}(?:${escapeRegExp(state.findString)})${regExpSufix}`;
    const regex = new RegExp(regExpPattern, rexExpFlag);

    const { findMode } = state;
    console.log('--------------------------------');
    console.log('findMode: ' + findMode);

    switch (findMode) {
      case FindMode.selection:
        if (document && document.selectedLayers.length > 0) {
          selection = document.selectedLayers;
        }
        break;
      case FindMode.allPages:
        selection = document.pages;
        break;

      case FindMode.currentPage:
      default:
        selection = document.selectedPage.layers;
    }
    state.regex = regex;

    parseLayers(selection, regex);

    state.count = layers.length + overrides.length;
    // send count
    // log(JSON.stringify(state,null,2))
    updateSateWebview();
  };

  const replaceInLayer = (layer) => {
    const newStringValue = layer.text.replace(
      state.regex,
      escapeReplaceString(state.replaceString)
    );
    layer.text = newStringValue;
    if (layer.text != newStringValue) {
      layers.push(layer);
    }
  };

  const replaceInOverride = (override) => {
    const newStringValue = override.value.replace(
      state.regex,
      escapeReplaceString(state.replaceString)
    );
    override.value = newStringValue;
    if (override.value != newStringValue) {
      overrides.push(override);
    }
  };

  const updateSateWebview = (init?) => {
    if (init) {
      state.init = init;
    }
    if (isWebviewPresent(windowOptions.identifier)) {
      sendToWebview(
        windowOptions.identifier,
        `updateData('${JSON.stringify(state)}')`
      );
    }
    state = Object.assign({}, state, { init: false });
  };

  const layerTextMatch = () => {
    //state.findString
    return true;
  };

  const parseLayers = (layers) => {
    const { findMode } = state;
    // log(JSON.stringify(layers, null, 1))
    // recursive function
    layers.forEach((layer) => {
      switch (layer.type) {
        case 'Artboard':
          if (layer.layers && layer.layers.length > 0) {
            parseLayers(layer.layers);
          }
          break;

        case 'Group':
          // log('Group')
          if (layer.layers) {
            parseLayers(layer.layers);
          }
          break;

        case 'Text':
          // log('Text')
          if (layerTextMatch(layer)) {
            replaceInLayer(layer);
          }
          //layer.text = 'toto'
          break;

        case 'ShapePath':
          // log('ShapePath')
          break;

        case 'Shape':
          // log('Shape')
          break;

        case 'SymbolMaster':
          // log('SymbolMaster ' + document.selectedPage.name + ' ' + (findMode === 1))
          if (findMode === 1 || document.selectedPage.name === 'Symbols') {
            parseLayers(layer.layers);
          }
          break;

        case 'SymbolInstance':
          // log('SymbolInstance')
          parseOverrides(layer.overrides);
          break;

        case 'Image':
          break;

        default:
          if (layer.layers) {
            parseLayers(layer.layers);
          }
      }
    });
  };

  const parseOverrides = (overrides) => {
    overrides.forEach((override) => {
      // log('--- override ---')
      switch (override.affectedLayer.type) {
        case 'Text':
          // log('-Text')
          if (override.editable && override.property == 'stringValue') {
            replaceInOverride(override);
          }
          break;

        case 'SymbolInstance':
          // log('-SymbolInstance')
          break;

        case 'ShapePath':
          // log('-ShapePath')
          // log(override.value)
          break;

        case 'Shape':
          // log('-Shape')
          // log(override.value)
          break;

        case 'Image':
          // log('-Image')
          break;

        default:
        // log('#####--- Default override type: ' + override.affectedLayer.type)
        /* 
        if (override.layers) {
          parseLayers(override.layers)
        }
        */
      }
    });
  };

  contents.once('did-finish-load', () => {
    updateSateWebview(true);
  });

  contents.once(channel.REPLACE_CLOSE, () => {
    browserWindow.close();
  });

  contents.on('message', (s) => {
    UI.message(s);
  });

  contents.on('resetPref', () => {
    Settings.setSettingForKey(STATE_UNIQUE_KEY, '');
    Settings.setSettingForKey(PREF_UNIQUE_KEY, {});
    UI.message(`Reset Preference Settings 🖖! Done`);
  });

  contents.on('setDarkMode', (mode) => {
    state = { ...state, darkMode: mode };
    saveSettings(state);
    UI.message(`Set darkMode ${mode ? 'on 🌙' : 'off 😎'}!`);
  });

  contents.on(channel.REPLACE_FIND, (json) => {
    const newState = JSON.parse(json);
    if (newState.findString != state.findString) {
      //initRegExp(newState)
    }
  });

  contents.on(channel.REPLACE_REPLACE, (json) => {
    const newState = JSON.parse(json);
    initRegExp(newState);

    saveSettings(newState);
    browserWindow.close();
  });

  contents.on('selection', (json) => {
    state = Object.assign({}, JSON.parse(json));
    const { findMode } = state;
    if (document) {
      selection = document.selectedLayers;
      if (selection.length > 0 && findMode == 1) {
        UI.message('Find and replace in the selection');
        state = Object.assign({}, state, { findMode: 1, selection: true });
      } else {
        UI.message('Find and replace in the current page');
        const page = document.selectedPage;
        selection = page.layers;
        state = Object.assign({}, state, { findMode: 2, selection: false });
      }
    }
    saveSettings(state);
    updateSateWebview(false);
  });
}

import { Document, SymbolMaster } from 'sketch';
import { Artboard } from 'sketch/dom';

const document = Document.getSelectedDocument();

/**
 * 批量创建 Symbol
 **/
export const createSymbols = () => {
  document.selectedLayers.forEach((layer) => {
    // 如果是画板,直接创建
    let artboard: Artboard;
    if (layer.type === 'Artboard') {
      artboard = layer;
    } else {
      artboard = new Artboard({
        name: layer.name,
        frame: layer.frame,
        layers: [layer],
        parent: document.selectedPage,
      });
      layer.frame.x = 0;
      layer.frame.y = 0;
    }
    SymbolMaster.fromArtboard(artboard);
  });
};

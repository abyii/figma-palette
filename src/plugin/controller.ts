figma.showUI(__html__);

figma.ui.resize(675, 650);

type PluginMessage = {
  type: 'add-to-figma';
  createVars: boolean;
  colors: string[];
  paletteName: string;
};

figma.ui.onmessage = async (msg: PluginMessage) => {
  if (msg.type === 'add-to-figma') {
    const frame = figma.createFrame();
    frame.layoutMode = 'HORIZONTAL';
    frame.layoutPositioning = 'AUTO';
    frame.overflowDirection = 'HORIZONTAL';
    frame.fills = [];
    frame.name = 'Palette ' + msg?.paletteName;
    let collection: VariableCollection | null = null;
    if (msg.createVars) {
      collection = figma.variables.createVariableCollection(`${msg?.paletteName}-colors`);
    }
    msg?.colors.forEach(async (_, i) => {
      const rect = figma.createRectangle();
      if (msg.createVars) {
        const colorVariable = figma.variables.createVariable(`${msg?.paletteName}-${i}`, collection?.id, 'COLOR');
        colorVariable.setValueForMode(collection.modes[0].modeId, figma.util.solidPaint(msg?.colors?.[i]).color);
        rect.fills = [figma.variables.setBoundVariableForPaint(rect.fills[0], 'color', colorVariable)];
      } else {
        rect.fills = [figma.util.solidPaint(msg?.colors?.[i])];
      }
      frame.appendChild(rect);
    });

    figma.currentPage.appendChild(frame);
    figma.currentPage.selection = [frame];
    figma.viewport.scrollAndZoomIntoView([frame]);
    figma.notify(`Added ${msg?.colors?.length} Shades as Rectangles ${msg?.createVars && 'and Created Variables.'}`);
  }
};

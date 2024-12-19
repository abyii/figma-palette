import { Palette } from '../app/entities/Palette';

figma.showUI(__html__);

figma.ui.resize(675, 650);

type PluginMessage = {
  type: 'add-to-figma';
  createVars: boolean;
  palette: Palette;
};

figma.ui.onmessage = (msg: PluginMessage) => {
  if (msg.type === 'add-to-figma') {
    const frame = figma.createFrame();
    frame.layoutMode = 'HORIZONTAL';
    frame.layoutPositioning = 'AUTO';
    frame.overflowDirection = 'HORIZONTAL';
    frame.fills = [];
    let collection;
    if (msg.createVars) {
      collection = figma.variables.createVariableCollection(`${msg?.palette?.name}-colors`);
    }
    msg?.palette?.lightnessChannel.forEach((_, i) => {
      const rect = figma.createRectangle();
      const oklchColor = `oklch(${msg?.palette.lightnessChannel[i]} ${msg?.palette.chromaChannel[i]} ${msg?.palette.hueChannel[i]})`;
      rect.fills = [figma.util.solidPaint(oklchColor)];
      frame.appendChild(rect);
      if (msg.createVars) {
        const colorVariable = figma.variables.createVariable(`${msg?.palette?.name}-${i}`, collection.id, 'COLOR');
        colorVariable.setValueForMode(collection.modes[0].modeId, figma.util.solidPaint(oklchColor).color);
      }
    });

    figma.currentPage.appendChild(frame);
    figma.currentPage.selection = [frame];
    figma.viewport.scrollAndZoomIntoView([frame]);
    figma.notify(
      `Added ${msg.palette?.lightnessChannel?.length} Shades as Rectangles ${
        msg.createVars && 'and Created Variables.'
      }`
    );
  }
};

figma.showUI(__html__);

figma.ui.resize(675, 650);

type Message = {
  type: 'add-to-figma';
  colors: [{ r: number; g: number; b: number }];
  createVars: boolean;
  name: string;
};

figma.ui.onmessage = (msg: Message) => {
  if (msg.type === 'add-to-figma') {
    const frame = figma.createFrame();
    frame.layoutMode = 'HORIZONTAL';
    frame.layoutPositioning = 'AUTO';
    frame.overflowDirection = 'HORIZONTAL';
    frame.fills = [];
    let collection;
    if (msg.createVars) {
      collection = figma.variables.createVariableCollection(`${msg.name}-colors`);
    }
    msg.colors.forEach((c, i) => {
      const rect = figma.createRectangle();
      rect.fills = [
        {
          type: 'SOLID',
          color: {
            r: c.r,
            g: c.g,
            b: c.b,
          },
        },
      ];
      frame.appendChild(rect);
      if (msg.createVars) {
        const colorVariable = figma.variables.createVariable(`${msg.name}-${i * 10}`, collection.id, 'COLOR');
        colorVariable.setValueForMode(collection.modes[0].modeId, { r: c.r, g: c.g, b: c.b });
      }
    });

    figma.currentPage.appendChild(frame);
    figma.currentPage.selection = [frame];
    figma.viewport.scrollAndZoomIntoView([frame]);
    figma.notify(`Added ${msg.colors.length} Shades as Rectangles ${msg.createVars && 'and Created Variables.'}`);
  }
};

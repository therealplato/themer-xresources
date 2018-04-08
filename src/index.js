import path from 'path';

const getPackageName = theme => `themer-xresources-${theme}`;
const getFilePath = (theme, filename) => path.join(getPackageName(theme), filename);
const getXresourcesFilePath = theme => getFilePath(theme, '.Xresources');

export const render = (colors) => {
  const colorSets = Object.entries(colors).map(([theme, colors]) => ({ theme: theme, colors: colors }));
  return [
    ...renderXresources(colorSets),
  ];
};

const renderXresources = colorSets => colorSets.map(colorSet => Promise.resolve({
  name: getXresourcesFilePath(colorSet.theme),
  contents: Buffer.from(
    `
!themer-xresources
#define base00 ${colorSet.colors.shade0}
#define base01 ${colorSet.colors.shade1}
#define base02 ${colorSet.colors.shade2}
#define base03 ${colorSet.colors.shade3}
#define base04 ${colorSet.colors.shade4}
#define base05 ${colorSet.colors.shade5}
#define base06 ${colorSet.colors.shade6}
#define base07 ${colorSet.colors.shade7}
#define base08 ${colorSet.colors.accent0}
#define base09 ${colorSet.colors.accent1}
#define base0A ${colorSet.colors.accent2}
#define base0B ${colorSet.colors.accent3}
#define base0C ${colorSet.colors.accent4}
#define base0D ${colorSet.colors.accent5}
#define base0E ${colorSet.colors.accent6}
#define base0F ${colorSet.colors.accent7}

#ifdef background_opacity
*background:   [background_opacity]base00
#else
*background:   base00
#endif
*foreground:   base0E
*cursorColor:  base0E
*pointerColorBackground:base01
*pointerColorForeground:base0E

*color0:       base00
*color1:       base08
*color2:       base0B
*color3:       base0A
*color4:       base0D
*color5:       base0E
*color6:       base0C
*color7:       base05

*color8:       base03
*color9:       base09
*color10:      base01
*color11:      base02
*color12:      base04
*color13:      base06
*color14:      base0F
*color15:      base07
!themer-xresources
`
  ),
}));

import Color from 'color';
import path from 'path';
import { version } from '../package.json';

const getPackageName = theme => `themer-hyper-${theme}`;
const getFilePath = (theme, filename) => path.join(getPackageName(theme), filename);
const getIndexFilePath = theme => getFilePath(theme, 'index.js');

export const render = (colors) => {
  const colorSets = Object.entries(colors).map(([theme, colors]) => ({ theme: theme, colors: colors }));
  return [
    ...renderPackageJsonFiles(colorSets),
    ...renderIndexFiles(colorSets),
  ];
};

const renderPackageJsonFiles = colorSets => colorSets.map(colorSet => Promise.resolve({
  name: getFilePath(colorSet.theme, 'package.json'),
  contents: Buffer.from(JSON.stringify({
    name: getPackageName(colorSet.theme),
    version,
    description: `${colorSet.theme} theme for Hyper.app, generated by themer`,
    keywords: [
      'themer',
      colorSet.theme,
      'hyper',
    ],
    main: getIndexFilePath(colorSet.theme),
  }, null, 2)),
}));

const renderIndexFiles = colorSets => colorSets.map(colorSet => Promise.resolve({
  name: getIndexFilePath(colorSet.theme),
  contents: Buffer.from(`
    module.exports.decorateConfig = config => {
      return Object.assign({}, config, {
        cursorColor: '${Color(colorSet.colors.accent6).fade(0.5).rgb().string()}',
        foregroundColor: '${colorSet.colors.shade6}',
        backgroundColor: '${colorSet.colors.shade0}',
        borderColor: '${colorSet.colors.shade0}',
        colors: {
          black: '${colorSet.colors.shade0}',
          red: '${colorSet.colors.accent0}',
          green: '${colorSet.colors.accent3}',
          yellow: '${colorSet.colors.accent2}',
          blue: '${colorSet.colors.accent5}',
          magenta: '${colorSet.colors.accent7}',
          cyan: '${colorSet.colors.accent4}',
          white: '${colorSet.colors.shade6}',
          lightBlack: '${colorSet.colors.shade1}',
          lightRed: '${colorSet.colors.accent1}',
          lightGreen: '${colorSet.colors.accent3}',
          lightYellow: '${colorSet.colors.accent2}',
          lightBlue: '${colorSet.colors.accent5}',
          lightMagenta: '${colorSet.colors.accent7}',
          lightCyan: '${colorSet.colors.accent4}',
          lightWhite: '${colorSet.colors.shade7}',
        },
      });
    };
  `),
}));

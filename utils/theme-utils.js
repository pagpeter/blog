const { COLOR_THEMES, FONT_THEMES } = require('../themes');

const THEME = 'default';

export function generateCssVariables() {
  const cssVars = {};
  const themeColors = COLOR_THEMES[THEME]?.colors || {};
  for (const [key, value] of Object.entries(themeColors)) {
    cssVars[`--theme-${key}`] = value;
  }
  cssVars['--theme-mono'] = FONT_THEMES.mono;

  return Object.entries(cssVars)
    .map(([key, value]) => `${key}: ${value};`)
    .join('\n');
}

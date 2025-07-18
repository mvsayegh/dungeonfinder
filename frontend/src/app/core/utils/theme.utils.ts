import { ThemePalette, ThemeToken } from '@core/models';
import { $dt, palette } from '@primeng/themes';

export function getThemeToken(token: string): ThemeToken {
  return $dt(token);
}

export function getThemePalette(paletteToken: string): ThemePalette {
  return palette(paletteToken);
}

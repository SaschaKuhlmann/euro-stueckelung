export type DocsSiteTheme = {
  name: string;
  displayName?: string;
  color: string;
  accent: string;
  isDefault: boolean;
};
export const themeModeOptions = [
  { viewValue: $localize`light`, value: 'light', icon: 'light_mode' },
  { viewValue: $localize`dark`, value: 'dark', icon: 'dark_mode' },
  { viewValue: $localize`system`, value: 'system', icon: 'desktop_windows' },
] as const;

export type themeMode = (typeof themeModeOptions)[number]['value'];

export const themeOptions: DocsSiteTheme[] = [
  {
    color: 'light-dark(#abc7ff, #005cbb)',
    accent: 'light-dark(#bec2ff, #343dff)',
    displayName: 'Azure',
    name: 'azure',
    isDefault: true,
  },
  {
    color: 'light-dark(#ffd9e1, #8f0045)',
    accent: 'light-dark(#964900, #ffb787)',
    displayName: 'Rose',
    name: 'rose',
    isDefault: false,
  },
  {
    color: 'light-dark(#ffd7f5, #810081)',
    accent: 'light-dark(#006d33, #00e472)',
    displayName: 'Magenta',
    name: 'magenta',
    isDefault: false,
  },
] as const;
export type theme = (typeof themeOptions)[number]['name'];

export type UiState = {
  mode: themeMode;
  theme: DocsSiteTheme;
};
export const defaultTheme = themeOptions.find((t) => t.isDefault)!;

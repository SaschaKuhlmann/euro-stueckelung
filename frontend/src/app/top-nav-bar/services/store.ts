import { effect, inject } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';

import type { DocsSiteTheme, themeMode, UiState } from './model';
import { StyleManager, ThemeModeStorage } from './theme.service';

// ---- initialize state directly from storage ----
function getInitialState(storage: ThemeModeStorage): UiState {
  return {
    mode: storage.getStoredThemeMode(),
    theme: storage.getStoredTheme(),
  };
}

export const UiStore = signalStore(
  { providedIn: 'root' },

  withState((storage = inject(ThemeModeStorage)) => getInitialState(storage)),

  withComputed(({ mode }) => {
    const isDarkmode = () => {
      const current = mode();
      if (current === 'system') {
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
      }
      return current === 'dark';
    };

    return { isDarkmode };
  }),

  withMethods((store) => ({
    setMode(mode: themeMode) {
      patchState(store, { mode });
    },
    setTheme(theme: DocsSiteTheme) {
      patchState(store, { theme });
    },
    clearTheme() {
      patchState(store, { theme: undefined });
    },
  })),

  // ---- Effects ----
  withHooks({
    onInit(store) {
      const storage = inject(ThemeModeStorage);
      const styleManager = inject(StyleManager);

      // persist mode when it changes
      effect(() => {
        storage.storeThemeMode(store.mode());
      });

      // persist + apply/remove theme stylesheet
      effect(() => {
        const theme = store.theme();
        if (theme) {
          storage.storeTheme(theme);
          styleManager.setStyle('theme', `${theme.name}.css`);
        } else {
          storage.clearTheme();
          styleManager.removeStyle('theme');
        }
      });

      // apply <body> color-scheme
      effect(() => {
        const current = store.mode();
        const colorScheme = current === 'system' ? 'light dark' : current;
        document.body.style.setProperty('color-scheme', colorScheme);
      });
    },
  })
);

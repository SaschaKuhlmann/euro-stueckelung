import { EventEmitter, Injectable } from '@angular/core';
import { defaultTheme, DocsSiteTheme, themeMode } from './model';

@Injectable({ providedIn: 'root' })
export class ThemeModeStorage {
  static modeKey = 'docs-theme-storage-current-mode';
  static themeKey = 'docs-site-theme';

  onModeUpdate = new EventEmitter<themeMode>();
  onThemeUpdate = new EventEmitter<DocsSiteTheme>();

  // ---- Mode ----
  storeThemeMode(mode: themeMode) {
    try {
      localStorage.setItem(ThemeModeStorage.modeKey, mode);
    } catch {
      console.warn('Failed to store mode');
    }
    this.onModeUpdate.emit(mode);
  }

  getStoredThemeMode(): themeMode {
    try {
      return (localStorage.getItem(ThemeModeStorage.modeKey) as themeMode) || 'system';
    } catch {
      return 'system';
    }
  }

  clearMode() {
    try {
      localStorage.removeItem(ThemeModeStorage.modeKey);
    } catch {
      console.warn('Failed to clear mode');
    }
  }

  // ---- Theme ----
  storeTheme(theme: DocsSiteTheme) {
    try {
      localStorage.setItem(ThemeModeStorage.themeKey, JSON.stringify(theme));
    } catch {
      console.warn('Failed to store theme');
    }
    this.onThemeUpdate.emit(theme);
  }

  getStoredTheme(): DocsSiteTheme {
    try {
      const saved = localStorage.getItem(ThemeModeStorage.themeKey);
      return saved ? (JSON.parse(saved) as DocsSiteTheme) : defaultTheme;
    } catch {
      console.warn('Failed to get stored theme returning default');
      return defaultTheme;
    }
  }

  clearTheme() {
    try {
      localStorage.removeItem(ThemeModeStorage.themeKey);
    } catch {
      console.warn('Failed to clear theme');
    }
  }
}

/**
 * Helper for managing runtime stylesheets.
 */
@Injectable({ providedIn: 'root' })
export class StyleManager {
  setStyle(key: string, href: string) {
    getLinkElementForKey(key).setAttribute('href', href);
  }

  removeStyle(key: string) {
    const existingLinkElement = getExistingLinkElementByKey(key);
    if (existingLinkElement) {
      document.head.removeChild(existingLinkElement);
    }
  }
}

function getLinkElementForKey(key: string) {
  return getExistingLinkElementByKey(key) || createLinkElementWithKey(key);
}

function getExistingLinkElementByKey(key: string) {
  return document.head.querySelector(`link[rel="stylesheet"].${getClassNameForKey(key)}`);
}

function createLinkElementWithKey(key: string) {
  const linkEl = document.createElement('link');
  linkEl.setAttribute('rel', 'stylesheet');
  linkEl.classList.add(getClassNameForKey(key));
  document.head.appendChild(linkEl);
  return linkEl;
}

function getClassNameForKey(key: string) {
  return `style-manager-${key}`;
}

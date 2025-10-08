import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { MatToolbar } from '@angular/material/toolbar';
import { MatTooltip } from '@angular/material/tooltip';
import { type language, languageOptions, LanguageService } from './services/language.service';
import {
  type DocsSiteTheme,
  type themeMode,
  themeModeOptions,
  themeOptions,
} from './services/model';
import { UiStore } from './services/store';

@Component({
  selector: 'app-top-nav-bar',
  imports: [MatToolbar, MatIconButton, MatIcon, MatMenu, MatMenuItem, MatMenuTrigger, MatTooltip],
  templateUrl: './top-nav-bar.html',
  styleUrl: './top-nav-bar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopNavBar {
  // Language change stuff
  languageOptions = languageOptions;
  languageService = inject(LanguageService);
  changeLanguage(language: language) {
    this.languageService.setLanguage(language);
  }

  // Theme change stuff
  ui = inject(UiStore);
  themes = themeOptions;
  themeModeOptions = themeModeOptions;

  currentTheme = this.ui.theme;
  currentMode = this.ui.mode;

  setMode(mode: themeMode) {
    this.ui.setMode(mode);
  }

  applyTheme(theme: DocsSiteTheme) {
    this.ui.setTheme(theme);
  }

  getModeIcon(name: themeMode) {
    return this.themeModeOptions.find((t) => t.value === name)!.icon; // find should never return undefined here, so this should be safe
  }
}

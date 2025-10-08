import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopNavBar } from './top-nav-bar/top-nav-bar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TopNavBar],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class App {
  protected readonly title = signal('frontend');
}

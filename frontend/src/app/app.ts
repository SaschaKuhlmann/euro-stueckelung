import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopNavBar } from './top-nav-bar/top-nav-bar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TopNavBar],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('frontend');
}

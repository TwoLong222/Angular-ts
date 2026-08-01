import { Component, signal } from '@angular/core';
import { DrinkList } from './drink-list/drink-list';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DrinkList],
  templateUrl: './app.html',
  styleUrl: './app.css',
})

export class App {
  protected readonly title = signal('bai-tap-tra-sua');
  protected readonly shopname = signal('quan tra sua Angular');
}
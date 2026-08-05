import { Component, inject, signal } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet, MatToolbarModule, MatSidenavModule, MatListModule, MatIconModule, MatButtonModule,
    RouterLinkWithHref
],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private breakpointObserver = inject(BreakpointObserver);
  private responsive = inject (BreakpointObserver);
  protected isMobile = signal(false);
  protected readonly isHandset = toSignal(
    this.breakpointObserver
      .observe(Breakpoints.Handset)
      .pipe(map(result => result.matches)),
    { initialValue: false }
  );

  constructor(){
    this.responsive.observe(Breakpoints.Handset)
    .subscribe(result =>{
      this.isMobile.set(result.matches);
    })
  }
}
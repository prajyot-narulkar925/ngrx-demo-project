import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ThemeService } from 'src/app/theme/theme.service';
import { isAuthenticated } from 'src/app/auth/state/auth.selector';
import { autoLogout } from 'src/app/auth/state/auth.actions';
import { AppState } from 'src/app/store/app.state';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isAuthenticated: Observable<boolean>;
  constructor(private store: Store<AppState>,private themeService: ThemeService) {}

  ngOnInit(): void {
    this.themeService.setLightTheme();

    this.isAuthenticated = this.store.select(isAuthenticated);
  }
  toggleTheme(){
    if (this.themeService.isDarkTheme()) {
      this.themeService.setLightTheme();
    } else {
      this.themeService.setDarkTheme();
    }
  }
  onLogout(event: Event) {
    // event.preventDefault();
    this.store.dispatch(autoLogout());
  }
}

import { Observable, Unsubscribable } from 'rxjs';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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

  @Output()
  onLogin = new EventEmitter<Event>();

  @Output()
  onLogoutBtn = new EventEmitter<Event>();

  @Output()
  onCreateAccount = new EventEmitter<Event>();
  
  @Input() authenticated:boolean;

  isAuthenticated: Observable<boolean>;

  subscription: Unsubscribable;

  constructor(private store: Store<AppState>,private themeService: ThemeService) {}

  ngOnInit(): void {
    this.themeService.setLightTheme();

    this.isAuthenticated = this.store.select(isAuthenticated);
    this.subscription = this.store.select(isAuthenticated).subscribe(res=>{
      this.authenticated=res;
      console.log(this.authenticated);
    })
    console.log(this.isAuthenticated);
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

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}

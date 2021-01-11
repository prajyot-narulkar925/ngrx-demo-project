import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { autoLogin } from './auth/state/auth.actions';
import { AppState } from './store/app.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ngrx-task-demo';
  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.store.dispatch(autoLogin());
  }
}

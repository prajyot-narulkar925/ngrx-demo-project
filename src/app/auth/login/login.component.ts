import { EventEmitter, Input, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { getErrorMessage } from 'src/app/store/Shared/shared.selector';
import { loginStart } from '../state/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  // loginForm: FormGroup;
  // errorMessage: Observable<string>;
  @Input() loginForm:FormGroup;
  submitted=false
  // @Output() btnClicked = new EventEmitter<boolean>();

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
    // this.errorMessage = this.store.select(getErrorMessage);

  }

  get email(){ return this.loginForm.get('email');}
  get password(){ return this.loginForm.get('password');}

  onLoginSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid){
      return;
    }
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
    this.store.dispatch(loginStart({ email, password }));
    this.submitted=false;
    this.loginForm.reset();
  }

}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { getErrorMessage } from 'src/app/store/Shared/shared.selector';
import { signupStart } from '../state/auth.actions';
import * as uuid from 'uuid';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  registerForm: FormGroup;
  // errorMessage: Observable<string>;
  submitted = false;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      firstName: new FormControl('', [Validators.required,Validators.minLength(4)]),
      lastName: new FormControl('', [Validators.required,Validators.minLength(4)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      // confirmPassword: new FormControl('', [Validators.required]),
    },
  //    {
  //     validator: PasswordMustMatch('password', 'confirmPassword')
  // }
  );
    // this.errorMessage = this.store.select(getErrorMessage);

  }

  onSignUpSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid){
      return;
    }
    const email = this.registerForm.value.email;
    const password = this.registerForm.value.password;
    const firstname = this.registerForm.value.firstName;
    const lastname = this.registerForm.value.lastName;
    const uniqueid = uuid.v4();

    this.store.dispatch(signupStart({ email, password,firstname,lastname,uniqueid }));
    this.submitted = false;
    this.registerForm.reset();
  }

}

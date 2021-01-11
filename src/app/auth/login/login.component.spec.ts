import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  const initialState = { };
  let store: MockStore;
  let formgroup:FormGroup;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports:[FormsModule,ReactiveFormsModule],
      providers:[ provideMockStore({ initialState }),]
    })
    .compileComponents();
    store = TestBed.inject(MockStore);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('component initial state', () => {
    expect(component.loginForm).toBeDefined();
    expect(component.loginForm.invalid).toBeTruthy();
  });

  it('submitted should be true when onSubmit()', () => {

    component.onLoginSubmit();
    expect(component.onLoginSubmit).toBeTruthy();
  });

  it('email field validity', () => {
    const email = component.loginForm.controls.email;
    expect(email.valid).toBeFalsy();

    email.setValue('');
    expect(email.hasError('required')).toBeTruthy();

  });

  it('email field type validation', () => {
    const email = component.loginForm.controls.email;
    expect(email.valid).toBeFalsy();

    email.setValue('testdf');
    expect(email.hasError('email')).toBeTruthy();

  });
  
  it('password field validity', () => {
    const password = component.loginForm.controls.password;
    expect(password.valid).toBeFalsy();

    password.setValue('');
    expect(password.hasError('required')).toBeTruthy();

  });

  it('Form invalid should be true when form is invalid', (() => {
    component.loginForm.controls.email.setValue('');
    component.loginForm.controls.password.setValue('')

    expect(component.loginForm.invalid).toBeTruthy();
  }));


});

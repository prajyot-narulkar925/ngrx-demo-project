import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupComponent } from './signup.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { User } from 'src/app/models/user.model';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  const initialState = { };
  let store: MockStore;
  let formgroup:FormGroup;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignupComponent ],
      imports:[FormsModule,ReactiveFormsModule],
      providers:[ provideMockStore({ initialState }),]
    })
    .compileComponents();
    store = TestBed.inject(MockStore);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("initialize signup form",()=>{

    const signupForm={
      firstName:'',
      lastName:'',
      email:"",
      password:'',
    }

    expect(component.registerForm.value).toEqual(signupForm);

  });

  it('form invalid when empty', () => {
    component.registerForm.controls.firstName.setValue('');
    component.registerForm.controls.lastName.setValue('');
    component.registerForm.controls.email.setValue('');
    component.registerForm.controls.password.setValue('');

    expect(component.registerForm.valid).toBeFalsy();
  });

  it('form should be valid', () => {
    component.registerForm.controls.firstName.setValue('abcd');
    component.registerForm.controls.lastName.setValue('pqrd');
    component.registerForm.controls.email.setValue('test@demo.com');
    component.registerForm.controls.password.setValue('123456');
    expect(component.registerForm.valid).toBeTruthy();
  });

  it('firstname field validity', () => {
    const fname = component.registerForm.controls.firstName;
    expect(fname.valid).toBeFalsy();

    fname.setValue('');
    expect(fname.hasError('required')).toBeTruthy();

  });

  it('firstname field validity minlength 4', () => {
    const fname = component.registerForm.controls.firstName;
    expect(fname.valid).toBeFalsy();

    fname.setValue('aa');
    expect(fname.hasError('minlength')).toBeTruthy();

  });

  it('lastname field validity', () => {
    const lname = component.registerForm.controls.lastName;
    expect(lname.valid).toBeFalsy();

    lname.setValue('');

    expect(lname.hasError('required')).toBeTruthy();

  });

  it('lastname field validity minlength 4', () => {
    const lname = component.registerForm.controls.lastName;
    expect(lname.valid).toBeFalsy();

    lname.setValue('aa');

    expect(lname.hasError('minlength')).toBeTruthy();

  });

  it('email field validity', () => {
    const email = component.registerForm.controls.email;
    expect(email.valid).toBeFalsy();

    email.setValue('');
    expect(email.hasError('required')).toBeTruthy();
  });


  it('password field validity', () => {
    const password = component.registerForm.controls.password;
    expect(password.valid).toBeFalsy();

    password.setValue('');
    expect(password.hasError('required')).toBeTruthy();

  });


  xit('submitting a form emits a user', () => {
    expect(component.registerForm.valid).toBeFalsy();
    component.registerForm.controls.firstName.setValue('abcd');
    component.registerForm.controls.lastName.setValue('pqrd');
    component.registerForm.controls.email.setValue('test@demo.com');
    component.registerForm.controls.password.setValue('123456');

    expect(component.registerForm.valid).toBeTruthy();

    // let user: User;
    // // Subscribe to the Observable and store the user in a local variable.
    // component.loggedIn.subscribe((value) => user = value);

    // // Trigger the login function
    // component.login();

    // // Now we can check to make sure the emitted value is correct
    // expect(user.email).toBe("test@test.com");
    // expect(user.password).toBe("123456789");
  });
});

import { HttpParams } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { getTestBed, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let injector: TestBed;
  let httpMock: HttpTestingController;
  let store: MockStore;
  const initialState = {  };
  let user = {
    id:'10',email:'test@test.com',password:'123456',firstname:'test',lastname:'test'
  }
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers:[AuthService, provideMockStore({ initialState })]

    });
    service = TestBed.inject(AuthService);
    injector = getTestBed();
    httpMock = injector.get(HttpTestingController);
    store = TestBed.inject(MockStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it("should call POST signup API to create a new item", () => {

    service.signUp(user.email,user.password,user.firstname,user.lastname,user.id).subscribe();

    let req = httpMock.expectOne({ method: "POST", url: environment.mockURL+'users/' });
    expect(req.request.body).toEqual(user);
  });

  
  it("should throw error when POST API fails", () => {
    let error: string;

      service.signUp(user.email,user.password,user.firstname,user.lastname,user.id).subscribe(null, e => {
      error = e;
    });

    let req = httpMock.expectOne({
      method: "POST",
      url: environment.mockURL +`users/`,
      
    });
    req.flush("Something went wrong", {
      status: 404,
      statusText: "Network error"
    });

    expect(error).toBeTruthy();
  });

  it("should call GET login API ", () => {

    service.login(user.email,user.password).subscribe();

    let req = httpMock.expectOne({ method: "GET", url: environment.mockURL+'users?email=test@test.com&password=123456'});
    expect(req.request.body).toEqual(null);
  });

  it("should throw error when GET login API fails", () => {
    let error: string;

      service.login(user.email,user.password).subscribe(null, e => {
      error = e;
    });

    const req = httpMock.expectOne(environment.mockURL+'users?email=test@test.com&password=123456');
    expect(req.request.method).toBe("GET");
    req.flush("Something went wrong", {
      status: 404,
      statusText: "Network error"
    });
      expect(error).toBeTruthy();
  });

  it("should format the user data from the response",()=>{

    let userData = service.formatUser(user);

    expect(userData).not.toBe(user)
  });

  it('should store the token in localStorage',
  () => {
    const user = new User('test@test.com','c4c18257-0928-4790-baad-4f852c574c4c','Test','test');

    service.setUserInLocalStorage(user);
    expect(localStorage.getItem('userData')).toEqual(JSON.stringify(user));
});


it('should clean stored userdata from localStorage',
    () => {
      localStorage.setItem('userData', 'anotherData');
      expect(service.logout()).not.toEqual('anotherData');
  });

  it('should get data stored from localStorage',
    () => {
      localStorage.setItem('userData', '{"email":"test@test.com","token":"c4c18257-0928-4790-baad-4f852c574c4c","firstname":"Test","lastname":"test"}');

      const user = new User('test@test.com','c4c18257-0928-4790-baad-4f852c574c4c','Test','test');

      expect(service.getUserFromLocalStorage()).toEqual(user)
  });

  it('should get data stored from localStorage',() => {
    localStorage.setItem('userData', null);

    expect(service.getUserFromLocalStorage()).toEqual(null)
});

it('tests error message switch case', () => {
  expect(service.getErrorMessage('EMAIL_NOT_FOUND')).toEqual('Email Not Found');
});

it('tests error message switch case', () => {
  expect(service.getErrorMessage('INVALID_PASSWORD')).toEqual('Invalid Password');
});

it('tests error message switch case', () => {
  expect(service.getErrorMessage('EMAIL_EXISTS')).toEqual('Email already exists');
});

it('tests error message switch default case', () => {
  expect(service.getErrorMessage('test')).toEqual('Unknown error occurred. Please try again');
});
});

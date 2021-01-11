import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { getTestBed, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { environment } from 'src/environments/environment';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let injector: TestBed;
  let httpMock: HttpTestingController;
  let store: MockStore;
  const initialState = {  };

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
    let user = {
      id:'10',email:'test@test.com',password:'123456',firstname:'test',lastname:'test'
    }

    service.signUp(user.email,user.password,user.firstname,user.lastname,user.id).subscribe();

    let req = httpMock.expectOne({ method: "POST", url: environment.mockURL+'users/' });
    expect(req.request.body).toEqual(user);
  });

  
  it("should throw error when POST API fails", () => {
    let error: string;

      service.signUp('test@test.com','123456','test','test','10').subscribe(null, e => {
      error = e;
    });

    let req = httpMock.expectOne({
      method: "POST",
      url: environment.mockURL +`users/`
    });
    req.flush("Something went wrong", {
      status: 404,
      statusText: "Network error"
    });

    expect(error).toBeTruthy();
  });
});

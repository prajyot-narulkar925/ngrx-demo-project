import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthResponseData } from '../models/AuthResponseData.model';
import { User } from '../models/user.model';
import { AppState } from '../store/app.state';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  timeoutInterval: any;
  constructor(private http: HttpClient, private store: Store<AppState>) {}

  login(email: string, password: string): Observable<AuthResponseData> {
    let httpParams = new HttpParams();
    httpParams = httpParams.set("email", email).set("password",password);
    return this.http.get<AuthResponseData>(environment.mockURL +'users', {params:httpParams})

  }

  signUp(email: string, password: string,fname:string,lname:string,id:string): Observable<AuthResponseData> {
    const data={
      id:id,
      email:email,
      firstname:fname,
      lastname:lname,
      password:password
    }
      return this.http.post<AuthResponseData>(environment.mockURL +'users/', data)

  }

  formatUser(data: AuthResponseData) {

    const user = new User(
      data.email,
      data.id,
      data.firstname,
      data.lastname
    );
    return user;
  }

  getErrorMessage(message: string) {
    switch (message) {
      case 'EMAIL_NOT_FOUND':
        return 'Email Not Found';
      case 'INVALID_PASSWORD':
        return 'Invalid Password';
      case 'EMAIL_EXISTS':
        return 'Email already exists';
      default:
        return 'Unknown error occurred. Please try again';
    }
  }

  setUserInLocalStorage(user: User) {
    localStorage.setItem('userData', JSON.stringify(user));

  }

  getUserFromLocalStorage() {
    const userDataString = localStorage.getItem('userData');
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      const user = new User(
        userData.email,
        userData.token,
        userData.firstname,
        userData.lastname,
      );
      return user;
    }
    return null;
  }

  logout() {
    localStorage.removeItem('userData');
  }
}

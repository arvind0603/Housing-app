import { Injectable } from '@angular/core';
import { UserForRegister, UserForLogin } from '../models/user';
import { HttpClient } from '@angular/common/http';
// import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  baseUrl = "http://localhost:5009/api";

  authUser(user: UserForLogin) {

    return this.http.post(this.baseUrl + '/account/login', user);

    // let userArray = [];
    // if (localStorage.getItem('Users')){
    //   const userArrayObj = localStorage.getItem('Users');
    //   if(userArrayObj){
    //   userArray = JSON.parse(userArrayObj);
    //   }
    // }
    // return userArray.find((p: { userName: any; password: any; }) => {
    //   return p.userName === user.userName && p.password === user.password;
    // });
  }

  registerUser(user: UserForRegister) {
    return this.http.post(this.baseUrl + '/account/register', user);
  }



}

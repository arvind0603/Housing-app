import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

constructor() { }

authUser(user: User){
  let userArray = [];
  if (localStorage.getItem('Users')){
    const userArrayObj = localStorage.getItem('Users');

    if(userArrayObj){
    userArray = JSON.parse(userArrayObj);
    }
  }
  return userArray.find((p: { userName: any; password: any; }) => {
    return p.userName === user.userName && p.password === user.password;
  });
}

}

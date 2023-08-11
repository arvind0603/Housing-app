import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor() { }

  addUser(user: any) {
    let users = [];
    if(localStorage.getItem('Users')){
      const storedUsers = localStorage.getItem('Users');
      if(storedUsers!==null){
        users = JSON.parse(storedUsers);
      }
      users = [user, ...users];
    }else{
      users = [user];
    }
    localStorage.setItem('Users', JSON.stringify(users));
  }



}

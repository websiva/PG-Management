import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  private users = [
    { phoneNumber: '6385284228', userType: 'staying-person' },
    { phoneNumber: '9787277387', userType: 'staying-person' },
    { phoneNumber: '8344488188', userType: 'staying-person' },
    { phoneNumber: '8344288188', userType: 'admin' }
  ];
  constructor() { }

  getUserType(phoneNumber:string):string|null{
    const user = this.users.find(u=>u.phoneNumber===phoneNumber);
    return user?user.userType:null;
  }
}

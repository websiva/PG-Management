import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


export interface Residents {
  stayingPersonId: number;
  fullName: string;
  gender: string;
  phoneNumber: string;
  emailId: string;
  vehicle: boolean;
  vehicleType: string;
  vehicleNumber: string;
  purposeOfStaying: string;
  homeAddress: {
    addressId: number;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    stateName: string;
    pinCode: string;
  };
  purposeAddress: {
    addressId: number;
    companyName: string;
    place: string;
    landMark: string;
    district: string;
    stateName: string;
    pinCode: string;
  };
  isVacated: boolean;
  checkInDate: string; // Consider using Date type if necessary
  checkOutDate: string; // Consider using Date type if necessary
  bedId: number;
}

@Injectable({
  providedIn: 'root'
})
export class AdminRequestsService {

  constructor(private httpClient:HttpClient) { }

  apiUrl = "https://localhost:7197";
  

  getAllResidents():Observable<Residents[]>{
    return this.httpClient.get<Residents[]>(this.apiUrl+'/StayingPerson/GetAllUsers')
  }
}

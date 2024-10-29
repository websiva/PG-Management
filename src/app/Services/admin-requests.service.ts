import { HttpClient, HttpParams } from '@angular/common/http';
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

export interface Rooms{
  roomId: number,
  roomNo: string,
  noOfSharing: number,
  floorNo: string,
  isBedAvailableStatus: boolean,
  beds: [
      {
          bedId: number,
          bedType: string
      }
  ]
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

  getAllRooms():Observable<Rooms[]>{
    return this.httpClient.get<Rooms[]>(this.apiUrl+'/Room/AllRoomDetails');
  }

  //Get  available sharing dropdown values
  getAvailableSharing(){
    return this.httpClient.get(this.apiUrl+'/Bed/GetAvailableSharing');
  }

  //Get available beds by sharing and bedtype value
  getAvailableBedsBySharing(sharing:number,type:string){
    let params = new HttpParams();

    if(sharing>0&&type){
      params = params.append('sharing',sharing);
      params=params.append('bedType',type);
    }
    return this.httpClient.get(this.apiUrl+'/Bed/GetAvailableBedBySharingAndType',{params});
  }

  //get available bedtype based on sharing value
  getAvailableBedTypeBySharing(sharing:number){
    let params = new HttpParams();

    if(sharing>0){
      params = params.append('sharing',sharing);
    }
    return this.httpClient.get(this.apiUrl+'/Bed/GetAvailableBedTypeBySharing',{params});
  }


  //Create new resident
  CreateNewResident(formData:any){
    return this.httpClient.post(this.apiUrl+'/CreateNewUser',formData);
  }
}

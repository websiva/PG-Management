import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrl: './admin-navbar.component.scss'
})
export class AdminNavbarComponent {
  FullName:string="";
  Gender:string="";
  PhoneNumber:string="";
  EmailId:string="";
  Vehicle:boolean=false;
  VehicleType:string="";
  VehicleNumber:string="";
  PurposeOfStaying:string="";
  CheckInDate:Date=new Date();
  HomeAddressLine1:string="";
  HomeAddressLine2:string="";
  HomeCity:string="";
  HomeStateName:string="";
  HomePinCode:string="";
  CompanyName:string="";
  PurposePlace:string="";
  PurposeLandMark:string="";
  PurposeDistrict:string="";
  PurposeStateName:string="";
  PurposePinCode:string="";
  BedId:number=0;

  registrationForm:FormGroup;
  constructor(private router:Router,private formBuilder:FormBuilder){
    //apply validations
    this.registrationForm=this.formBuilder.group({
      fullName: ['', Validators.required],
      gender: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      emailId: ['', [Validators.required, Validators.email]],
      vehicle: [false],
      vehicleType: [''],
      vehicleNumber: [''],
      purposeOfStaying: ['', Validators.required],
      isVacated: [false],
      checkInDate: ['', Validators.required],
      checkOutDate: [''],

      // Home Address
      homeAddressLine1: ['', Validators.required],
      homeAddressLine2: [''],
      homeCity: ['', Validators.required],
      homeStateName: ['', Validators.required],
      homePinCode: ['', Validators.required],

      // Purpose Address
      companyName: ['', Validators.required],
      purposePlace: ['', Validators.required],
      purposeLandMark: ['', Validators.required],
      purposeDistrict: ['', Validators.required],
      purposeStateName: ['', Validators.required],
      purposePinCode: ['', Validators.required],

      // BedId
      bedId: ['', Validators.required]
    })
  }

  logout(){
    localStorage.removeItem("userLevel");
    localStorage.removeItem("phoneNumber");
    localStorage.setItem("isLoggedIn","false");

    this.router.navigate(['/login']);
  }

  createNewUser(){

  }
}

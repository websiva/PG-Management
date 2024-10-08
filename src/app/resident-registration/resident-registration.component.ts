import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resident-registration',
  templateUrl: './resident-registration.component.html',
  styleUrl: './resident-registration.component.scss'
})
export class ResidentRegistrationComponent {
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


  createNewUser(){
    console.log(this.registrationForm.value);
  }
}

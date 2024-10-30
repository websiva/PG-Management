import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminRequestsService } from '../Services/admin-requests.service';

@Component({
  selector: 'app-resident-registration',
  templateUrl: './resident-registration.component.html',
  styleUrl: './resident-registration.component.scss'
})
export class ResidentRegistrationComponent implements OnInit {
  availableSharing:any;
  availableBeds:any;
  availableBedType:any;
  registrationForm: FormGroup;

  
  constructor(private router: Router, private formBuilder: FormBuilder,private adminService:AdminRequestsService ) {
    //apply validations
    this.registrationForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      gender: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      emailId: ['', [Validators.required, Validators.email]],
      vehicle: [false, Validators.required],
      vehicleType: [''],
      vehicleNumber: [''],
      purposeOfStaying: ['', Validators.required],

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
      sharing: ['', Validators.required],
      bedType:['',Validators.required],
      bedId: [0,Validators.required]
    })
  }

ngOnInit(): void {
  this.getAvailableSharing();
}

  get hasVehicle() {
    return this.registrationForm.get('vehicle')?.value;
  }

  get noOfSharing(){
    return this.registrationForm.get('sharing')?.value;
  }

  get bedType(){
    return this.registrationForm.get('bedType')?.value;
  }

  //Get available sharing from DB
  getAvailableSharing(){
    this.adminService.getAvailableSharing().subscribe(data=>{
      this.availableSharing=data;
    })
  }

//Getting available bed from DB
  getAvailablebed(){
    this.adminService.getAvailableBedsBySharing(Number(this.noOfSharing),this.bedType).subscribe(data=>{
      this.availableBeds=data;
      console.log(this.availableBeds);
    })
  }

  //Getting bedtype from DB
  getAvailablebedType(){
    this.adminService.getAvailableBedTypeBySharing(Number(this.noOfSharing)).subscribe(data=>{
      this.availableBedType=data;
      console.log(this.availableBedType);
    })
  }


  createNewUser() {
   if(this.registrationForm.valid){
    const formData = {...this.registrationForm.value};
    formData.bedId = parseInt(formData.bedId);
    delete formData.sharing;
    delete formData.bedType;

    console.log(formData);

    this.adminService.CreateNewResident(formData).subscribe(response=>{
      alert("User created successfully");
    },(error)=>{
      alert("error when create user");
    });
   }
  }
}

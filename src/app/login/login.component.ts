import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginServiceService } from '../Services/login-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  phoneNumber:string="";
  otp:string="";
  loginForm:FormGroup;

  generatedOtp:string="";
  otpSended:boolean=false;
  userLevel:string|null="";

  constructor(private formBuilder:FormBuilder,private router:Router, private loginService:LoginServiceService){
    this.loginForm=this.formBuilder.group({
      phoneNumber:['',[Validators.required]],
      otp:['',[Validators.required]]
    })
  }

  sendOtp(){
    if(this.phoneNumber.length===10){

      //checking phone number in database
      this.userLevel=this.loginService.getUserType(this.phoneNumber);
      if(this.userLevel!==null){
        this.phoneNumber="";
        //register userlevel in localstorage
        localStorage.setItem('userLevel',this.userLevel);
        //Generating 4 digit otp
        this.generatedOtp=Math.floor(1000+Math.random()*9000).toString();
        this.otpSended=true;
        alert(this.generatedOtp);
      }
      else{
        alert('Phonenumber not available. Contact admin');
      }
    }
  }

  verifyOtp(){
    if(this.otp===this.generatedOtp){
      localStorage.setItem('isLoggedIn','true');
      localStorage.setItem('phoneNumber',this.phoneNumber);

      console.log(this.userLevel);
      if(this.userLevel==="staying-person"){
        this.router.navigate(['/user-dashboard']);
      }
      else if(this.userLevel==="admin"){
        this.router.navigate(['/admin']);
      }
    }
    else{
      alert('Invalid OTP. Please try again.');
    }
  }
}

import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AdminRequestsService } from '../Services/admin-requests.service';

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

@Component({
  selector: 'app-admin-residents',
  templateUrl: './admin-residents.component.html',
  styleUrl: './admin-residents.component.scss'
})
export class AdminResidentsComponent implements AfterViewInit,OnInit {

  Resident:Residents[]=[];
  constructor(private adminService:AdminRequestsService){}

  displayedColumns:string[] = ['stayingPersonId', 'fullName', 'phoneNumber', 'bedId','action'];
  datasource = new MatTableDataSource<Residents>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.getResidents();
  }
  //get data from service
  getResidents(){
    this.adminService.getAllResidents().subscribe((data:Residents[])=>{
      console.log(data);
      this.Resident = data;
      this.datasource.data = this.Resident;
    })
  }

  ngAfterViewInit(): void {
    this.datasource.paginator=this.paginator;
  }


  seeDetails(resident:Residents){

  }
}

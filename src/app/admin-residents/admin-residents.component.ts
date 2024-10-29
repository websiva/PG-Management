import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AdminRequestsService } from '../Services/admin-requests.service';
import { FormBuilder, FormGroup } from '@angular/forms';

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
export class AdminResidentsComponent implements AfterViewInit, OnInit {

  Resident: Residents[] = [];
  selectedProject: any;
  filteredRooms: string[] = [];
  filteredVehicleStatus: string[] = [];
  filteredProfessions: string[] = [];
  filteredstates: string[] = [];
  filterForm: FormGroup;


  constructor(private adminService: AdminRequestsService, private formBuilder: FormBuilder) {
    this.filterForm = this.formBuilder.group({
      bedId: [''],
      vehicle: ['All'],
      profession: ['All'],
      state: ['All']
    })
  }

  displayedColumns: string[] = ['stayingPersonId', 'fullName', 'phoneNumber', 'bedId', 'action'];
  datasource = new MatTableDataSource<Residents>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.getResidents();
  }
  //get data from service
  getResidents() {
    this.adminService.getAllResidents().subscribe((data: Residents[]) => {
      console.log(data);
      this.Resident = data;
      this.datasource.data = this.Resident;

      this.extractingVehicleValues();
      this.extractingProfewssion();
      this.extractingStatesValues();
    })
  }

  ngAfterViewInit(): void {
    this.datasource.paginator = this.paginator;
  }


  seeDetails(id: number) {
    this.selectedProject = this.Resident.find(p => p.stayingPersonId === id);
    if (this.selectedProject) {
      ///alert(JSON.stringify(this.selectedProject)); // Displays the full object as a string
    } else {
      //alert('Resident not found');
    }
  }


  //Filter section
  filterAction() {
    let twoWheeler = this.filterForm.get('vehicle')?.value;
    let profession = this.filterForm.get('profession')?.value;
    let state = this.filterForm.get('state')?.value;

    this.datasource.data = this.Resident.filter(item => {

      const vehicleMatches = !twoWheeler || twoWheeler === "All" || item.vehicle === (twoWheeler === "Yes" ? true : false);
      const professionMatches = !profession || profession === "All" || item.purposeOfStaying === profession;
      const states = !state || state === "All" || item.homeAddress.stateName === state;

      return vehicleMatches && professionMatches&&states;
    });

  }
  get bedId() {
    return this.filterForm.get('bedId')?.value;
  }

  searchBeds() {
    let bedId = Number(this.bedId);
    if (bedId > 0) {
      this.datasource.data = this.Resident.filter(resident => resident.bedId === bedId);
    }
    else {
      this.datasource.data = this.Resident;
    }
  }


  //extracting vehicle values from input array
  extractingVehicleValues() {
    const newArray = this.Resident.map(item => item.vehicle ? 'Yes' : 'No');

    const uniqueVehicleValues = Array.from(new Set(newArray))

    this.filteredVehicleStatus = ['All', ...uniqueVehicleValues];
  }

  //extracting profession from input
  extractingProfewssion() {
    const newArray = this.Resident.map(item => item.purposeOfStaying);

    const uniqueProfessionValues = Array.from(new Set(newArray));

    this.filteredProfessions = ['All', ...uniqueProfessionValues];
  }

  //extracting states from input
  extractingStatesValues() {
    const newArray = this.Resident.map(item => item.homeAddress.stateName);

    const uniqueStateValues = Array.from(new Set(newArray));

    this.filteredstates = ['All', ...uniqueStateValues];
  }

}

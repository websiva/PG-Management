import { Component, OnInit } from '@angular/core';
import { AdminRequestsService } from '../Services/admin-requests.service';
import { FormBuilder, FormGroup } from '@angular/forms';

export interface Room{
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

@Component({
  selector: 'app-admin-rooms',
  templateUrl: './admin-rooms.component.html',
  styleUrl: './admin-rooms.component.scss'
})
export class AdminRoomsComponent implements OnInit {

  Rooms:Room[]=[];
  filteredRooms: Room[] = [];
  selectedProject:Room[]=[];


  filteredRoomStatus: string[] = [];
  filteredFloors: string[] = [];
  filterForm: FormGroup;

  constructor(private adminService: AdminRequestsService, private formBuilder: FormBuilder) {
    this.filterForm = this.formBuilder.group({
      roomNo: [''],
      status: ['All'],
      floor: ['All']
    })
  }

  ngOnInit(): void {
    this.getRooms();
  }

  getRooms() {
    this.adminService.getAllRooms().subscribe((data:Room[]) => {
      this.Rooms = data;

      console.log(this.Rooms);
      this.extractingRoomStatus();
      this.extractingfilteredFloors();
    })
  }

  //extracting vehicle values from input array
  extractingRoomStatus() {

  }

  //extracting profession from input
  extractingfilteredFloors() {

  }

  filterAction() {
    let twoWheeler = this.filterForm.get('vehicle')?.value;
    let profession = this.filterForm.get('profession')?.value;
    let state = this.filterForm.get('state')?.value;

   /* this.filteredRooms = this.Rooms.filter(item => {

      const vehicleMatches = !twoWheeler || twoWheeler === "All" || item.vehicle === (twoWheeler === "Yes" ? true : false);
      const professionMatches = !profession || profession === "All" || item.purposeOfStaying === profession;
      const states = !state || state === "All" || item.homeAddress.stateName === state;

      return vehicleMatches && professionMatches&&states;
    });*/

  }

  searchRooms(){

  }

  seeDetails(roomId:number){
    this.filteredRooms = this.Rooms.filter(item=>item.roomId===roomId);
  }
}

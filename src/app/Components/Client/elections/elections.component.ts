import { ElectionsService } from './../../../services/elections.service';
import { from } from 'rxjs';
import { Employee } from 'src/app/models/employee';
import { EmployeeService } from './../../../services/employee.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-elections',
  templateUrl: './elections.component.html',
  styleUrls: ['./elections.component.css']
})
export class ElectionsComponent implements OnInit {
  electionList: any;
  constructor(private router: Router, private electionsService: ElectionsService) { }

  ngOnInit() {
    this.electionsService.getAllElectionList().subscribe(
      (result: any) => {
        console.log("list data: ", result);
        this.electionList = result.items;
      }

    );
  }
}

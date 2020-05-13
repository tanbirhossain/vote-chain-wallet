import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Election } from 'src/app/models/election';
import { ElectionsService } from 'src/app/services/elections.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.css']
})
export class CandidatesComponent implements OnInit {
  election: any;
  routeValue: number;
  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private electionsService: ElectionsService) {
  }
  ngOnInit() {
    this.routeValue = this.route.snapshot.params.id;
    console.log("param : ", this.route.snapshot.params.id);
    if (this.routeValue != null) {

      this.getEmployee(this.routeValue);
    }
  }
  getEmployee(id: number) {
    console.log("get ID: ", id);
    this.electionsService.getElectionDetails(id).subscribe(
      (result: any) => {
        console.log(result);
        this.election = result;
      }
    );
  }

}

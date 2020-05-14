import { Vote } from './../../../models/vote';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Election } from 'src/app/models/election';
import { ElectionsService } from 'src/app/services/elections.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-election-detail',
  templateUrl: './election-detail.component.html',
  styleUrls: ['./election-detail.component.css']
})
export class ElectionDetailComponent implements OnInit {
  election: any;
  candidateList: any;
  routeValue: string;

  constructor(private location: Location, private fb: FormBuilder,
    private route: ActivatedRoute, private router: Router, private electionsService: ElectionsService) {
  }
  ngOnInit() {

    this.routeValue = this.route.snapshot.params.id;
    console.log("param : ", this.route.snapshot.params.id);
    if (this.routeValue != null) {

      this.getEmployee(this.routeValue);
    }
  }
  getEmployee(id: string) {
    console.log("get ID: ", id);
    this.electionsService.getElectionDetails(id).subscribe(
      (result: any) => {
        console.log(result);
        this.election = result;
        this.candidateList = result.candidates;
      }
    );
  }

  userVote(electionAddress: string, candidateAddress: string, candidateName: string) {

    let uservote = new Vote(electionAddress, candidateAddress);
    console.log("VOTE : ", uservote);

    Swal.fire({
      title: 'Are you sure for ' + candidateName + ' ?',
      text: "You can't be able to vote the secound time for this election!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      showLoaderOnConfirm: true,
      confirmButtonText: 'Yes, Vote it!'
    }).then((result) => {
      if (result.value) {
        Swal.fire('Please wait');
        Swal.showLoading();
        this.electionsService.userVote(uservote).subscribe(
          (userResult: any) => {
            console.log("VoteResult: ", userResult);
            Swal.fire(
              'Voted!',
              'Your Voted Successfully.',
              'success'
            );
            this.router.navigate(['/elections']);
          },
          (err: HttpErrorResponse) => {
            console.log(err);
            Swal.fire('Oops...', err.error.Message, 'error');
          });
      }
    });

  }

  goBack() {
    if (window.history.length > 1) {
      this.location.back();
    } else {
      this.router.navigate(['/']);
    }
  }


}

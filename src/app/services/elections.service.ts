import { Vote } from './../models/vote';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { baseUrl } from '../models/config';

@Injectable({
  providedIn: 'root'
})

export class ElectionsService {
  constructor(private http: HttpClient) { }
  getAllElectionList() {
    return this.http.get(baseUrl + '/api/wallet/Election/GetElectionList');
  }
  getElectionDetails(electionAddress: string) {
    return this.http.get(baseUrl + '/api/wallet/Election/GetElectionDetailsByAddress?electionAddress=' + electionAddress);
  }
  userVote(vote: Vote) {
    return this.http.post<Vote>(baseUrl + '/api/wallet/Election/UserVote', vote);
  }
}


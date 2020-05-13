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
    return this.http.get(baseUrl + '/api/auth/Election/GetElectionList');
  }
  getElectionDetails(id: number) {
    return this.http.get(baseUrl + '/api/auth/Election/GetElectionDetails?electionId=' + id);
  }
  userVote(vote: Vote) {
    return this.http.post<Vote>(baseUrl + '/api/auth/Election/UserVote', vote);
  }
}


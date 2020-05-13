
export class Vote {
  electionAddress: string;
  candidate: string;
  /**
   *
   */
  constructor(electionAddress: string, candidate: string) {
    this.candidate = candidate;
    this.electionAddress = electionAddress;
  }
}

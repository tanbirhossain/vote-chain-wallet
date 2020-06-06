import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginPrivateComponent } from '../login-private/login-private.component';
import { LoginPrivate } from './../../../models/login-private';
import { PrivateAccountService } from 'src/app/services/private-account.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.scss']
})


export class ScannerComponent implements OnInit {
  availableDevices: MediaDeviceInfo[];
  currentDevice: MediaDeviceInfo = null;
  hasDevices: boolean;
  hasPermission: boolean;
  qrResult: any;
  guestExist: boolean;
  // loginPrivateComponent: LoginPrivateComponent;
  @ViewChild("LoginPrivateComponent") loginPrivateComponent: LoginPrivateComponent;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private accountService: PrivateAccountService) { }

  ngOnInit(): void {
  }

  // Clears the QR code scanned
  clearResult(): void {
    this.qrResult = null;
  }

  // Scans the QR code
  onCodeResult(resultString: string): void {
    this.login(resultString);

  }

  login(resultString: string): void {
    let user = new LoginPrivate(resultString);
    this.accountService.signInAccount(user).subscribe(
      (result: any) => {
        console.log("loginResult: ", result);
        localStorage.setItem('userPublicKey', result.publicKey);
        localStorage.setItem('userPrivateKey', user.privateKey);
        localStorage.setItem('userName', result.name);
        this.router.navigate(['/elections']);
      },
      (err: HttpErrorResponse) => {
        console.log(err);
        alert( err.error.Message);
      });
  }

  // Permission for the app to use the device camera
  onHasPermission(has: boolean): void {
    this.hasPermission = has;
  }



  // clearMessage() {
  //   setTimeout(() => {
  //     this.guestExist = null;
  //   }, 3000);
  // }


}

import { LoginPrivate } from './../../../models/login-private';
import { PrivateAccountService } from './../../../services/private-account.service';
import { User } from './../../../models/user';
import { Validators } from '@angular/forms';
import { AccountService } from './../../../services/account.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { BrowserQRCodeReader } from '@zxing/library';
declare var require: any;
@Component({
  selector: 'app-login-private',
  templateUrl: './login-private.component.html',
  styleUrls: ['./login-private.component.css']
})

export class LoginPrivateComponent implements OnInit {
  angForm: any;
  message: string;
  qrcodestring: any;
  qrCodeReader: any;
  url: any;
  imgSrc: string;

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: PrivateAccountService) { }

  ngOnInit() {
    this.createFrom();
  }

  createFrom() {
    this.angForm = this.fb.group({
      privateKey: ["", Validators.required]
    });
  }
  onFormSubmit() {
    this.LoginUserAccount(this.angForm.value);
  }


  onQRCodeUpload() {
    // tslint:disable-next-line: deprecation
    const codeReader = new BrowserQRCodeReader();

    const img = document.getElementById('img') as HTMLImageElement;
    console.log("Img", img);

    try {
      let result: any = codeReader.decodeFromImage(img);
      console.log("Retun function", result);
      console.log("Retun String", result.__zone_symbol__value.text);
      this.qrcodestring = result.__zone_symbol__value.text;
    } catch (err) {
      console.log("QR string Error: ", err);
    }
  }

  onSelectFile(event) { // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      // tslint:disable-next-line:no-shadowed-variable
      reader.onload = async (event) => { // called once readAsDataURL is completed
        this.url = event.target.result;
        // tslint:disable-next-line: deprecation
        const codeReader = new BrowserQRCodeReader();
        try {
          let oImg = document.createElement("img") as HTMLImageElement;
          oImg.setAttribute('src', event.target.result.toString());
          let result: any = codeReader.decodeFromImage(oImg);
          console.log("Retun Private Key:  ", await result.__zone_symbol__value.text);
          console.log("Retun function", await result);

          this.qrcodestring = await result.__zone_symbol__value.text;

          let userLoginPrivte = new LoginPrivate(result.__zone_symbol__value.text);
          this.LoginUserAccount(userLoginPrivte);
        } catch (err) {
          this.message = "Wronge image uploaded.Please try again.";
          console.log("QR string Error: ", err);
        }
      };
    }
  }

  LoginUserAccount(user: LoginPrivate) {
    console.log("loginBefore: ", user.privateKey);
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
        this.message = err.error.Message;
      });
  }

}

import { ScannerComponent } from './Components/Security/scanner/scanner.component';
import { ElectionDetailComponent } from './Components/Client/election-detail/election-detail.component';
import { CandidatesComponent } from './Components/Client/candidates/candidates.component';
import { ElectionsComponent } from './Components/Client/elections/elections.component';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './Components/Security/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { from } from 'rxjs';
import { EmployeeAddComponent } from './Components/employees/employee-add/employee-add.component';
import { EmployeeListComponent } from './Components/employees/employee-list/employee-list.component';
import { PageNotFoundComponent } from './Components/page-not-found/page-not-found.component';
import { LoginPrivateComponent } from './Components/Security/login-private/login-private.component';

const routes: Routes = [
  { path: "scanner", component: ScannerComponent },
  { path: "login", component: LoginComponent },
  { path: "login/private", component: LoginPrivateComponent },
  { path: "elections", component: ElectionsComponent, canActivate: [AuthGuard] },
  { path: "elections/detail/:id", component: ElectionDetailComponent, canActivate: [AuthGuard] },
  { path: "candidates/:id", component: CandidatesComponent },
  { path: "", redirectTo: "elections", pathMatch: "full" },
  { path: "**", component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

// "name": "votechainxui",
//   "version": "0.0.0",
//   "scripts": {
//     "ng": "ng",
//     "start": "ng serve",
//     "build": "ng build --prod",
//     "test": "ng test",
//     "lint": "ng lint",
//     "e2e": "ng e2e",
//     "lite-server": "lite-server"
//   },

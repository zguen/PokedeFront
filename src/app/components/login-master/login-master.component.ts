import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginMaster } from 'src/app/models/login-master';
import { MasterService } from 'src/app/services/master.service';

@Component({
  selector: 'app-login-master',
  templateUrl: './login-master.component.html',
  styleUrls: ['./login-master.component.css']
})
export class LoginMasterComponent {
  
  master: LoginMaster = {
    email: '',
    password: ''
  }
  isFormValidate = false;
  loginNone = false;


  constructor(private masterService: MasterService, private router: Router) { }
  
  login(loginForm: NgForm) {
    this.isFormValidate = true
    if (loginForm.valid) {
      this.masterService.loginMaster(this.master).subscribe({
        next: (response) => {
          sessionStorage.setItem('token', response.accessToken);
          this.router.navigate(['/master']);
          location.reload();
          
        },
        error: (error) => {
          this.loginNone = true;
        },
        
      });
    }
  }
}

import  Swal  from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { FirebaseLoginService } from '../../services/firebase-login.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { User } from '../../models/user.model';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = this.fb.group({
    email : ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+[\.][a-z]{2,3}$')]],
    password : ['', [Validators.required]],
  });
  user: User;
  constructor(private router: Router,  private fire: FirebaseLoginService, private fb : FormBuilder) { }
  ngOnInit(): void {
    if ( localStorage.getItem('email') ) {
      this.user.email = localStorage.getItem('email');
    }
    this.user = new User();
  }
  saveInfoUser(){
    this.user = this.loginForm.value;
    Swal.fire({
      allowOutsideClick: false,
      background : '#000000',
      icon: 'info',
      text: 'Espera por Favor..',
    });
    Swal.showLoading();
    this.fire.login( this.user )
      .subscribe( resp => {
        Swal.close();
        if ( this.user ) {
          localStorage.setItem('email', this.user.email);
          this.router.navigateByUrl('characters');
        }
      }, (err) => {
        console.log(err.error.error.message);
        Swal.fire({
          icon: 'error',
          title: 'Error al autenticar',
          text: err.error.error.message
        });
      });
  }
  validField(field : string):string{
    const validateField = this.loginForm.get(field);
    if(validateField.invalid && validateField.touched){
      return 'is-invalid';
    }
    if(validateField.valid && validateField.touched){
      return 'is-valid';
    }
  }
  invalidField(field : string):boolean{
    if(this.loginForm.get(field).invalid && this.loginForm.get(field).touched){
      return true;
    }
  }




}

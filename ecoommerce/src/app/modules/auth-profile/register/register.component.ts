import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';

declare function alertDanger([]):any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  email:string="";
  subname:string="";
  name:string="";
  password:string="";
  repeat_password:string="";

  constructor(
    public authService: AuthService,
    public router: Router,


  ){

  }
  ngOnInit(): void {
    if(this.authService.user){
      this.router.navigate(['/']);
    }
  }

  register(){

    if(
      !this.email ||
      !this.subname ||
      !this.name ||
      !this.password||
      !this.repeat_password
      
    ){
      alertDanger("TODOS LOS CAMPOS SON REQUERIDOS");


    }
    if(this.password != this.repeat_password){
      alertDanger("LAS CONTRASEÑAS DEBEN SER IGUALES");
    }
    let data = {
      email: this.email,
      subname: this.subname,
      name:this.name,
      password:this.password,
      repeat_password:this.repeat_password,
      rol:'cliente',

    };

    this.authService.registro(data).subscribe((resp:any)=>{
      console.log(resp);
    });
  }

}

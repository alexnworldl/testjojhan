import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import {HttpClient} from '@angular/common/http';
import { URL_SERVICES } from 'src/app/config/config';
import { catchError, map } from 'rxjs/operators';
import {of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user:any = null;
  token:any = null;


  constructor(
    private http: HttpClient,
    private router: Router,
  ) { 
    this.getLocalStorage();
  }

  getLocalStorage(){
    if(localStorage.getItem("token")){
      this.token = localStorage.getItem("token");
      this.user= JSON.parse(localStorage.getItem("user")?? '');// EN CASO DE QUE SALGA OTOROBJETO SALE UN STRING VACIO
    }else{
      this.token=null;
      this.user=null;
    }
  }

  login(email:string,password:string){
    let URL = URL_SERVICES + "users/login"
    return this.http.post(URL,{email,password}).pipe(
      map((resp:any)=>{
        //pipe para mapear la respuesta
        if(resp.USER_FRONTED && resp.USER_FRONTED.token){
          //almacenar el token en el local storage
          return this.localStorageSave(resp.USER_FRONTED)

        }else{
          //devuelve el status
          return resp;
        }
      }),
      catchError((error:any)=>{
        console.log(error);
        return of(error);

      })
    )

  }

  localStorageSave(USER_FRONTED:any){
    //almacenar el token del servidor
    localStorage.setItem("token",USER_FRONTED.token);
    localStorage.setItem("user",JSON.stringify(USER_FRONTED.user));

    return true;

  }

  registro(data:any){
    let URL = URL_SERVICES + "users/register";
    return this.http.post(URL,data);


  }
  logout(){
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    //this.router.navigate(["/auth-login"]);
    location.reload();

  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICES } from 'src/app/config/config';
import { AuthService } from '../../auth-profile/_services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class EcommerceAuthService {

  constructor(
    public authService: AuthService,
    public http: HttpClient,
  ) { }

  // DIRECCIÓN DE CLIENTE
  listAddressClient(user_id:any) {
    let headers = new HttpHeaders({'token': this.authService.token});
    let URL = URL_SERVICES+"address_client/list?user_id="+user_id;
    return this.http.get(URL,{headers:headers});
  }

  registerAddressClient(data:any) {
    let headers = new HttpHeaders({'token': this.authService.token});
    let URL = URL_SERVICES+"address_client/register";
    return this.http.post(URL,data,{headers: headers});
  }

  updateAddressClient(data:any) {
    let headers = new HttpHeaders({'token': this.authService.token});
    let URL = URL_SERVICES+"address_client/update";
    return this.http.put(URL,data,{headers: headers});
  }

  deleteAddressClient(address_client_id:any){
    let headers = new HttpHeaders({'token': this.authService.token});
    let URL = URL_SERVICES+"address_client/delete/"+address_client_id;
    return this.http.delete(URL,{headers: headers});
  }
  // 

  registerSale(data:any){
    let headers = new HttpHeaders({'token': this.authService.token});
    let URL = URL_SERVICES+"sale/register";
    return this.http.post(URL,data,{headers: headers});
  }

  //PERFIL DEL CLIENTE


  
  showProfileClient(data:any){
    let headers = new HttpHeaders({'token': this.authService.token});
    let URL = URL_SERVICES+"home/profile_client";
    return this.http.post(URL,data,{headers: headers});
  }
  updateProfileClient(data:any){
    let headers = new HttpHeaders({'token': this.authService.token});
    let URL = URL_SERVICES+"home/update_client";
    return this.http.post(URL,data,{headers: headers});
  }

  //REVIEW DE LOS PRODUCTOS
  registerProfileClientReview(data:any){
    let headers = new HttpHeaders({'token': this.authService.token});
    let URL = URL_SERVICES+"review/register";
    return this.http.post(URL,data,{headers: headers});
  }
  updateProfileClientReview(data:any){
    let headers = new HttpHeaders({'token': this.authService.token});
    let URL = URL_SERVICES+"review/update";
    return this.http.put(URL,data,{headers: headers});
  }

  
}

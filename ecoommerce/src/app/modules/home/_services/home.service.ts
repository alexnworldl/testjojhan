import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICES } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(
    public http: HttpClient,
  ) { }

  listHome(TIME_NOW:any = ''){
    console.log(TIME_NOW);
    let URL = URL_SERVICES+"/home/list?TIME_NOW="+TIME_NOW;
    return this.http.get(URL);
  }
}

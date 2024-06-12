import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { AuthService } from '../../auth';
import { URL_SERVICIOS } from 'src/app/config/config';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  isLoading$: Observable<boolean>;
  isLoadingSubject: BehaviorSubject<boolean>;
  
  constructor(
    private http: HttpClient,
    public authservice: AuthService,
  ) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.isLoading$ = this.isLoadingSubject.asObservable();
  }
  allCategorias(search=''){
    
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({'token':this.authservice.token});

    let URL = URL_SERVICIOS+"/categorias/list?search="+search;
    console.log(URL);
  
    return this.http.get(URL,{headers:headers}).pipe(
      finalize(()=> this.isLoadingSubject.next(false))
    );
    
  
  }
createCategoria(data){
  this.isLoadingSubject.next(true);
  let headers = new HttpHeaders({'token':this.authservice.token});
  let URL = URL_SERVICIOS+"/categorias/register";

  return this.http.post(URL,data,{headers:headers}).pipe(
    finalize(()=> this.isLoadingSubject.next(false))
  );
  

}

updateCategoria(data){
  this.isLoadingSubject.next(true);
  let headers = new HttpHeaders({'token':this.authservice.token});
  let URL = URL_SERVICIOS + "/categorias/update";

  return this.http.put(URL,data,{headers:headers}).pipe(
    finalize(()=> this.isLoadingSubject.next(false))
  );
  

}


deleteCategoria(categoria_id){
  this.isLoadingSubject.next(true);
  let headers = new HttpHeaders({'token':this.authservice.token});
  let URL = URL_SERVICIOS + "/categorias/delete?_id="+categoria_id;

  return this.http.delete(URL,{headers:headers}).pipe(
    finalize(()=> this.isLoadingSubject.next(false))
  );
  

}
  
}

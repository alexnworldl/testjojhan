import { Component, OnInit } from '@angular/core';
import { CategoriasService } from '../_services/categorias.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddNewCategorieComponent } from '../add-new-categorie/add-new-categorie.component';
import { Console } from 'console';
import { URL_BACKEND } from 'src/app/config/config';
import { EditNewCategorieComponent } from '../edit-new-categorie/edit-new-categorie.component';
import { DeleteNewCategorieComponent } from '../delete-new-categorie/delete-new-categorie.component';

@Component({
  selector: 'app-lits-categories',
  templateUrl: './lits-categories.component.html',
  styleUrls: ['./lits-categories.component.scss']
})
export class LitsCategoriesComponent implements OnInit {
  categorias:any=[];
  search:any = "";
  isLoading$:any = null;
  URL_BACKEND:any= URL_BACKEND;
  constructor(
    public _serviceCategoria: CategoriasService,
    public modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    this.isLoading$ = this._serviceCategoria.isLoading$;
    this.allCategorias();
  }
  allCategorias(){
    this._serviceCategoria.allCategorias(this.search).subscribe((resp:any)=>
    {
      console.log(resp);
      this.categorias = resp.categorias;
     
    })
  }
  openCreate(){

    const modalRef = this.modalService.open(AddNewCategorieComponent,{centered:true,size:'md'
    });

    modalRef.componentInstance.CategoriaC.subscribe((categoria:any)=>{
      this.categorias.unshift(categoria);
    })

  }
refresh(){
  this.search=""
  this.allCategorias();
}

editCategoria(categoria){
  const modalRef = this.modalService.open(EditNewCategorieComponent,{centered:true,size:'md' });
  modalRef.componentInstance.categoria_selected = categoria;


    modalRef.componentInstance.CategoriaE.subscribe((categoria:any)=>{
      let index = this.categorias.findIndex(item => item._id == categoria._id);
      if(index != -1){
        this.categorias[index] = categoria;
      }
      
    })
}
delete(categoria){
  const modalRef = this.modalService.open(DeleteNewCategorieComponent,{centered:true,size:'md' });
  modalRef.componentInstance.categoria_selected = categoria;


    modalRef.componentInstance.CategoriaD.subscribe((resp:any)=>{
      let index = this.categorias.findIndex(item => item._id == categoria._id);
      if(index != -1){
        this.categorias.splice(index,1);
      }
      
    })
}


}

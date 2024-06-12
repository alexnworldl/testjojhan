import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Toaster } from 'ngx-toast-notifications';
import { NoticyAlertComponent } from 'src/app/componets/notifications/noticy-alert/noticy-alert.component';
import { CategoriasService } from '../_services/categorias.service';
import { URL_BACKEND } from 'src/app/config/config';

@Component({
  selector: 'app-edit-new-categorie',
  templateUrl: './edit-new-categorie.component.html',
  styleUrls: ['./edit-new-categorie.component.scss']
})
export class EditNewCategorieComponent implements OnInit {

  @Output() CategoriaE: EventEmitter<any> = new EventEmitter();
  @Input() categoria_selected:any;

  name:any = null;
  isLoading$:any = null;
  imagen_file:any=null;
  imagen_previzualizacion:any=null;
  
  state:any = null;
  constructor(
    public _categoriaService: CategoriasService,
      public modal:NgbActiveModal,
      public toaster: Toaster,
    ) { }
  
    ngOnInit(): void {
      this.name = this.categoria_selected.title;
      this.imagen_previzualizacion = URL_BACKEND+'api/categorias/uploads/categoria/'+this.categoria_selected.imagen;
      console.log(this.categoria_selected._id);
      this.state = this.categoria_selected.state;
    }
    processFile($event){
      if($event.target.files[0].type.indexOf("image")<0){
        this.imagen_previzualizacion = null;
        this.toaster.open(NoticyAlertComponent,{text:`danger- 'Upps! Necesita ingrsar un archivo de tipo imagen`});
        return;
      }
  
      this.imagen_file = $event.target.files[0];
      let reader = new FileReader();
      reader.readAsDataURL(this.imagen_file);
      reader.onloadend = () => this.imagen_previzualizacion = reader.result;
    }
  
    save(){
      console.log(this.name);
      if(!this.name ){
        this.toaster.open(NoticyAlertComponent,{text:`danger- 'Upps! Necesita ingrsar todos los campos`});
        return;
      }
      let formData = new FormData();//es importante que la imagen se encapsule
      formData.append('_id',this.categoria_selected._id);
      formData.append('title',this.name);
      formData.append('state',this.state);
      if(this.imagen_file){
        formData.append('portada',this.imagen_file);
      }
     
      this._categoriaService.updateCategoria(formData).subscribe((resp:any)=>{
        console.log(resp);
        this.CategoriaE.emit(resp.categoria);
        this.modal.close();
  
      })
    }
    

}

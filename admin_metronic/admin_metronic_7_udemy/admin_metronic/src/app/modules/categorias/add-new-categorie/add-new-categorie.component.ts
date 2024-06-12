import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Toaster } from 'ngx-toast-notifications';
import { NoticyAlertComponent } from 'src/app/componets/notifications/noticy-alert/noticy-alert.component';
import { CategoriasRoutingModule } from '../categorias-routing.module';
import { CategoriasService } from '../_services/categorias.service';

@Component({
  selector: 'app-add-new-categorie',
  templateUrl: './add-new-categorie.component.html',
  styleUrls: ['./add-new-categorie.component.scss']
})
export class AddNewCategorieComponent implements OnInit {
  @Output() CategoriaC: EventEmitter<any> = new EventEmitter();

name:any = null;
isLoading$:any = null;
imagen_file:any=null;
imagen_previzualizacion:any=null;


constructor(
  public _categoriaService: CategoriasService,
    public modal:NgbActiveModal,
    public toaster: Toaster,
  ) { }

  ngOnInit(): void {
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
    if(!this.name || !this.imagen_file){
      this.toaster.open(NoticyAlertComponent,{text:`danger- 'Upps! Necesita ingrsar todos los campos`});
      return;
    }
    let formData = new FormData();//es importante que la imagen se encapsule
    formData.append('title',this.name);
    formData.append('portada',this.imagen_file);
    this._categoriaService.createCategoria(formData).subscribe((resp:any)=>{
      this.toaster.open(NoticyAlertComponent,{text:`success- 'Categoria  Registrada'`});
      console.log(resp);
      this.CategoriaC.emit(resp);
      this.modal.close();

    })
  }


}

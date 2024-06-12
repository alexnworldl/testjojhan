import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CategoriasService } from '../_services/categorias.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Toaster } from 'ngx-toast-notifications';
import { NoticyAlertComponent } from 'src/app/componets/notifications/noticy-alert/noticy-alert.component';

@Component({
  selector: 'app-delete-new-categorie',
  templateUrl: './delete-new-categorie.component.html',
  styleUrls: ['./delete-new-categorie.component.scss']
})
export class DeleteNewCategorieComponent implements OnInit {

  @Output() CategoriaD: EventEmitter<any> = new EventEmitter();
@Input() categoria_selected :any;

  constructor(
    public modal: NgbActiveModal,
    public categoriaService:CategoriasService,
    public toaster: Toaster,
  ) { }

  ngOnInit(): void {
  }

  delete(){
    
  this.categoriaService.deleteCategoria(this.categoria_selected._id).subscribe((resp:any)=>{
    console.log(resp);
    this.CategoriaD.emit("");//envia la respuesta 
    this.toaster.open(NoticyAlertComponent,{text:`success- 'Upps!Categoria Eliminada con éxito'`});
      this.modal.close();
  },(error)=>{
    if(error.error){
      this.toaster.open(NoticyAlertComponent,{text:`danger- '${error.error.message}'`});
    }
  })
    }
}

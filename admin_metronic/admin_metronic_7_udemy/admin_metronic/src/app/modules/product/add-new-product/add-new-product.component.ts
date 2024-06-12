import { Component, OnInit } from '@angular/core';
import { Toaster } from 'ngx-toast-notifications';
import { NoticyAlertComponent } from 'src/app/componets/notifications/noticy-alert/noticy-alert.component';
import { ProductService } from '../_services/product.service';
import { CategoriasService } from '../../categorias/_services/categorias.service';

@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.component.html',
  styleUrls: ['./add-new-product.component.scss']
})
export class AddNewProductComponent implements OnInit {
  title:any=null;
  sku:any = null;
  categorias:any=[];
  categoria:any="";
  price_cop:any=0;
  price_usd:any=0; 
  imagen_file:any=null;
  imagen_previzualizacion:any=null;
  description:any=null;
  resumen:any=null;
  tag:any=null;
  tags:any=[];
  isLoading$:any;
  constructor(
    public _productService:ProductService,
    public _categoriaService:CategoriasService,
    public toaster:Toaster,
  ) { }

  ngOnInit(): void {
    this.isLoading$ = this._productService.isLoading$;//verificar en ecommerce
    this._categoriaService.allCategorias().subscribe((resp:any)=>{

      console.log(resp);
      this.categorias = resp.categorias;
      this.loadServices();
    })
  }
  loadServices(){
    this._productService.isLoadingSubject.next(true);
    setTimeout(()=>{
      this._productService.isLoadingSubject.next(false);
    },50);
  }

  processFile($event){
    if($event.target.files[0].type.indexOf("image")<0){
      this.imagen_previzualizacion = null;
      this.toaster.open(NoticyAlertComponent,{text:`danger- 'Upps! Necesita ingrsar un archivo de tipo imagen`});
      return;//ver
    }

    this.imagen_file = $event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(this.imagen_file);
    reader.onloadend = () => this.imagen_previzualizacion = reader.result;
    this.loadServices();
  }

  addTag(){
this.tags.push(this.tag);
this.tag= "";

  }
removeTag(i){
this.tags.splice(i,1);
}

save(){
  if(!this.title || !this.categoria || !this.price_cop || !this.price_usd || !this.resumen  || !this.description || !this.sku || this.tags.lenght == 0 || !this.imagen_file){
  
    this.toaster.open(NoticyAlertComponent,{text:`danger- 'Upps! Necesitas digitar los campos`});
    return;
    
  }
  console.log(this.categoria);
  let formData = new FormData();
  formData.append('title',this.title);
  formData.append('categoria',this.categoria);
  formData.append('sku',this.sku);
  formData.append('price_cop',this.price_cop);
  formData.append('price_usd',this.price_usd);
  formData.append('resumen',this.resumen);
  formData.append('description',this.description);
  formData.append('tags',JSON.stringify(this.tags));
  formData.append('imagen',this.imagen_file);//va conectado con el controller

  this._productService.createProduct(formData).subscribe((resp:any)=>{

    console.log(resp);
    if(resp.code == 403){
      
      this.toaster.open(NoticyAlertComponent,{text:`danger- 'El producto ya existe, digita otro nombre'`});
      return;
    }else{
      this.toaster.open(NoticyAlertComponent,{text:`primary- 'El producto se registró con éxito'`});
      this.title = null;
      this.categoria = null; 
      this.sku = null;
      this.price_cop = null;
      this.price_usd = null;
      this.resumen = null;
      this.description = null;
      this.tags = [];
      this.imagen_file = null;
      this.imagen_previzualizacion = null;
      return;
    }
  })

}

}

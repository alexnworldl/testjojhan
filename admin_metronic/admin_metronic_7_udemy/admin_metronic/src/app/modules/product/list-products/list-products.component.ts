import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { Router, RouterModule } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteNewProductComponent } from '../delete-new-product/delete-new-product.component';
import { Toast, Toaster } from 'ngx-toast-notifications';
import { NoticyAlertComponent } from 'src/app/componets/notifications/noticy-alert/noticy-alert.component';
import { CategoriasService } from '../../categorias/_services/categorias.service';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss']
})
export class ListProductsComponent implements OnInit {
  products:any=[];
  isLoading$:any;
  search:any=null;
  categoria:any="";
  categorias:any =null;
  constructor(
    public _productService:ProductService,
    public _categoriaService:CategoriasService,

    public router:Router,
    public modalService:NgbModal,
    public toaster:Toaster,
    
    

  ) { }

  ngOnInit(): void {
    this.isLoading$ = this._productService.isLoading$;
    
     this.allProducts();
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
  refresh(){
    this.search = null;
    this.categoria = null;
    this.allProducts();
  }
  allProducts(){
    this._productService.allProducts(this.search,this.categoria).subscribe((resp:any)=>{
    console.log(resp);
    this.products = resp.products;
    }
    )
  }

  editProduct(product){

    this.router.navigateByUrl("/productos/editar-producto/"+product._id);

  }
  delete(product){
    const modalRef = this.modalService.open(DeleteNewProductComponent,{centered:true,size:'md' });
  modalRef.componentInstance.product = product;


    modalRef.componentInstance.ProductD.subscribe((resp:any)=>{
      let index = this.products.findIndex(item => item._id == product._id);
      if(index != -1){
        this.products.splice(index,1);
        this.toaster.open(NoticyAlertComponent,{text:`danger- 'la variedad ha sido eliminada'`});
      }
      
    })
}

}

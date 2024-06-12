import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Toaster } from 'ngx-toast-notifications';
import { NoticyAlertComponent } from 'src/app/componets/notifications/noticy-alert/noticy-alert.component';
import { DiscountService } from '../_services/discount.service';

@Component({
  selector: 'app-edit-new-discount',
  templateUrl: './edit-new-discount.component.html',
  styleUrls: ['./edit-new-discount.component.scss']
})
export class EditNewDiscountComponent implements OnInit {

  isLoading$:any;

  products:any = [];
  categorias:any = [];
  product:any = "";
  categoria:any = "";

  code:any = null;
  type_discount:any = 1;
  discount:any = 0;
  type_count:any = 1;
  num_use:any = 0;
  type_segment:any = 1;
  products_selected:any = [];
  categorias_selected:any = [];
  start_date:any = null;
  end_date:any = null;
  // 
  discount_id:any = null;
  discount_selected:any = null;
  type_campaign:any = 1;
  constructor(
    public _discountService:DiscountService,
    public toaster:Toaster,
    public activedrouter: ActivatedRoute,
    public datePipe: DatePipe,
  ) { }

  ngOnInit(): void {
    this.isLoading$ = this._discountService.isLoading$;
    this.activedrouter.params.subscribe((resp:any) => {
      this.discount_id = resp["id"];
    })
    this._discountService.discountConfig().subscribe((resp:any) => {
      console.log(resp);
      this.categorias = resp.categorias;
      this.products = resp.products;
      this.showDiscount();
    })
  }
  showDiscount(){
    this._discountService.showDiscount(this.discount_id).subscribe((resp:any) => {
      console.log(resp);
      this.discount_selected = resp.discount;
      this.type_discount = this.discount_selected.type_discount ;
      this.discount = this.discount_selected.discount ;
      // products_selected
      // categories_selected
      this.start_date = this.formatDate(this.discount_selected.start_date) ;
      this.end_date = this.formatDate(this.discount_selected.end_date);

      this.type_segment = this.discount_selected.type_segment;
      this.type_campaign = this.discount_selected.type_campaign ? this.discount_selected.type_campaign : 1;
      if(this.type_segment == 1){
        this.discount_selected.products.forEach(product_selected => {
          this.products.forEach(product => {
            if(product._id == product_selected._id){
              this.products_selected.push(product);
            }
          });
        });
      }else{
        this.discount_selected.categorias.forEach(categoria_selected => {
          this.categorias.forEach(categoria => {
            if(categoria._id == categoria_selected._id){
              this.categorias_selected.push(categoria);
            }
          });
        });
      }
    })
  }

  formatDate(date){
    return this.datePipe.transform(date,"yyyy-MM-dd",'UTC');
  }
  checkedTypeCampaign(value){
    this.type_campaign = value;
    this.checkedTypeSegment(1);
  }
  checkedTypeDiscount(value){
    this.type_discount = value;
  }
  checkedTypeCount(value){
    this.type_count = value;
  }
  checkedTypeSegment(value){
    this.type_segment = value;
    this.categorias_selected = [];
    this.products_selected = [];
  }

  addProductOrCategorie(){
    if(this.type_segment == 1){
      let INDEX = this.products_selected.findIndex(item => item._id == this.product);
      if(INDEX != -1){
        this.toaster.open(NoticyAlertComponent,{text:`danger-'UPPS ! EL PRODUCTO YA EXISTE, SELECCIONA OTRO'`});
        return;
      }else{
        let PRODUCT_S = this.products.find(item => item._id == this.product);
        this.product = null;
        this.products_selected.unshift(PRODUCT_S);
      }
    }else{
      let INDEX = this.categorias_selected.findIndex(item => item._id == this.categoria);
      if(INDEX != -1){
        this.toaster.open(NoticyAlertComponent,{text:`danger-'UPPS ! LA CATEGORIA YA EXISTE, SELECCIONA OTRO'`});
        return;
      }else{
        let CATEGORIA_S = this.categorias.find(item => item._id == this.categoria);
        this.categoria = null;
        this.categorias_selected.unshift(CATEGORIA_S);
      }
    }
  }
  removeProduct(product){
    let INDEX = this.products_selected.findIndex(item => item._id == product._id);
    if(INDEX != -1){
      this.products_selected.splice(INDEX,1);
    }
  }
  removeCategorie(categoria){
    let INDEX = this.categorias_selected.findIndex(item => item._id == categoria._id);
    if(INDEX != -1){
      this.categorias_selected.splice(INDEX,1);
    }
  }
  save(){

    if(!this.discount || !this.start_date || !this.end_date){
      this.toaster.open(NoticyAlertComponent,{text:`danger-'UPPS ! ALGUNOS CAMPOS ESTAN VACIOS'`});
      return;
    }
  
    if(this.type_segment == 1){
      if(this.products_selected.length == 0){
        this.toaster.open(NoticyAlertComponent,{text:`danger-'UPPS ! TIENES QUE SELECCIONAR UN PRODUCTO AL MENOS'`});
        return;
      }
    }
    if(this.type_segment == 2){
      if(this.categorias_selected.length == 0){
        this.toaster.open(NoticyAlertComponent,{text:`danger-'UPPS ! TIENES QUE SELECCIONAR UNA CATEGORIA AL MENOS'`});
        return;
      }
    }

    let PRODUCTS = [];
    let CATEGORIAS = [];
    let product_s = [];
    let categoria_s = [];
    this.products_selected.forEach(element => {
      PRODUCTS.push({_id: element._id});
      product_s.push(element._id);
    });

    this.categorias_selected.forEach(element => {
      CATEGORIAS.push({_id: element._id});
      categoria_s.push(element._id);
    });

    let data = {
      _id: this.discount_id,
      type_campaign: this.type_campaign,
      type_discount: this.type_discount,
      discount: this.discount,
      start_date: this.start_date,
      end_date: this.end_date,
      start_date_num: new Date(this.start_date).getTime(),
      end_date_num: new Date(this.end_date).getTime(),
      type_segment: this.type_segment,
      products: PRODUCTS,
      categorias: CATEGORIAS,
      product_s: product_s,
      categoria_s: categoria_s,
    };

    this._discountService.updateDiscount(data).subscribe((resp:any) => {
      console.log(resp);
      if(resp.message == 403){
        this.toaster.open(NoticyAlertComponent,{text:`danger-'${resp.message_text}'`});
        return;
      }else{
        this.toaster.open(NoticyAlertComponent,{text:`primary-'${resp.message_text}'`});
        // this.products_selected = [];
        // this.categories_selected = [];
        // this.code = null;
        // this.type_discount = 1;
        // this.discount = null;
        // this.type_count = 1;
        // this.num_use = null;
        // this.type_segment = 1;
        // this.start_date = null;
        // this.end_date = null;
        return;
      }
    })
  }

}

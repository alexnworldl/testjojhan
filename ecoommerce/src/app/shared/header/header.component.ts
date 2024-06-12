import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/modules/ecommerce-guest/_services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  listCarts:any=[];
  totalCarts:any = 0;
  search_product:any = null;
  products_search:any = [];
  user:any;

  source:any;
  constructor(

    public router: Router,
    public cartService: CartService,
  ){

  }

  ngOnInit(): void {
    this.user = this.cartService._authService.user;
    this.cartService.currentDataCart$.subscribe((resp:any)=>{
      console.log(resp);
      this.listCarts = resp;
      this.totalCarts = this.listCarts.reduce((sum:any,item:any)=>sum+ item.total, 0);
    })
    if(this.cartService._authService.user){
      this.cartService.lisCarts(this.cartService._authService.user._id).subscribe((resp:any)=>{
        console.log(resp);
        // this.listCarts = resp.carts;
        resp.carts.forEach((cart:any) => {
          this.cartService.changeCart(cart);
        });
        
        
      });
    }
    
  }
  isHome(){
    return this.router.url == "" || this.router.url == "/" ? true: false;
  }
  logout(){
    this.cartService._authService.logout();
  }
  removeCart(cart:any){
    this.cartService.deleteCart(cart._id).subscribe((resp:any) =>{
      console.log(resp);
      this.cartService.removeItemCart(cart);
    })
  }
}

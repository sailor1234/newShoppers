import{ProductDetails} from '../product-details/product-details';
import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';







 @Component({
   selector: 'page-home',
   templateUrl: 'home.html'
 })
 export class HomePage {

 public products:any;
 url: string;
 dataUrl: string;
 

    constructor(public navCtrl: NavController, public http: Http) {
      this.http.get('http://localhost:8101/products')
      .map(res =>res.json())
      .subscribe(data =>{
         this.products = data.products
      }, err =>{
        console.log("oops");
      });
        
    }

    openproductpage(product){
      this.navCtrl.push(ProductDetails, {"product": product});
        
    }
        
  
    }

  
  


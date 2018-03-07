import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {ProductDetails} from '../product-details/product-details';


@Component({
  selector: 'page-products-category',
  templateUrl: 'products-category.html',
})
export class ProductsCategory {
  products:any [];
  page: number;
  category: any[];
   json;
   i;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
       this.page =1;
       this.category = navParams.get('categories');
       //categories = this.categories;


       this.http.get('http://localhost:8101/products?search={"categories":[{"operator":"IN","value":["Laptops"]}]}')
      .map(res =>res.json())
      .subscribe(data =>{
         this.products = data.products
         //this.json= data;
         
         
      }, err =>{
        console.log("oops!!");
      });
      
  }

  openproductpage(product){
    this.navCtrl.push(ProductDetails, {"product": product});
      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductsCategory');
  }

}

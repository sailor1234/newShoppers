import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {MenuList} from '../menu-list/menu-list';



@Component({
  selector: 'page-product-details',
  templateUrl: 'product-details.html',
})
export class ProductDetails {
 public  product: any;
 public category:any[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.product = this.navParams.get('product');
    console.log(this.product);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductDetails');
  }

}

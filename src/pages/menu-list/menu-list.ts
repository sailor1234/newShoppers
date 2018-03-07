import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { HomePage } from '../home/home';
import {ProductsCategory}from '../products-category/products-category';


@Component({
  selector: 'page-menu-list',
  templateUrl: 'menu-list.html',
})
export class MenuList {
  @ViewChild('content') childNavCtrl: NavController;
  public categories: any[] ;
  url: string;
  dataUrl: string;

  homePage: typeof HomePage;
  constructor(public navCtrl: NavController, public navParams: NavParams,public http: Http) {
    this.homePage = HomePage
    


    this.http.get('http://localhost:8101/categories')
    .map(res =>res.json())
    .subscribe(data =>{
       this.categories = data.categories
    }, err =>{
      console.log("oops");

      
    });

    
   }
   ionViewDidLoad() {
    console.log('ionViewDidLoad Menu');
  }

  opencategory(categories){
    this.childNavCtrl.setRoot(ProductsCategory,{"categories": categories});

  }



}

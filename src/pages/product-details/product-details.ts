import { Component } from '@angular/core';
import { NavController, NavParams , ModalController, ToastController} from 'ionic-angular';
import {MenuList} from '../menu-list/menu-list';
import {Storage} from '@ionic/storage';
import {Cart} from '../cart/cart';




@Component({
  selector: 'page-product-details',
  templateUrl: 'product-details.html',
})
export class ProductDetails {
 public  product: any;
 public category:any[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public modalCtrl: ModalController, public toastCtrl: ToastController) {

    this.product = this.navParams.get('product');
    console.log(this.product);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductDetails');
  }

  AddToCart(product){
       this.storage.get("cart").then((data)=>{
         if(data == null || data.length == 0){
           data = [];
           data.push({
             "product": product,
             "quantity":1,
             "amount": parseFloat (product.price)
           })
         }else{
           let added = 0;
           for(let i = 0; i < data.length; i++){

             if(product._id == data[i].product._id){
               console.log("product already exist in the cart");
               let quantity = data[i].quantity;
               data[i].quantity = quantity+1;
               data[i].amount = parseFloat(data[i].amount)+ parseFloat(data[i].product.price);
               added = 1;
             }
           }
           if(added == 0){
            data.push({
              "product": product,
              "quantity":1,
              "amount":parseFloat (product.price)
            });
           }
         }
         this.storage.set("cart", data).then(()=>{
           console.log("cart updated");
           console.log(data);

           this.toastCtrl.create({
             message:"added to cart",
             duration:3000
           }).present();
           
         })
       });
  }

  openCart(){
    this.modalCtrl.create(Cart).present();
 };

}

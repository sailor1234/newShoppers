import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class Signup {

  user: any = {};
  billing_shipping_same: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {

    this.user.billing_address = {};
    this.user.shipping_address = {};
    this.billing_shipping_same = false;
  }
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }
  
  setBillingToShipping(){
    this.billing_shipping_same = !this.billing_shipping_same;
  }

  signup(){
    let userData = {
      user:{}
    }
    userData.user = {
      "user_fname": this.user.user_fname,
      "user_lname": this.user.user_lname,
      "user_email": this.user.user_email,
      "user_username":this.user.user_username,
      "user_password":this.user.user_password,
      "billing_address":{
        "user_fname": this.user.user_fname,
        "user_flname": this.user.user_lname,
        "address": this.user.billing_address.address,
        "country": this.user.billing_address.country,
        "state": this.user.billing_address.state,
        "city": this.user.billing_address.city,
        "postalcode": this.user.billing_address.postalcode,
        "phone": this.user.billing_address.phone
      },
      "shipping_address":{
        "user_fname": this.user.user_fname,
        "user_flname": this.user.user_lname,
        "address": this.user.shipping_address.address,
        "country": this.user.shipping_address.country,
        "state": this.user.shipping_address.state,
        "city": this.user.shipping_address.city,
        "postalcode": this.user.shipping_address.postalcode,
        "phone": this.user.shipping_address.phone,
      }
    
    }
    if(this.billing_shipping_same){
      this.user.shipping_address = this.user.shipping_address;
    }
    this.http.post('http://localhost:8101/user/signup',JSON.stringify(userData))
    .map(res =>res.json())
    .subscribe(data =>{
      console.log(data)
    });
    
  }

  
}

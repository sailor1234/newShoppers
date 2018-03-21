import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Http , Headers} from '@angular/http';
import 'rxjs/add/operator/map';


@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class Signup {

  user: any= {};
  billing_shipping_same: boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, alertCtrl: AlertController) {
    
    this.user.shipping_address={};
    this.user.billing_address={};
    
    
    this.billing_shipping_same = false;

  }
  
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad Signup');
  }
  
  setBillingToShipping(){
    this.billing_shipping_same = !this.billing_shipping_same;
  }

  signup(){
   
    
    //  let userData = {
    //    user:{}
    //  }
  let  userData = {
      firstname: this.user.firstname,
      lastname:this.user.lastname,
      email: this.user.email,
      username:this.user.username,
      password:this.user.password,
      billing_address:{
        firstname: this.user.fname,
        lastname:this.user.lname,
        address: this.user.billing_address.address,
        country: this.user.billing_address.country,
        state: this.user.billing_address.state,
        city: this.user.billing_address.city,
        postalcode: this.user.billing_address.postalcode,
        phone: this.user.billing_address.phone
      },
     shipping_address:{
      firstname: this.user.firstname,
      lastname:this.user.lastname,
       address: this.user.shipping_address.address,
       country: this.user.shipping_address.country,
       state: this.user.shipping_address.state,
       city: this.user.shipping_address.city,
       postalcode: this.user.shipping_address.postalcode,
       phone: this.user.shipping_address.phone,
     }

  // let userData = {
  //   "firstname": "abc",
  //   "lastname": "123",
  //   "email": "abc@abc.com",
  //   "username": "123",
  //   "password": "test",
  //   "address": "abc one two three",
  //   "country": "US",
  //   "state": "TX",
  //   "city": "Killeen",
  //   "postalcode": 73821,
  //   "phone": "555-555-5555"
  //   }
    
    }
    if(this.billing_shipping_same){
      this.user.shipping_address = this.user.shipping_address;
    }
    // this.http.post('http://localhost:8101/user/signup',(userData))
    // .subscribe((data)=>{
    //   console.log(data);
      
    //  })
    

    return new Promise(resolve => {
      let headers = new Headers();
      headers.append ('Content-Type', 'application/json');
    return  this.http.post("http://localhost:8101/user/signup",(userData),{headers:headers})
      .subscribe((data) => {
        resolve(data);
        
      });
      
    });
    

    
    
    
   }

  
}

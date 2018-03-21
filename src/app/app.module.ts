import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MenuList } from '../pages/menu-list/menu-list';
import {Signup} from '../pages/signup/signup';
import {Login} from '../pages/login/login';
import {ProductsCategory }from '../pages/products-category/products-category';
import {ProductDetails} from '../pages/product-details/product-details';
import {Cart} from '../pages/cart/cart';
import {HttpModule} from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MenuList,
    Signup,
    Login,
    ProductsCategory,
    ProductDetails,
    Cart,
    
    
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MenuList,
    Signup,
    Login,
    ProductsCategory,
    ProductDetails,
    Cart,
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
   
  ]
})
export class AppModule {}

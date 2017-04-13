import{Component,OnInit} from '@angular/core';
import {Router, CanActivate} from '@angular/router';
import {ConfirmService} from "app/error/confirm.service";
import {ConfirmComponent} from "app/error/confirm.component";
import{isLoggedin} from "app/gaurds/auth.guard"
import {sharedService} from 'app/common/services/sharedService';
import {ILoader} from 'app/common/services/sharedService';
import {ILogin} from 'app/login/login.services'
import {AuthenticationService} from 'app/login/login.services'
import {UserTO} from 'app/user/model/userTO'
@Component({
    selector:'my-app',
    //[GJ] : Call the login component on first call
    templateUrl:'./app/app.component.html'
    //templateUrl:'./app/login/login.component.html'
})
//@CanActivate(() => isLoggedin())
export class AppComponent implements OnInit{
    loader:ILoader;
    login : ILogin
    userTO:UserTO;
    username:string;
//    private get _hideTopbar() : boolean {
//        return this._data.get('hideTopbar');
//     };

    constructor(private ss:sharedService
    , private loginService : AuthenticationService) 
    {
        this.loader=this.ss.loader;
        this.login = this.loginService.Ilogin;
        
         //this.ss.showLoader()
        } //private _data:RouteData
  isloggedIn : boolean 
  imageUrl : string
  ngOnInit() {
     
      //alert('first');
      this.imageUrl = "/images/polaad_logo.png";
      this.isloggedIn = isLoggedin();
      this.userTO=new UserTO();
      this.userTO = this.loginService.getUserTOFromLocalStorage();
    //   if(this.userTO !=null)
    //   {
    //   this.username=this.userTO.UserLogin; 
    //   }
    //   else
    //   {
    //       this.username==null;
    //   }
  }
}
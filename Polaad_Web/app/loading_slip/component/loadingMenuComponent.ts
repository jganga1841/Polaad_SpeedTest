import{Component,ViewChild,OnInit} from '@angular/core';
import{MenuComponent} from'app/common/component/menu.component'
import myGlobalVal = require('app/global')
import {UserTO} from 'app/user/model/userTO'
import {AuthenticationService} from 'app/login/login.services'
@Component({
    selector:'my-loadingMenus',
    // template:'<h1>Hello</h1>'
    templateUrl:'app/loading_slip/loadingMenuUI.html'
})  



export class LoadingMenuComponent implements OnInit{
// @ViewChild(MenuComponent)
// public menuComponent:MenuComponent;
  isShowForCnF:boolean=false;
  isShowLoadingQuota : boolean = false;
  userTO:UserTO = new UserTO();
   constructor(
     private loginService : AuthenticationService,
     
    ){}

ngOnInit()
{
    debugger
   // this.menuComponent.getlist();
    this.userTO = this.loginService.getUserTOFromLocalStorage();
    if (this.userTO.UserRoleList[0].RoleId == myGlobalVal.UserRole.C_AND_F_AGENT) {
        this.isShowForCnF = true;
        //this.isShowLoadingQuota = false        
    }
    // else if(this.userTO.UserRoleList[0].RoleId == myGlobalVal.UserRole.LOADING_PERSON){
    //     this.isShowLoadingQuota = true
    // }
    else {
        this.isShowForCnF = false
        //this.isShowLoadingQuota = false
    }
}

}
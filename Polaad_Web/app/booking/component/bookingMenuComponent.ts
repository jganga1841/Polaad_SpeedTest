import{Component,ViewChild,OnInit} from '@angular/core';
import{MenuComponent} from'app/common/component/menu.component'
import {CommonServices} from'app/common/services/common.services'
import {BookingActionsTO} from 'app/booking/model/booking_information'
import {ErrorMessage} from 'app/error/errorMessage'
import {UserTO} from 'app/user/model/userTO'
import myGlobalVal = require('app/global')
import { ConfirmService } from 'app/error/confirm.service'
import {AuthenticationService} from 'app/login/login.services'
import {Observable} from 'rxjs/Rx';
import { bookingServices } from '../services/booking_service'
import {sharedService} from 'app/common/services/sharedService'
import {ResultMessage} from 'app/common/model/common_Information'
@Component({
    selector:'my-bookingMenus',
    templateUrl:'app/booking/bookingMenuUI.html'
})  



export class BookingMenuComponent implements OnInit{

  @ViewChild(ErrorMessage) errorMsg: ErrorMessage;
    private bookingActionsTO:any = new BookingActionsTO();
    userTO:UserTO = new UserTO();
    isDirector:boolean=false;
    loginUserId:number;
    isShowForCnF:boolean=false;
    isClosed: boolean = false;
    constructor(private commonServices:CommonServices,
     private _confirmService: ConfirmService,
     private loginService : AuthenticationService,
     private bookingServices: bookingServices ,
     private ss: sharedService
    ){}

ngOnInit()
{
    this.ss.showLoader();
    debugger;
    this.userTO = this.loginService.getUserTOFromLocalStorage();
    if(this.userTO !=null || this.userTO !=undefined)
      {
        this.userTO.UserRoleList.forEach(c => {
            debugger;
            if (c.RoleId == myGlobalVal.UserRole.C_AND_F_AGENT) {
                this.isShowForCnF = true
                this.ss.hideLoader();
            }
            else {
                this.isShowForCnF = false
                this.ss.hideLoader();
            }
            if (c.RoleId == myGlobalVal.UserRole.DIRECTOR||c.RoleId==myGlobalVal.UserRole.SYSTEM_ADMIN) {
            this.isDirector = true;
            this.getBookingOpenCloseInfo();
        }
        else {
            this.isDirector = false;
        }
        })
    }
  
}


closeBooking(){
              let BookingCloseOperation:Observable<ResultMessage>; 
              this.bookingActionsTO.BookingStatus="CLOSE";
              this.bookingActionsTO.StatusBy=this.userTO.IdUser;
              this.loginUserId=this.userTO.IdUser;
              BookingCloseOperation = this.commonServices.closeBooking(this.bookingActionsTO,this.loginUserId);
              this.ss.showLoader();
              BookingCloseOperation.subscribe(
              bookingClose=>{            
              if(bookingClose.Result == 1 && bookingClose.MessageType==myGlobalVal.ResultMessageE.Information)
                {
                    this.errorMsg.showErrorMessage("Booking  Closed Successfully", "Information");
                    this.ss.hideLoader();
                }
            else
            {
              
                this.errorMsg.showErrorMessage("Booking  Not Closed", "Error");
                this.ss.hideLoader();
            }
               
      
        },
        err=>{    this.ss.hideLoader();});

}
 showConfirmDialog(): boolean {
     var warningmsg: string
     warningmsg = "Do You Want To Close The Booking?";
     this._confirmService.activate(warningmsg, "Confirmation")
         .then(res => {
             if (res) {
                 this.closeBooking();
             } else {
             }
         });
     return false;
 }

 getBookingOpenCloseInfo() {
        this.bookingServices.getBookinOpenCloseInfo()
            .subscribe(
            bookingActionsTO => {
            this.bookingActionsTO = bookingActionsTO
             if(this.bookingActionsTO != null || this.bookingActionsTO != undefined ){
                if (this.bookingActionsTO.BookingStatus == "CLOSE") {
                    this.isClosed = true;
                    this.ss.hideLoader();
                }
                else {
                      this.isClosed = false;
                }
             }
            },

            err => {
            this.ss.hideLoader();
                
                // Log errors if any
                console.log(err);
            });
        return this.isClosed;
    }

}
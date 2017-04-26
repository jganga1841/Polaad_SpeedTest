import { FormGroup, FormControl } from '@angular/forms';
import {Component, OnInit, ViewContainerRef,ViewChild,ChangeDetectorRef} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {LoadingServices} from '../services/loading_service'
import {LoadingTO} from '../model/loading_information'
import {LoadingSlipTO} from '../model/loading_information'
// import 'rxjs/add/operator/filter'; 
 import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import {ConfirmService} from 'app/error/confirm.service'
import {ErrorMessage} from 'app/error/errorMessage'
import {CommonInformation} from 'app/common/model/common_Information'
import myGlobalVal = require('app/global')
import {sharedService} from 'app/common/services/sharedService';
import {UserTO} from 'app/user/model/userTO'
import {AuthenticationService} from 'app/login/login.services'

@Component({
    selector:'delivery-slipConfirm',
    //template:'<measurement_spinner></measurement_spinner>'
    templateUrl:'app/loading_slip/delivery_slip_confirmation.html',
    providers :[ConfirmService] 
})  
export class DeliverySlipConfComponent implements OnInit{
    @ViewChild(ErrorMessage) errorMsg: ErrorMessage;
    ScreenName : string
    userTO:UserTO;
    loginUserId:number;
    
    constructor(private ss:sharedService,
                private router: Router,
                 private _confirmService:ConfirmService,
    private loadingServices : LoadingServices,
    private loginService:AuthenticationService,
    route: ActivatedRoute) {       
         //this.ScreenName = route.snapshot.data[0]['ScreenName'];
          this.userTO = this.loginService.getUserTOFromLocalStorage();
        this.loginUserId=this.userTO.IdUser;
        }
    private loadingToById : LoadingTO = new LoadingTO();
    private lblMessage : string = undefined
    //private loadingSlipTo : LoadingSlipTO[] = []
    dealerNames : any;
    dealerNameList :string [] =[];
    cnfName : string 
    listNotConfirmReason : CommonInformation[] =[]
    listWaitingReason : CommonInformation[] =[]
    waitingReasonId : number = 0
    notConfirmReasonId : number = 0
    confirmDateTime : Date = new Date()
    //confirmDateTime : Date 
    isConfirmed = false;
    private showDatePicker: boolean;
    todayDate : string = new Date().toLocaleDateString();
    strMessage : string = "";
    ngOnInit(){
         this.ss.showLoader();
        this.getLoadingSlipList();
        this.getLoadingStatusReason();
        
    }

     getLoadingSlipList() {
          //alert('view Loading');
          
        this.loadingToById.IdLoading = Number( localStorage.getItem("IdLoading"));
        // this.lblMessage = "Not able to find data againest to selected loading.";
          //  return ;
        if(this.loadingToById.IdLoading == undefined)
        {            
            this.lblMessage = " Not able to find data againest to selected loading.";
            return ;
        }
        this.loadingServices.getLoadingToById(this.loadingToById.IdLoading)
            .subscribe(
                
            p => {this.loadingToById = p
               this.dealerNames = this.loadingToById.LoadingSlipList.map(p=>p.DealerOrgId).filter((value,index,self)=>self.indexOf(value)===index);
              this.dealerNames = this.dealerNames.forEach(element => {
                //    this.loadingToById.LoadingSlipList.filter(p1=>p1.DealerOrgId == element).forEach(dealerName=>{
                //       this.dealerNameList.push(dealerName.DealerOrgName)
                //    })
                   this.dealerNameList.push(this.loadingToById.LoadingSlipList.filter(p1=>p1.DealerOrgId == element)[0].DealerOrgName)
                   this.cnfName = this.loadingToById.CnfOrgName
               });
            //    this.loadingToById.LoadingSlipList.forEach(ele=>{
            //        ele.LoadingSlipExtTOList
            //    })
                },
            err => {
                // Log errors if any
                alert('err :' + err)
                console.log(err);},
                ()=>{
                          console.log("Done")
                          //this.ss.hideLoader();
                   }
            );
    }

    getLoadingStatusReason(){
        this.loadingServices.getLoadStatusReason(myGlobalVal.LoadingStatus.LOADING_NOT_CONFIRM)
        .subscribe(element=>{this.listNotConfirmReason = element},
            err=>{
                 alert('Server error :' + err)
                this.ss.hideLoader(); 
                console.log(err)
            });

         this.loadingServices.getLoadStatusReason(myGlobalVal.LoadingStatus.LOADING_WAITING)
        .subscribe(element=>{this.listWaitingReason = element},
            err=>{
                 alert('Server error :' + err)
                this.ss.hideLoader(); 
                console.log(err)
            },
            ()=>{
                          console.log("Done")
                          this.ss.hideLoader();
                   })
    }
    validateDateBeforeConfrimation(){
        if(this.confirmDateTime > new Date())
            this.isConfirmed = true;
        else if(this.confirmDateTime < new Date(new Date().setMinutes(new Date().getMinutes()-1) ))
        {
         
            this.errorMsg.showErrorMessage("The Date and Time you have selected is before the Current Date and Time.","Warning");
            this.isConfirmed = false;  
            
            //this.confirmDateTime = new Date(this.todayDate); 
        }

    }
    passConfirmationDate(event:Event){
        this.loadingToById.StatusId = myGlobalVal.LoadingStatus.LOADING_CONFIRM
        this.loadingToById.LoadingDatetime = this.confirmDateTime;
        this.loadingToById.TranStatusE = myGlobalVal.LoadingStatus.LOADING_CONFIRM 
        this.loadingToById.StatusReason = "Loading Confirmed"    
        this.strMessage ="Have you confirm the loading date and time?";   
        this.postStatusReason(this.strMessage)        

    }

    updateNotConfirmStatus(){
        this.loadingToById.StatusId = myGlobalVal.LoadingStatus.LOADING_NOT_CONFIRM
        this.loadingToById.StatusReasonId = this.notConfirmReasonId
        this.loadingToById.StatusReason = this.listNotConfirmReason.filter(p=>p.Value == this.notConfirmReasonId)[0].Text
        this.loadingToById.TranStatusE = myGlobalVal.LoadingStatus.LOADING_NOT_CONFIRM
        this.strMessage ="Are you sure to change the status as not confirm?";           
        this.postStatusReason(this.strMessage)        
    }

    updateWaitingReason(){
        this.loadingToById.StatusId = myGlobalVal.LoadingStatus.LOADING_WAITING
        this.loadingToById.StatusReasonId = this.waitingReasonId;
        this.loadingToById.StatusReason = this.listWaitingReason.filter(p=>p.Value == this.waitingReasonId)[0].Text
        this.loadingToById.TranStatusE = myGlobalVal.LoadingStatus.LOADING_WAITING 
        this.strMessage ="Are you sure to change the status as waiting?";                 
        this.postStatusReason(this.strMessage)        
    }

    postStatusReason(strMessage : string){
        this._confirmService.activate(strMessage, "Confirmation")
            .then(res => {
                if (res) {
                    this.loadingServices.postStatusReasonService(this.loadingToById,this.loginUserId).subscribe(
                        element => {
                            if (element == 1) {
                                this.errorMsg.showErrorMessage("Status reason updated successfully", "Information");
                                this.router.navigate(['ViewLoadingSlip']);

                            }
                            else
                                this.errorMsg.showErrorMessage("Status reason not updated.", "Error");
                        },
                        err => { })
                }
                else { }
            })
    }

    backToViewLoading(){
            this.ScreenName = localStorage.getItem("ScreenName");
            if(this.ScreenName == myGlobalVal.ScreenName.DELIVERY.toString())
                this.router.navigate(['Delivery']);
                
            else
                this.router.navigate(['ViewLoadingSlip']);
        
    }
     toggleDatePicker(status: boolean): void  {
                this.showDatePicker = status;
            }
    
            // setTime(time: any): void {
            //     this.cinfirmTime = time;
            // }
}

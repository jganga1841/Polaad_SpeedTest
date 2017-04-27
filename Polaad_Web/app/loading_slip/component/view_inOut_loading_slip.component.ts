import {Component, OnInit, ViewContainerRef,ViewChild,ChangeDetectorRef} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {LoadingServices} from '../services/loading_service'
import {LoadingTO} from '../model/loading_information'
import {ConfirmService} from 'app/error/confirm.service'
import {ErrorMessage} from 'app/error/errorMessage'
import myGlobalVal = require('app/global')
import {sharedService} from 'app/common/services/sharedService';
import {UserTO} from 'app/user/model/userTO'
import {AuthenticationService} from 'app/login/login.services'
import {ResultMessage} from 'app/common/model/common_Information'
import { Moment } from 'moment/moment';
declare var moment: any;
import {CommonInformation} from 'app/common/model/common_Information'

@Component({
    selector:'view-loadingSlip',
    //template:'<measurement_spinner></measurement_spinner>'
    templateUrl:'app/loading_slip/view_inOut_loading_slip.html',
    providers :[ConfirmService] 
})  
export class ViewInOutLoadingComponent implements OnInit{
   
    @ViewChild(ErrorMessage) errorMsg: ErrorMessage;
    private loadingSlipList: LoadingTO[] = []
    userTO: UserTO;
    loginUserId: number;
    status: string;
    isGateInOut: boolean = true;
    isVehicleIn: boolean = true;
    action: string;
    msg:string;
    supervisorList: CommonInformation[];
    supervisorInfo:CommonInformation;
    constructor(private ss: sharedService,
        private loadingServices: LoadingServices
        , private _confirmService: ConfirmService
        , private loginService: AuthenticationService
    ) {
        this.userTO = this.loginService.getUserTOFromLocalStorage();
        this.loginUserId = this.userTO.IdUser;
    }

    ngOnInit() {
        this.ss.showLoader();
        //this.loadingSlipList = [];
        if (this.isGateInOut) {
            this.status = myGlobalVal.LoadingStatus.LOADING_CONFIRM + ',' + myGlobalVal.LoadingStatus.LOADING_REPORTED_FOR_LOADING;
            this.getLoadingSlipList(this.status);
            this.action = "In"
        }
        else {
            this.status = myGlobalVal.LoadingStatus.LOADING_CONFIRM + ',' + myGlobalVal.LoadingStatus.LOADING_COMPLETED;
            this.getLoadingSlipList(this.status);
            this.getSuperwisorListForDropDown();
            this.supervisorInfo=0;
             this.action = "Out"
        }

    }

      getLoadingSlipList(status:string) {
          //alert('view Loading');
        this.loadingServices.getInOutloadingSlipList(status)
            .subscribe(
            p =>{ this.loadingSlipList = p
                  this.ss.hideLoader(); 
        },
            err => {
                // Log errors if any
                alert('Server error :' + err)
                this.ss.hideLoader(); 
                console.log(err);
            },
            ()=>{
                          console.log("Done")
                          this.ss.hideLoader();                          
                   });
    }

    postGetInLoadingSlip(loadingTO:LoadingTO,flag:number)
    {
        debugger;
        let postGetInOperation: Observable<ResultMessage>;
        if (this.isGateInOut && flag == 2) {
            loadingTO.TranStatusE = myGlobalVal.LoadingStatus.LOADING_GATE_IN;
            loadingTO.StatusId = myGlobalVal.LoadingStatus.LOADING_GATE_IN;
            loadingTO.StatusReason = "Vehicle Entered In The Premises"
        }
        else if (!this.isGateInOut && flag == 2) {
            loadingTO.TranStatusE = myGlobalVal.LoadingStatus.DELIVERED;
            loadingTO.StatusId = myGlobalVal.LoadingStatus.DELIVERED;
            loadingTO.StatusReason = "Order Delivered"
        }
        else if (this.isVehicleIn && flag == 1) {
            loadingTO.TranStatusE = myGlobalVal.LoadingStatus.LOADING_REPORTED_FOR_LOADING;
            loadingTO.StatusId = myGlobalVal.LoadingStatus.LOADING_REPORTED_FOR_LOADING;
            loadingTO.StatusReason = "Vehicle Reported "

        }
        else if(!this.isVehicleIn && flag==1)
        {
          loadingTO.TranStatusE = myGlobalVal.LoadingStatus.LOADING_COMPLETED;
          loadingTO.StatusId = myGlobalVal.LoadingStatus.LOADING_COMPLETED;
          loadingTO.StatusReason = "Loading Completed"
        }
        postGetInOperation =this.loadingServices.postStatusReasonService(loadingTO, this.loginUserId);
        postGetInOperation.subscribe(getIn => {
            if (getIn.MessageType == myGlobalVal.ResultMessageE.Information && getIn.Result == 1) {
                this.errorMsg.showErrorMessage("Record Updated Successfully", "Information");
                if (this.isGateInOut) {
                    this.getLoadingSlipList(this.status);
                }
                else {
                    this.getLoadingSlipList(this.status);
                }
            }
            else
                this.errorMsg.showErrorMessage("Error,Record Could Not Be Updated", "Error");
        },
            err => { });

    }

  showConfirmDialogToGetInLoadingSlip(loadingTO:LoadingTO,flag:number,value:boolean) {
    if(value)
    {
        this.callStatus(flag);
        this._confirmService.activate("Are You Sure To " + this.msg , "Confirmation")
                    .then(res => {
                        if (res) {
                            this.postGetInLoadingSlip(loadingTO,flag);
                        } else {
                        }
                    });
                return false;
    }
       
    }


    getGateInLoadingList(isGateIn:boolean)
    {
        this.ss.showLoader();
        if (isGateIn) {
              this.action = "In"
            this.isGateInOut = true;
            this.isVehicleIn = true;
            this.status = myGlobalVal.LoadingStatus.LOADING_CONFIRM + ' ,' + myGlobalVal.LoadingStatus.LOADING_REPORTED_FOR_LOADING;
        }
        else {
            this.action = "Out"
            this.isGateInOut = false;
            this.isVehicleIn = false;
            this.status = myGlobalVal.LoadingStatus.LOADING_GATE_IN + ',' + myGlobalVal.LoadingStatus.LOADING_COMPLETED;
            this.getSuperwisorListForDropDown();
        }
        this.getLoadingSlipList(this.status);
    }

    checkStatus(statusId:number)
  {
        if (this.isGateInOut) {
            if (statusId == myGlobalVal.LoadingStatus.LOADING_REPORTED_FOR_LOADING) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            if (statusId == myGlobalVal.LoadingStatus.LOADING_COMPLETED) {
                return true;
            }
            else {
                return false;
            }
        }
  }
   changeColor(statusId:number)
   {
       if (this.isGateInOut) {
           if (statusId == myGlobalVal.LoadingStatus.LOADING_REPORTED_FOR_LOADING) {
               return 'darkseagreen';
           }
           else {
               return 'white';
           }
       }
       else {
           if (statusId == myGlobalVal.LoadingStatus.LOADING_COMPLETED) {
                return 'darkseagreen';
           }
           else {
               return 'white';
           }
       }
            
  }

   getSuperwisorListForDropDown() {
       this.loadingServices.getSuperwisorListForDropDown()
           .subscribe(
           supervisorList => this.supervisorList = supervisorList,
           err => {
               // Log errors if any
               console.log(err);
           });
   }

   showConfirmDialogToAllocateSupervisor(loadingTO: LoadingTO) {
       this._confirmService.activate("Are You Sure To Allocate This Supervisor?", "Confirmation")
           .then(res => {
               if (res) {
                   this.postAllocateSupervisor(loadingTO);
               } else {
               }
           });
       return false;
   }

   postAllocateSupervisor(loadingTO: LoadingTO) {
       loadingTO.SuperwisorName = this.supervisorList.filter(c => c.Value == loadingTO.SuperwisorId)[0].Text;
       let postAllocateSupervisorOperation: Observable<ResultMessage>;
       postAllocateSupervisorOperation = this.loadingServices.postAllocateSupervisor(loadingTO, this.loginUserId);
       postAllocateSupervisorOperation.subscribe(allocate => {
           if (allocate.MessageType == myGlobalVal.ResultMessageE.Information && allocate.Result == 1) {
               this.errorMsg.showErrorMessage("Supervisor Allocate Successfully", "Information");
               if (!this.isGateInOut) {
                   this.getLoadingSlipList(this.status);
               }
           }
           else
               this.errorMsg.showErrorMessage("Error,Record Could Not Be Updated", "Error");
       },
           err => { });
   }
   callStatus(flag:number)
   {
         if (this.isGateInOut && flag == 2) {
            this.msg = "In This Vehicle"
        }
        else if (!this.isGateInOut && flag == 2) {
            this.msg = "Out This Vehicle"
        }
        else if (this.isVehicleIn && flag == 1) {
            this.msg = "Mark This Vehicle As Reported? "
        }
        else if (!this.isVehicleIn && flag == 1) {
            this.msg = "Loading Completed"
        }
        return  this.msg;
   }

   checkAllocationOfSupervisor(loadingToInfo:LoadingTO)
   {
       if(loadingToInfo.SuperwisorId!=0 && loadingToInfo.SuperwisorName!=null && loadingToInfo.StatusId !== myGlobalVal.LoadingStatus.LOADING_COMPLETED)
       {
           return false;
       }
       else 
       {
           return true;
       }

   }

}
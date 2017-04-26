import { FormGroup, FormControl } from '@angular/forms';
import {Component, OnInit, ViewContainerRef,ViewChild,ChangeDetectorRef,AfterViewChecked} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {LoadingServices} from '../services/loading_service'
import {LoadingTO} from '../model/loading_information'
// import 'rxjs/add/operator/filter'; 
 import { ActivatedRoute, Router, NavigationEnd} from '@angular/router';
import {ConfirmService} from 'app/error/confirm.service'
import {ErrorMessage} from 'app/error/errorMessage'
import myGlobalVal = require('app/global')
import {sharedService} from 'app/common/services/sharedService';
import {UserTO} from 'app/user/model/userTO'
import {AuthenticationService} from 'app/login/login.services'
import { CommonServices } from 'app/common/services/common.services'
import {CommonInformation} from 'app/common/model/common_Information'
import { Moment } from 'moment/moment';
declare var moment: any;

@Component({
    selector:'view-loadingSlip',
    //template:'<measurement_spinner></measurement_spinner>'
    templateUrl:'app/loading_slip/view_loading_slip.html',
    providers :[ConfirmService] 
})  

export class ViewLoadingComponent implements OnInit,AfterViewChecked {

    ScreenName : string
    isShowCnFLst:boolean=false;
    userTO:UserTO
    cnfList:CommonInformation[];
    txnTypeList:CommonInformation[];
    fromDt:Date=new  Date();
    toDt:Date=new Date();
    toDate: Date = new Date();
    fromDate: Date = new Date();

    constructor(private ss:sharedService,
    private router: Router,
    private loadingServices : LoadingServices,
    route: ActivatedRoute,
    private loginService:AuthenticationService,
    private commonServices: CommonServices,
    ) {
        this.initvalue = this.fromDate;
        this.ScreenName = route.snapshot.data[0]['ScreenName'];
        this.initializePage();
    }

    private headMessage : string= "";
    private isLoading : boolean = false;
    private isDelivery : boolean = false;
    private loadingSlipList : LoadingTO[] =[]
    private deliverySlipList : LoadingTO[] =[]
    ProdCatVal: boolean = false;
    cnfOrgId:number
    statusId:number
    ignoredFirstEvent = false;
    initvalue:Date;
    isView:boolean=false;
    private loadingToById : LoadingTO = new LoadingTO();

     ngOnInit(){
         this.ss.showLoader();
         //this.loadingSlipList = [];
           this.userTO = this.loginService.getUserTOFromLocalStorage();
                 debugger;
                 if (this.userTO.UserRoleList != null || this.userTO.UserRoleList != undefined) {
                         if (this.userTO.UserRoleList[0].RoleId == myGlobalVal.UserRole.C_AND_F_AGENT) {
                             this.isShowCnFLst = false;
                             this.cnfOrgId=(this.userTO.OrganizationId);
                         }
                         else
                         {
                             this.cnfOrgId=0;
                             this.statusId=0;
                             this.getcnfList(myGlobalVal.orgTypeEnum.CNFTYPEID);
                             this.isShowCnFLst = true;
                             this
                         }
                 }
                this.getStatusList();
               this.getLoadingSlipList();
                 
     }

     initializePage(){
         switch(this.ScreenName){
             case myGlobalVal.ScreenName.DELIVERY.toString():
                this.headMessage = "Delivery Loading Slip";
                this.isDelivery = true;
                break;
             case myGlobalVal.ScreenName.LOADINGSLIP.toString():
                this.isLoading = true;
                this.headMessage ="View Loading Slip";
                break;
            default :
             this.headMessage ="View Loading Slip";
                break;
         }
         
     }

      getLoadingSlipList() {
          //alert('view Loading');
          if(this.cnfOrgId==undefined)
          {
              this.cnfOrgId=0
          }
          if(this.statusId==undefined)
          {
              this.statusId=0;
          }
    
        this.loadingServices.todaysLoadingSlipList(this.cnfOrgId,this.statusId)
            .subscribe(
            p =>{ this.loadingSlipList = p
                debugger
            if(this.isDelivery)
            {                
                this.deliverySlipList = this.loadingSlipList.filter(element=>element.StatusId==myGlobalVal.LoadingStatus.LOADING_CONFIRM);
                this.loadingSlipList = this.loadingSlipList.filter(element=>element.StatusId==myGlobalVal.LoadingStatus.LOADING_NEW ||element.StatusId==myGlobalVal.LoadingStatus.LOADING_NOT_CONFIRM || element.StatusId==myGlobalVal.LoadingStatus.LOADING_WAITING )
            }
        },
            err => {
                debugger
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


    ViewLoadingSlipDetails(loadingTo : LoadingTO){
        //alert('view details : ' + loadingTo);
        localStorage.setItem("IdLoading",loadingTo.IdLoading.toString());
        localStorage.setItem("ScreenName", this.isLoading? myGlobalVal.ScreenName.LOADINGSLIP.toString()
             : myGlobalVal.ScreenName.DELIVERY.toString())
         this.router.navigate(['DeliverySlipConfirmation']);
        // if(this.isLoading)
        //     this.router.navigate(['DeliverySlipConfirmation'],{  "ScreenName": 'pageNum'  });
        // else if(this.isDelivery)
        //     this.router.navigate(['DeliverySlipConfirmation'],{ queryParams : { ScreenName: 'pageNum' } });
    }

      getcnfList(orgTypeId: number) {
        this.commonServices.getOrgList(orgTypeId)
            .subscribe(
            commonInfoList => this.cnfList = commonInfoList,
            err => {
                // Log errors if any
                console.log(err);
            });
    }
    getStatusList() {
        this.commonServices.getBookingStatus(myGlobalVal.txnTypeEnum.LOADING)
            .subscribe(
            commonInfoList => this.txnTypeList = commonInfoList,
            err => {
                // Log errors if any
                console.log(err);
            });
    }

    getListAccToDate(fromDate: Date, toDate: Date) {
        if (this.ignoredFirstEvent || this.initvalue === undefined) {
            if (this.loadingSlipList == null) {
                return null;
            }
           this.loadingSlipList=((this.loadingSlipList.filter(element => moment(element.CreatedOn).toDate()>=moment(fromDate).toDate() && moment(element.CreatedOn).toDate()<=moment(toDate).toDate())));
           return this.loadingSlipList;
        }
        this.ignoredFirstEvent = true;
    } 


    onddlCnFChage()
    {
        this.getLoadingSlipListByDate();

    }
    onddlstatusChage ()
    {
        this.getLoadingSlipListByDate();
    }
    onDateSelection()
    {
        this.getLoadingSlipListByDate();
    }

     getLoadingSlipListByDate() {
          //alert('view Loading');
          if (this.ignoredFirstEvent || this.initvalue === undefined) {
          if(this.cnfOrgId==undefined)
          {
              this.cnfOrgId=0
          }
          if(this.statusId==undefined)
          {
              this.statusId=0;
          }
                this.ss.showLoader(); 
          
        this.loadingServices.loadingSlipList(this.cnfOrgId,this.statusId,this.fromDate.toString(),this.toDate.toString())
            .subscribe(
            p =>{ this.loadingSlipList = p
            if(this.isDelivery)
            {
                this.deliverySlipList = this.loadingSlipList.filter(element=>element.StatusId==myGlobalVal.LoadingStatus.LOADING_CONFIRM);
                this.loadingSlipList = this.loadingSlipList.filter(element=>element.StatusId==myGlobalVal.LoadingStatus.LOADING_NEW ||element.StatusId==myGlobalVal.LoadingStatus.LOADING_NOT_CONFIRM)
            }
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
     this.ignoredFirstEvent = true;
     }


      PrintLoadingSlipDetails(loadingTo : LoadingTO){
          debugger;
             this.getLoadingSlip(loadingTo.IdLoading);
          
    }
     getLoadingSlip(idLoading:number) {
        this.loadingServices.getLoadingToById(idLoading)
            .subscribe(
                
            p => {
                 this.loadingToById = p
                  this.isView=true;
                
                 this.ss.hideLoader();
           },
            err => {
                // Log errors if any
                alert('err :' + err)
                this.ss.hideLoader();
                console.log(err);},
                ()=>{
                          console.log("Done")
                          //this.ss.hideLoader();
                   }
            );
    }
      PrintReport()
    {
        if(this.isView)
        {
           debugger;
    let printContents, popupWin:any;
    printContents = document.getElementById('print-section').innerHTML;
    document.getElementById("print-section").style.pageBreakInside = "avoid";
    popupWin = window.open();
    popupWin.document.write(`
      <html>
        <head>
          <link rel="stylesheet" href="node_modules/bootstrap/dist/css/bootstrap.css"> 
        </head>
        <body onload="window.focus();window.print();window.close()" >${printContents}<embed src="pdfhere.pdf"/></body>
      </html>`
    );
     popupWin.document.close()
     this.isView=false;
        }
   

     }

     public ngAfterViewChecked(): void {

        if ( this.isView ) {
            this.PrintReport();
        }       
    }      
}
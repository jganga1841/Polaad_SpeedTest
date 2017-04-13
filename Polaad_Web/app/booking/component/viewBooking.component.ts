import { Component, OnInit, ViewContainerRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { bookingServices } from '../services/booking_service'
import { BookingTO } from '../model/booking_information'
import { CommonInformation } from 'app/common/model/common_Information'
import { CommonServices } from 'app/common/services/common.services'
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmService } from 'app/error/confirm.service'
import { ErrorMessage } from 'app/error/errorMessage'
import myGlobalVal = require('app/global')
import { ContextMenuComponent } from 'angular2-contextmenu/src/contextMenu.component';
import { ContextMenuService } from 'angular2-contextmenu/src/contextMenu.service';
import { Location } from '@angular/common';
import { Moment } from 'moment/moment';
import {UserTO} from 'app/user/model/userTO'
import {AuthenticationService} from 'app/login/login.services'
declare var moment: any;
import {sharedService} from 'app/common/services/sharedService'

@Component({
    selector: 'view-booking',
    templateUrl: 'app/booking/viewBooking.html',
    providers: [ConfirmService, ContextMenuService]
})

export class ViewBookinComponent implements OnInit {
    @ViewChild(ErrorMessage) errorMsg: ErrorMessage;
    fullurl: string = (window.location.href);
    defaultStr = 'Select ';
    ScreenName : string
    cFId: number;
    txnTypeId: number;
    isDirector: boolean = false;
    isCF: boolean = false;
    isVisible: boolean = false;
    isReject: boolean = false;
    isBookingBack: boolean = false;
    isView: boolean = false;
    constructor(
        private router: Router,
        private commonServices: CommonServices,
        private bookingServices: bookingServices,
        private _confirmService: ConfirmService,
        private contextMenuService: ContextMenuService,
        private loginService:AuthenticationService,
        private ss: sharedService,
        route: ActivatedRoute) {
        this.initvalue = this.fromDate;
        this.ScreenName = route.snapshot.data[0]['ScreenName'],
        this.userTO = this.loginService.getUserTOFromLocalStorage();
        if (this.userTO != null || this.userTO != undefined) {
            this.loginUserId = this.userTO.IdUser;
        }
        this.initializePage();
        
    }

    bookingToLst: BookingTO[];
    tempbookingToLst: BookingTO[];
    bookingTo: BookingTO;
    dealerId: number = 0;
    cnfOrgId: number = 0;
    statusId: number = 0;
    toDate: Date = new Date();
    fromDate: Date = new Date();
    ignoredFirstEvent = false;
    initvalue:Date;
    dealerList: CommonInformation[];
    cnfList: CommonInformation[];
    txnTypeList: CommonInformation[];
    msg: string;
    userTO:UserTO;
    isShowCnFLst:boolean=false;
    loginUserId:number;
    isQtyReason:boolean=false;
    isRateReason:boolean=false;
    isDeliveryDays:boolean=false;

    initializePage() {
        switch (this.ScreenName) {
            case myGlobalVal.ScreenName.ViewBooking.toString():
            this.ss.showLoader();

                 this.isDirector = false;
                 this.isCF = false;
                 this.userTO = this.loginService.getUserTOFromLocalStorage();
                 if (this.userTO != null || this.userTO != undefined) {
                     this.userTO.UserRoleList.forEach(c => {
                         if (c.RoleId == myGlobalVal.UserRole.C_AND_F_AGENT) {
                             this.isShowCnFLst = false;
                             this.cnfOrgId=this.userTO.OrganizationId;
                         }
                         else
                         {
                             this.getcnfList(myGlobalVal.orgTypeEnum.CNFTYPEID);
                             this.isShowCnFLst = true;
                         }
                     })
                 }
                 this.viewPendingBookingList(this.cnfOrgId, this.dealerId, this.statusId);
                 break;
            case myGlobalVal.ScreenName.BookingConfirmation.toString():
            this.ss.showLoader();
                 if (this.userTO != null || this.userTO != undefined) {
                 this.userTO.UserRoleList.forEach(c => {
                 if (c.RoleId == myGlobalVal.UserRole.DIRECTOR ||c.RoleId == myGlobalVal.UserRole.SYSTEM_ADMIN ) 
                 {
                     this.isDirector = true;
                     this.isCF = false;
                     this.isShowCnFLst = true;
                     this.getcnfList(myGlobalVal.orgTypeEnum.CNFTYPEID);
                     this.viewConfirmationBookingList();
                 }
                 })
                 }
            break;

            case myGlobalVal.ScreenName.BookingConfirmationByCnF.toString():
            this.ss.showLoader();
                if (this.userTO != null || this.userTO != undefined) {
                this.userTO.UserRoleList.forEach(c => 
                {
                     if (c.RoleId == myGlobalVal.UserRole.C_AND_F_AGENT )
                      {
                        this.isShowCnFLst = false;
                        this.isDirector = false;
                        this.isCF = true;
                        this.viewPendingBookingsForAcceptance(this.userTO.OrganizationId);
                      }
                 })
                }
                break;
            default:
               // this.headMessage = "View Loading Slip";
                break;
        }
    }

    isnull(cnfOrgId: number, dealerId: number, statusId: number) {
        if (dealerId == null) {
            this.dealerId = 0;
        }
        if (cnfOrgId == null) {
            this.cnfOrgId = 0;
        }
        if (statusId == null) {
            this.statusId = 0;
        }
    }

    viewPendingBookingList(cnfOrgId: number, dealerId: number, statusId: number)
     {
        this.isnull(cnfOrgId, dealerId, statusId);
        this.bookingServices.viewBooking(cnfOrgId, dealerId, statusId).subscribe(
            p => {
                debugger;
                this.bookingToLst = p
                this.tempbookingToLst=p
                if(this.userTO.UserRoleList[0].RoleId==myGlobalVal.UserRole.C_AND_F_AGENT)
                {
                   this.tempbookingToLst = p.filter(c => c.StatusId == myGlobalVal.statusTypeEnum.Approved && c.CnFOrgId==this.userTO.OrganizationId);
                }
                else
                {
                this.tempbookingToLst = p.filter(c => c.StatusId == myGlobalVal.statusTypeEnum.Approved);
                }
                this.dealerId = dealerId
                this.ss.hideLoader();
            }
            , err => {
                this.ss.hideLoader();
                console.log(err);
            }
        )
    }

    getcnfList(orgTypeId: number) 
    {
        this.commonServices.getOrgList(orgTypeId)
            .subscribe(
            commonInfoList => this.cnfList = commonInfoList,
            err => {
                // Log errors if any
                console.log(err);
            });
    }
    //[7/3/2017]Vijaymala added to fill booking status dropdown
    getBookingStatusList(txnTypeId: number) {
        this.commonServices.getBookingStatus(txnTypeId)
            .subscribe(
            commonInfoList => this.txnTypeList = commonInfoList,
            err => {
                // Log errors if any
                console.log(err);
            });
    }
    onddlDelaerChage(dealerId: number) 
    {
        this.dealerId = dealerId;
        this.callBookingListFilter(this.dealerId, this.cnfOrgId, this.statusId)
    }

    callBookingListFilter(dealerId: number, cnfOrgId: number, statusId: number)
     {
        this.isnull(cnfOrgId, dealerId, statusId)
        if (cnfOrgId == 0 && dealerId == 0 && statusId == 0)
            this.tempbookingToLst = this.bookingToLst
        else if (cnfOrgId > 0 && dealerId == 0 && statusId == 0)
            this.tempbookingToLst = this.bookingToLst.filter(c => c.CnFOrgId == cnfOrgId);
        else if (dealerId > 0 && cnfOrgId == 0 && statusId == 0)
            this.tempbookingToLst = this.bookingToLst.filter(c => c.DealerOrgId == dealerId);
        else if (dealerId == 0 && cnfOrgId == 0 && statusId > 0)
            this.tempbookingToLst = this.bookingToLst.filter(c => c.StatusId == statusId);
        else if (cnfOrgId > 0 && dealerId > 0 && statusId == 0)
            this.tempbookingToLst = this.bookingToLst.filter(c => c.CnFOrgId == cnfOrgId && c.DealerOrgId == dealerId);
        else if (cnfOrgId == 0 && dealerId > 0 && statusId > 0)
            this.tempbookingToLst = this.bookingToLst.filter(c => c.DealerOrgId == dealerId && c.StatusId == statusId);
        else if (cnfOrgId > 0 && dealerId == 0 && statusId > 0)
            this.tempbookingToLst = this.bookingToLst.filter(c => c.CnFOrgId == cnfOrgId && c.StatusId == statusId);
        else if (cnfOrgId > 0 && dealerId > 0 && statusId > 0)
            this.tempbookingToLst = this.bookingToLst.filter(c => c.CnFOrgId == cnfOrgId && c.DealerOrgId == dealerId && c.StatusId == statusId);

    }
    //[7/3/2017]Vijaymala added to get dealerlist of specific C&F
    onddlCnFChage(cnfOrgId: number)
     {
        this.cnfOrgId = cnfOrgId;
        this.getDealerListAccToCnF(cnfOrgId);
        this.callBookingListFilter(this.dealerId, cnfOrgId, this.statusId)
    }

    //[7/3/2017]Vijaymala added to get dealerlist of specific C&F
    getDealerListAccToCnF(cnfId: number) 
    {
        this.commonServices.getDealerList(cnfId)
            .subscribe(
            commonInfoList => this.dealerList = commonInfoList,
            err => {
                // Log errors if any
                console.log(err);
            });
    }

    //[7/3/2017]Vijaymala added to get pending bookinglist
    onddlstatusChage(statusId: number)
    {
        this.statusId = statusId;
        this.callBookingListFilter(this.dealerId, this.cnfOrgId, this.statusId)
    }

    onddlConfirmstatusChage(isConfirmed: number) 
    {
        this.callBookingListFilter(this.dealerId, this.cnfOrgId, this.statusId)
        this.tempbookingToLst = this.tempbookingToLst.filter(c => c.IsConfirmed == isConfirmed);

    }

    ngOnInit() {

        debugger;
        this.fromDate.setHours(12, 0, 0, 0);
        this.bookingTo = new BookingTO();
        this.bookingTo.DealerOrgId = this.dealerId;
        this.getDealerListAccToCnF(this.userTO.OrganizationId);
        this.txnTypeId = myGlobalVal.txnTypeEnum.BOOKING;
        this.getBookingStatusList(this.txnTypeId);
        this.bookingToLst = [];
         if (this.isDirector || this.isCF) {
            this.isVisible = true;
        }
      
        
    }

    getListAccToDate(fromDate: Date, toDate: Date) {
        if (this.ignoredFirstEvent || this.initvalue === undefined) {
            this.callBookingListFilter(this.dealerId, this.cnfOrgId, this.statusId)
            if (this.tempbookingToLst == null) {
                return null;
            }
           this.tempbookingToLst=((this.tempbookingToLst.filter(element => moment(element.CreatedOn).toDate()>=moment(fromDate).toDate() && moment(element.CreatedOn).toDate()<=moment(toDate).toDate())));
           return this.tempbookingToLst;
        }
        this.ignoredFirstEvent = true;
    }

    //[27/02/2017]Vijaymala added to get booking list beyond quota and rate band for director confirmation
    viewConfirmationBookingList() {
        this.bookingServices.viewConfirmationBooking().subscribe(
            p => {
            this.bookingToLst = p
                this.tempbookingToLst = p
                this.tempbookingToLst=this.tempbookingToLst.sort(c=>c.IdBooking)
                this.ss.hideLoader();
            }
            , err => {
                this.ss.hideLoader();
                console.log(err);
            }
        )
    }

    //[27/02/2017]Vijaymala added to submit  for director confirmation/C&F approved beyond quota and rate band 
    ConfirmBooking(bookingTO: BookingTO, isReject: boolean) {

        let BookingOperation: Observable<number>;
        if (!isReject) {

            if (this.isDirector) {
                bookingTO.TranStatusE = myGlobalVal.statusTypeEnum.ApprovedByDirectors;
                bookingTO.StatusId = myGlobalVal.statusTypeEnum.ApprovedByDirectors;
                this.msg = "Approved";
            }
            if (this.isCF) {
                bookingTO.TranStatusE = myGlobalVal.statusTypeEnum.AcceptedByCAndF;
                bookingTO.StatusId = myGlobalVal.statusTypeEnum.AcceptedByCAndF;
                this.msg = "Accepted";
            }
        }
        else if (isReject) {
            if (this.isDirector) {
                bookingTO.TranStatusE = myGlobalVal.statusTypeEnum.RejectedByDirectors;
                bookingTO.StatusId = myGlobalVal.statusTypeEnum.RejectedByDirectors;
                this.msg = "Rejected";
            }
            if (this.isCF) {
                bookingTO.TranStatusE = myGlobalVal.statusTypeEnum.RejectedByCAndF;
                bookingTO.StatusId = myGlobalVal.statusTypeEnum.RejectedByCAndF;
                this.msg = "Rejected";
            }
        }
        BookingOperation = this.bookingServices.addConfirmationBooking(bookingTO,this.loginUserId);
        BookingOperation.subscribe(booking => {
            if (booking == 1) {
                this.errorMsg.showErrorMessage("Order    " + this.msg + "   Successfully", "Information");
                if(this.isDirector)
                {
                this.viewConfirmationBookingList();
                }
                if(this.isCF)
                {
                this.viewPendingBookingsForAcceptance(this.userTO.OrganizationId);
                }

            }
            else
                this.errorMsg.showErrorMessage("Order Not   " + this.msg, "Error");
        },
            err => { });
    }

    //[27/02/2017]Vijaymala added to submit  for director confirmation/C&F approved beyond quota and rate band 
    showConfirmDialog(bookingTO: BookingTO, isReject: boolean) {
        var msg: string;
        if (!isReject)
            msg = "Do You Want To Confirm ?"
        else
            msg = "Are You Sure  To Reject This Order?"
        this._confirmService.activate(msg, "Confirmation")
            .then(res => {
                if (res) {
                    this.ConfirmBooking(bookingTO, isReject);
                } else {
                }
            });
        return false;
    }

    //[28/02/2017]Vijaymala added to get booking list beyond quota and rate band for C&F confirmation
    viewPendingBookingsForAcceptance(OrganizationId: number) {
        this.bookingServices.getPendingBookingsForAcceptance(OrganizationId).subscribe(
            p => {
            this.bookingToLst = p,
                this.tempbookingToLst = p
                this.ss.hideLoader();
            }
            , err => {
                console.log(err);
                this.ss.hideLoader();
            }
        )
    }

    public menuOptions = [
        {
            html: () => 'View',
            click: (bookingTO: BookingTO, $event: Event): void => {
                //   this.router.navigate(['./ViewParticularBooking']);
                localStorage.setItem('bookingTO', JSON.stringify(bookingTO));
                this.isBookingBack = true;
                this.isView = true;
                localStorage.setItem('isBookingBack', JSON.stringify(this.isBookingBack))
            },

        },
        {
            html: (): string => 'Edit',
            click: (bookingTO: BookingTO, $event: Event): void => {
                this.editBooking(bookingTO); false
                this.isBookingBack = true;
                localStorage.setItem('bookingId', JSON.stringify(bookingTO.IdBooking));
            },


        },
        {
            html: () => 'Delete',
            click: (bookingTO: BookingTO, $event: Event): void => {
                this.showConfirmDialogToDeleteBookingOrder(bookingTO);
            },
        },
    ];

    public onContextMenu($event: MouseEvent, item: any): void 
    {
        this.contextMenuService.show.next({
            actions: this.menuOptions,
            event: $event,
            item: item,
        });
        $event.preventDefault();
    }

    showConfirmDialogToDeleteBookingOrder(bookingTO: BookingTO) {
        this._confirmService.activate("Are You Sure To Delete This Order?", "Confirmation")
            .then(res => {
                if (res) {
                    this.deleteBookingOrder(bookingTO);
                } else {
                }
            });
        return false;
    }

    deleteBookingOrder(bookingTO: BookingTO) {
        let deleteBookingOrderOperation: Observable<number>;
        bookingTO.TranStatusE = myGlobalVal.statusTypeEnum.Delete;
        bookingTO.StatusId = myGlobalVal.statusTypeEnum.Delete;
        bookingTO.IsDeleted = 1;
        deleteBookingOrderOperation = this.bookingServices.deleteBookingOrder(bookingTO,this.loginUserId);
        deleteBookingOrderOperation.subscribe(booking => {
            if (booking == 1) {
                this.errorMsg.showErrorMessage("Order Deleted Successfully", "Information");
                this.viewPendingBookingList(bookingTO.DealerOrgId, bookingTO.CnFOrgId, this.statusId);

            }
            else
                this.errorMsg.showErrorMessage("Order not deleted", "Error");
        },
            err => { });
    }

    editBooking(bookingTO: BookingTO) {
        this.router.navigate(['/EditBooking']);
    }

    public bookingmenuOptions = [
        {
            html: () => 'Accept',
            click: (bookingTO: BookingTO, $event: Event): void => {
                this.isReject = false;
                this.showConfirmDialog(bookingTO, this.isReject);
            },

        },
        {
            html: (): string => 'Reject',
            click: (bookingTO: BookingTO, $event: Event): void => {
                this.isReject = true;
                this.showConfirmDialog(bookingTO, this.isReject);
            },

        },

    ];

    public onBookingContextMenu($event: MouseEvent, item: any): void {
        $event.preventDefault();
        this.contextMenuService.show.next({
            actions: this.bookingmenuOptions,
            event: $event,
            item: item,
        });

    }
    
    redirectViewBooking() {
        debugger;
        this.isView = false;
        this.ignoredFirstEvent=false;
        this.initvalue = this.fromDate;
    }

    getRateStyle(AuthReasons:string) {
         var fields=AuthReasons.split('|');
         if(fields.length==0)
        { return "white";}
         else
         {
             for(var i=0;i<=fields.length;i++)
                     {
                         if(fields[i]=="RATE")
                         {
                              return "red";
                         }
                     }

         }
    }

    getQtyStyle(AuthReasons:string) {
          var fields=AuthReasons.split('|');
         if(fields.length==0)
        { return "white";}
         else
         {
             for(var i=0;i<=fields.length;i++)
                     {
                        
                           if(fields[i]=="QTY")
                         {
                              return "red";
                         }
                     }

         }
    }

    getDaysStyle(AuthReasons:string) {
       
        var fields=AuthReasons.split('|');
         if(fields.length==0)
        { return "white";}
         else
         {
             for(var i=0;i<=fields.length;i++)
                     {
                         
                         if(fields[i]=="DELIVERY")
                         {
                              return "red";
                         }
                     }

         }
    }

    ratecolorstyle(AuthReasons: string)
     {
        var fields = AuthReasons.split('|');

        for (var i = 0; i <= fields.length; i++) {

            if (fields[i] == "RATE") {
                return "white";
            }
        }
    }

    qtycolorstyle(AuthReasons: string) {
        var fields = AuthReasons.split('|');

        for (var i = 0; i <= fields.length; i++) {
            if (fields[i] == "QTY") {
                return "white";
            }
        }
    }

    dayscolorstyle(AuthReasons: string) {
        var fields = AuthReasons.split('|');

        for (var i = 0; i <= fields.length; i++) {
            debugger;
            if (fields[i] == "DELIVERY") {
                return "white";
            }
        }
    }  

    
}


@Component({
    selector: 'view-ParticularBooking',
    templateUrl: 'app/booking/viewParticularBooking.html',
})
export class ViewParticularBooking {

    @ViewChild(ErrorMessage) errorMsg: ErrorMessage;

    constructor
    (
        public route: ActivatedRoute,
        private router: Router, private _location: Location
    ) {}

    bookingTO: BookingTO;
    public dealerId: number;
    public cnFId: number;
    public statusId: number;
    public isConfirmed: number;
    ngOnInit() {
        this.bookingTO = JSON.parse(localStorage.getItem('bookingTO'));
    }
    

    
}


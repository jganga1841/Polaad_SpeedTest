import { Component, OnInit, ViewContainerRef, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { QuotaInformation } from 'app/quota_declaration/model/quota_information'
import { CommonServices } from 'app/common/services/common.services'
import { CommonInformation } from 'app/common/model/common_Information'
import { AgentsServices } from 'app/agent/services/agents_services'
import { AddressTO } from 'app/agent/model/address_information'
import { DeliveryAddressTO } from '../model/booking_information'
import { BookingTO } from '../model/booking_information'
import { OrderDetailsTO } from '../model/booking_information'
import { QuotaDeclarationService } from 'app/quota_declaration/services/quota_declaration_service'
import { MesurementSpinnerComponent } from 'app/common/component/measurement_spinner.component'
import { bookingServices } from '../services/booking_service'
import { CommonFunctions } from 'app/common/commonFunctions'
import { ErrorMessage } from 'app/error/errorMessage'
import { Subscription } from "rxjs";
import { ConfirmService } from 'app/error/confirm.service'
import { ConfirmComponent } from 'app/error/confirm.component'
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs/Subject';
declare var componentHandler: any;
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { BookingActionsTO } from '../model/booking_information'
import myGlobalVal = require('app/global')
import {UserTO} from 'app/user/model/userTO'
import {AuthenticationService} from 'app/login/login.services'
import {sharedService} from 'app/common/services/sharedService'
import {MaterialProdSpecsvsSizeTO} from 'app/loading_slip/model/loading_information'
import { NgForm}    from '@angular/forms';
import {ResultMessage} from 'app/common/model/common_Information'
declare var moment: any;
import { FormGroup, FormArray , Validators } from '@angular/forms';
import { FormsModule }   from '@angular/forms';

@Component({
    selector: 'my-booking',
    templateUrl: 'app/booking/booking.html'
})


export class BookingComponent implements OnInit 
{
    @ViewChild(ErrorMessage) errorMsg: ErrorMessage;
    @ViewChild(CommonFunctions) commonFunc: CommonFunctions;

    constructor
    (   
        private commonServices: CommonServices,
        private agentServices: AgentsServices,
        public quotaDeclareservices: QuotaDeclarationService,
        private bookingServices: bookingServices,
        private _confirmService: ConfirmService,
        private activatedroute: ActivatedRoute,
        private _sanitizer: DomSanitizer,
        private loginService:AuthenticationService,
        private ss: sharedService,
    ) 
    {
            this.bookingTO = new BookingTO();
    }

   
    private bookingTO: any = new BookingTO();
    private orderDetailsTO: OrderDetailsTO;
    private lblMessage: string = undefined
    bookingId: number;
    dealerOrgId: number;
    quotadeclarationId: number;
    globalRateId: number;
    paramsSub: any;
    bookingRate: number;
    deliveryDays: number = 7;
    dealerList: CommonInformation[];
    dealerBookingHistLst: BookingTO[];
    dealerAddrInfo: AddressTO;
    compQuotaRateBand: QuotaInformation = new QuotaInformation;
    compQuotaRateBandList: QuotaInformation[] = [];
    bookingActionsTO: BookingActionsTO = new BookingActionsTO();
    OrderDetailsLst: OrderDetailsTO[] = [];
    deliveryAddressLst: DeliveryAddressTO[];
    deliveryAddress: DeliveryAddressTO = new DeliveryAddressTO();
    materialList: CommonInformation[];
    cdStructureList: CommonInformation[];
    deliveryPeriodList: CommonInformation[];
    globalBookingQty: number = 0;
    materialTO: CommonInformation;
    noOfDeliveriesList: CommonInformation[];
    cnfList: CommonInformation[];
    isConfirmed: boolean;
    isQuotaGreater: boolean = false;
    isRateGreater: boolean = false;
    isBookedQtyGreater: boolean = false;
    isEditBooking: boolean = false;
    isCollapse: boolean = true;
    loginUserId:number;
    isEdit: boolean = false;
    IdBookingExt: number;
    idBookingDelAddr: number
    editText: string = "Edit"
    ismin: number
    ismax: number
    isPreviousExist: boolean = false
    isClosed: boolean = false;
    editDeliveryAddrText: string = "Edit"
    userTO:UserTO;
    isShowCnFLst:boolean=false;
    isDealerSelect:boolean=false;
    isQuotaSelect:boolean=false;
    isDisplay:boolean=false;
    productSpec: string[] = [];
    ProdCatVal: boolean = false;
    productCategoryId : number = 0;
    productSizeSpecGroupedStockList: any = {}
    productMaterialSpecAndCatList: MaterialProdSpecsvsSizeTO[] = [];
    totalStraightQty: number = 0; totalBendQty: number = 0; totalRKShortQty: number = 0; totalRKLongQty: number = 0;
    totalTukadaQty: number = 0; totalCoilQty: number = 0; total: number;
    validUpTo:Date
    selectedRow : Number;
    public bookingForm: FormGroup;
    public submitted: boolean;
    isShowModal:boolean=false;
    onSelect(dealerId: number) {
        this.clearAll();
        if(dealerId!=0)
        {this.isDealerSelect=true;}
        let commonInfo = {} as CommonInformation;
        commonInfo.Value = dealerId;
        commonInfo.Text = null;
        this.bookingTO.NoOfDeliveries = 1;
        this.getDealerInfoOnBooking(dealerId);
    }

    getCompanyQuotaList(cnfId: number) {
        this.quotaDeclareservices.getCompanyQuota(cnfId)
            .subscribe(
            c => {
                this.compQuotaRateBandList = c
                if (this.compQuotaRateBandList.length > 1) 
                {
                    var currentquotadate:Date=moment(this.compQuotaRateBandList[0].CreatedOn);
                    var min=(this.compQuotaRateBandList[1].ValidUpto);
                    var validUpto=(moment(currentquotadate).add(min,'minutes'));
                    this.validUpTo=moment(validUpto).format("DD-MM-YYYY HH:mm A");
                    this.isPreviousExist=true;
                    this.isDisplay=false;
                    this.isQuotaSelect=false;
                }
                else
                {
                    this.isQuotaSelect = true;
                    this.isDisplay = true;
                    this.isPreviousExist = false;
                    this.compQuotaRateBandList.forEach(
                        c => 
                        {
                            this.compQuotaRateBand.RateBand = c.RateBand
                            this.compQuotaRateBand.DeclaredRate = c.DeclaredRate,
                            this.compQuotaRateBand.BalanceQty = c.BalanceQty
                            this.compQuotaRateBand.IdQuotaDeclaration = this.compQuotaRateBandList[0].IdQuotaDeclaration,
                            this.compQuotaRateBand.GlobalRateId = this.compQuotaRateBandList[0].GlobalRateId,
                            this.bookingTO.BookingRate = this.compQuotaRateBandList[0].DeclaredRate
                        }
                    );
                }
            },
            err => 
            {
                // Log errors if any
                console.log(err);
            });
    }

    getMaterialList() 
    {
        this.commonServices.getMaterial()
            .subscribe(
            materialList => this.materialList = materialList,
            err => {
                // Log errors if any
                console.log(err);
            });
    }

    getDealerInfoOnBooking(selDealerId: number) 
    {
        this.agentServices.getLastFourBookingHist(selDealerId).subscribe
        (
            p => 
            {
                this.dealerBookingHistLst = p
            },

            err => { console.log(err) }
        );
        if (this.dealerAddrInfo.PlotNo == null)
        {
            this.dealerAddrInfo = new AddressTO();
            this.dealerAddrInfo.PlotNo="null";
        }
        this.agentServices.getDealerAddrInfo(selDealerId).subscribe
            (
            p => {
                this.dealerAddrInfo = p
                if (!this.isEditBooking) {
                    if (this.dealerAddrInfo != undefined) {
                        this.addToDeliveryAddress(this.dealerAddrInfo)
                    }
                }
            },
            err => { console.log(err) }
            );
    }

    addToDeliveryAddress(dealerAddrInfo: AddressTO) 
    {
        if(dealerAddrInfo.PlotNo==null)
        {
            dealerAddrInfo.PlotNo="";
        }
        if(dealerAddrInfo.StreetName==null)
        {
            dealerAddrInfo.StreetName="";
        }
        if(dealerAddrInfo.AreaName==null)
        {
           dealerAddrInfo.AreaName=""; 
        }
        if(dealerAddrInfo.VillageName==null)
        {
            dealerAddrInfo.VillageName="";
        }
        if(dealerAddrInfo.DistrictName==null)
        {
            dealerAddrInfo.DistrictName="";
        }
        if(dealerAddrInfo.TalukaName==null)
        {
            dealerAddrInfo.TalukaName="";
        }
        
        this.deliveryAddressLst.push({
            'Address': dealerAddrInfo.PlotNo + dealerAddrInfo.StreetName + dealerAddrInfo.AreaName,
            'VillageName': dealerAddrInfo.VillageName,
            'DistrictName': dealerAddrInfo.DistrictName,
            'TalukaName': dealerAddrInfo.TalukaName,
            'Pincode': 0,
            'IdBookingDelAddr': 0
        });
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

    //[7/3/2017]Vijaymala added to get dealerlist of specific C&F
    onddlCnFChage(cnfOrgId: number) {
         this.isRateGreater=false;
        this.getCompanyQuotaList(cnfOrgId);
        this.getDealerList(cnfOrgId);
        this.clearAll();
        this.bookingTO.DealerOrgId=0;
    }

    clearAll()
    {
        this.dealerBookingHistLst=[];
        this.productMaterialSpecAndCatList=[];
        this.OrderDetailsLst = [];
        this.deliveryAddressLst = [];
        this.dealerAddrInfo=new AddressTO();
        this.globalBookingQty=0;
        this.bookingTO.DeliveryDays=7;
        if(this.bookingTO.CnFOrgId==0)
        {
            this.bookingTO.BookingRate=0;
            this.compQuotaRateBand=new QuotaInformation();
        }
        this.isQuotaGreater=false;
       
    }


    ngOnInit()
     {
        this.ss.showLoader();
        this.orderDetailsTO = new OrderDetailsTO()
        this.bookingTO.CdStructureId=1;
        this.getBookingOpenCloseInfo();
    }

    ngOnDestroy() {
        localStorage.removeItem('bookingId');
    }

    callBookingOpenInfo() 
    {
        this.bookingId = JSON.parse(localStorage.getItem('bookingId'));
        this.compQuotaRateBandList = [];
        this.noOfDeliveriesList = this.commonServices.getNoOfDeliveries();
        if (this.bookingId > 0) 
        {     
            this.deliveryAddress = new DeliveryAddressTO(),//{Address:'',VillageName:'', TalukaName:'', DistrictName:'', PinCode:0};
            this.editBookingList();
            this.ss.hideLoader();
        }
        else 
        {
            this.isEditBooking = false;
            componentHandler.upgradeDom();
            this.OrderDetailsLst = [];
            this.deliveryAddressLst = [];
            this.getMaterialList();
            this.getCdstructureList();
            this.getDeliveryPeriodList();
            this.isQuotaGreater = false;
            this.bookingTO.IsConfirmed = '';
            this.bookingTO.DeliveryDays = 7;
            this.ss.hideLoader();
        }
    }

    getBookingOpenCloseInfo()
    {
        this.bookingServices.getBookinOpenCloseInfo()
            .subscribe(
            bookingActionsTO => {
                this.bookingActionsTO = bookingActionsTO
                debugger;
                if(this.bookingActionsTO != null || this.bookingActionsTO != undefined ){
                if (this.bookingActionsTO.BookingStatus == "CLOSE") {
                    this.isClosed = true;
                    this.lblMessage = "Bookings Are Closed .";
                }
                else {
                    this.isClosed = false;
                    this.userTO = this.loginService.getUserTOFromLocalStorage();
                    if(this.userTO !=null || this.userTO !=undefined)
                    {
                    this.userTO.UserRoleList.forEach(c => {
                        if (c.RoleId == myGlobalVal.UserRole.C_AND_F_AGENT) {
                            this.isShowCnFLst = false;
                            this.getDealerList(this.userTO.OrganizationId);
                            this.getCompanyQuotaList(this.userTO.OrganizationId);
                            this.bookingTO.CnFOrgId = this.userTO.OrganizationId;
                        }
                        else {
                            this.isShowCnFLst = true;
                            this.getcnfList(myGlobalVal.orgTypeEnum.CNFTYPEID);
                        }
                    })
                    }
                    this.callBookingOpenInfo();
                }
            }
            this.ss.hideLoader();
            },

            err => {
                this.ss.hideLoader();

                // Log errors if any
                console.log(err);
            });
        return this.isClosed;
    }

    getDealerList(OrganizationId: number) 
    {
        this.dealerList = [];
        this.commonServices.getDealerList(OrganizationId)
            .subscribe
            (
            commonInfoList => this.dealerList = commonInfoList,
            err => {
                // Log errors if any
                console.log(err);
            });
    }

    onkey(event: any) {
        if (this.globalBookingQty > this.compQuotaRateBand.BalanceQty) {
            this.isQuotaGreater = true;
        }
        else {
            this.isQuotaGreater = false;
        }
    }

    onchange() {
        if (!this.isEditBooking) {
            if (this.globalBookingQty > this.compQuotaRateBand.BalanceQty) {
                this.isQuotaGreater = true;
            }
            else {
                this.isQuotaGreater = false;
            }
        }
    }
    getStyle() {
        if (this.isQuotaGreater) {
            return "red";
        } else {
            return "white";
        }
    }
    getRateStyle() {
        if (this.isRateGreater) {
            return "red";
        } else {
            return "white";
        }
    }
    onratechange() {
        if (!this.isEditBooking) {
            if (this.bookingTO.BookingRate < (this.compQuotaRateBand.DeclaredRate - this.compQuotaRateBand.RateBand)) {
                this.isRateGreater = true;
            }
            else {
                this.isRateGreater = false;
            }
            if (this.bookingTO.BookingRate == null) {
                this.isRateGreater = false
            }
        }
    }

    getBookedQtyStyle(orderDetails: OrderDetailsTO) {
        if (orderDetails.BookedQty == 0) {
            return "red";
        }
        else if (orderDetails.BookedQty == undefined || orderDetails.BookedQty != 0) {
            return "white";
        }
    }

    isNumber(evt: any) {
        return this.commonServices.isNumber(evt);
    }

    confirmAndAddOrder(orderDetails: OrderDetailsTO, materialTO: MaterialProdSpecsvsSizeTO) {

        if (orderDetails.BookedQty == null || orderDetails.BookedQty == 0) {

            return;
        }

        // if (this.globalBookingQty >= + this.tempOrderQty + +orderDetails.BookedQty) {
      if (this.globalBookingQty >= materialTO.TotalValue) {
          //  this.addNewOrder(orderDetails, materialTO);
            return "white";
        }
        else {


            this.errorMsg.showErrorMessage("Entered order Quantity can not be greater than main quantity.", "Warning");
            return "red";
        }
    }
    //tempOrderQty: number = 0;
    // addNewOrder(materialTO: MaterialProdSpecsvsSizeTO) {
    //     this.OrderDetailsLst.push({
    //         'MaterialSubType': materialTO.MaterialCategory,
    //         'BookedQty': materialTO.BookedQty,
    //         'Rate': orderDetails.Rate,
    //         'MaterialId': materialTO.Value
    //     });
    //     this.tempOrderQty = +this.tempOrderQty + +orderDetails.BookedQty;

    //     this.orderDetailsTO = new OrderDetailsTO()
    // }

    addNewDeliveryAddr(deliveryAddr: DeliveryAddressTO) {
     
        if (deliveryAddr.Address == undefined) {
            return;
        }
        
        
        this.deliveryAddressLst.push({
            'Address': deliveryAddr.Address,
            'VillageName': deliveryAddr.VillageName,
            'DistrictName': deliveryAddr.DistrictName,
            'TalukaName': deliveryAddr.TalukaName,
            'Pincode': 0,
            'IdBookingDelAddr': deliveryAddr.IdBookingDelAddr
        });
      
        // this.deliveryAddress = new DeliveryAddressTO()
    }

    bookingOrder()
     {
        var msg: string;
        var pendingmsg: string;
        let BookingOperation: Observable<ResultMessage>;
        this.bookingTO.QuotaDeclarationId = this.compQuotaRateBand.IdQuotaDeclaration;
        this.bookingTO.GlobalRateId = this.compQuotaRateBand.GlobalRateId;
        this.bookingTO.IsConfirmed = (this.bookingTO.IsConfirmed) ? 1 : 0;
        this.bookingTO.IsJointDelivery = (this.bookingTO.IsJointDelivery) ? 1 : 0;
        this.bookingTO.OrderDetailsLst = this.OrderDetailsLst;
        this.bookingTO.DeliveryAddressLst = this.deliveryAddressLst;
        this.bookingTO.BookingQty = this.globalBookingQty;
        this.loginUserId=this.userTO.IdUser;
        this.bookingTO.CdStructure=this.cdStructureList.filter(c=>c.Value==this.bookingTO.CdStructureId)[0].Text;
        if (this.bookingTO.BookingRate == undefined) {
            this.bookingTO.BookingRate = this.bookingRate;
        }
        
        if (!this.isEditBooking) {
            msg = "Booked";
            BookingOperation = this.bookingServices.addBooking(this.bookingTO,this.loginUserId);

        }
        else {
            BookingOperation = this.bookingServices.editBookingOrder(this.bookingTO,this.loginUserId);
            msg = "Updated";
        }
        if (this.isQuotaGreater || this.isRateGreater || this.bookingTO.DeliveryDays > 7) {
            pendingmsg = "This Booking Order pending for approval";
        }
        else {
            pendingmsg = "Order " + msg + " Successfully";
        }
        this.ss.showLoader();

        BookingOperation.subscribe(booking => 
        {
            if (booking.Result == 1) {

                if (this.isEditBooking == true || this.isEditBooking == false) {
                    pendingmsg = booking.Text;
                }
                if (this.isQuotaGreater || this.isRateGreater || this.bookingTO.DeliveryDays > 7) {

                    var fields = booking.Text.split(' ');
                    var bookingId = (fields[2] + " " + fields[3] + " " + fields[4]);
                    pendingmsg ="booking Order " +  bookingId  + " pending for approval";
                }

                this.ss.hideLoader();
                this.errorMsg.showErrorMessage(pendingmsg, "Information");
                this.deliveryAddressLst = []
                this.OrderDetailsLst = []
                // this.bookingTO = new BookingTO();
                this.bookingTO.BookingQty = 0;
                this.globalBookingQty = 0;
                this.bookingTO.CdStructureId = 1;
                this.isQuotaGreater=false;
                this.isRateGreater=false;
                this.getBookingOpenCloseInfo();
                if (this.userTO.UserRoleList[0].RoleId == myGlobalVal.UserRole.C_AND_F_AGENT) {
                    this.getCompanyQuotaList(this.userTO.OrganizationId);
                }
                else {
                    this.getCompanyQuotaList(this.bookingTO.CnFOrgId);
                }
            }
            else {
                this.ss.hideLoader();
                this.errorMsg.showErrorMessage("Order not Booked", "Error");
            }

        },
            err => {
                this.ss.hideLoader();
            });

    }
    title = "Notifier!!!";

    showConfirmDialog(isValid:Boolean): boolean
     {
        var warningmsg: string
        if(this.globalBookingQty <=0)
        {
        this.errorMsg.showErrorMessage("Order Quantity Must Be Greater Than Zero.", "Warning");
        this.isShowModal=false;
        return;
        }
        else if (this.bookingTO.NoOfDeliveries != this.deliveryAddressLst.length) {
            this.errorMsg.showErrorMessage("Number OF Deliveries and  Delivery Address are not matching.", "Warning");
        }
        else {
            if (!this.isEditBooking) {
                warningmsg = "Have You Confirm The Order Details?";
            }
            else {
                warningmsg = "Do You Want To Update The Order?";
            }
            this._confirmService.activate(warningmsg, "Confirmation")
                .then(res => {
                    if (res) {
                        this.bookingOrder();
                    } else {
                    }
                });
            return false;
        }
    }

    ValidateQtyWithGlobal(val: string) {
        alert('enter value first' + val);
    }

    //Vijaymala added to get booking list for EditedbookingTO
    editBookingList() 
    {
        this.orderDetailsTO = new OrderDetailsTO()
        this.isEditBooking = true;
        this.bookingServices.getBookingListAccToBookingId(this.bookingId)
            .subscribe(
            bookingTO => {
                this.isShowCnFLst = false;
                this.isQuotaSelect = true;
                this.isDisplay = true;
                this.bookingTO = bookingTO,
                this.deliveryAddress = new DeliveryAddressTO(),//{Address:'',VillageName:'', TalukaName:'', DistrictName:'', PinCode:0};
                this.deliveryAddressLst = bookingTO.DeliveryAddressLst;
                this.dealerAddrInfo = new AddressTO();
                this.dealerAddrInfo.PlotNo="null";
                this.getDealerInfoOnBooking(bookingTO.DealerOrgId);
                this.OrderDetailsLst = bookingTO.OrderDetailsLst;
                this.globalBookingQty = bookingTO.BookingQty;
                this.compQuotaRateBand.IdQuotaDeclaration =  this.bookingTO.QuotaDeclarationId,
                this.compQuotaRateBand.GlobalRateId=this.bookingTO.GlobalRateId,
                this.getMaterialList();
                this.getCdstructureList();
                this.getDeliveryPeriodList();
                if (this.bookingTO.IsConfirmed == 1) {
                    this.bookingTO.IsConfirmed = true;
                }
                else {
                    this.bookingTO.IsConfirmed = false;
                }

                if (this.bookingTO.IsJointDelivery == 1) {
                    this.bookingTO.IsJointDelivery = true;
                }
                else {
                    this.bookingTO.IsJointDelivery = false;
                }

            },
            err => {
                // Log errors if any
                console.log(err);
            });

    }

    deleteMaterial(event: Event, orderDetails: OrderDetailsTO) {
        event.preventDefault();
        var index = this.OrderDetailsLst.indexOf(orderDetails);
        this.OrderDetailsLst.splice(index, 1);
        if(this.deliveryAddressLst.length>0)
        {
            this.editText="Edit";
        }
    }

    editMaterial(event: Event, orderDetails: OrderDetailsTO) {
        event.preventDefault();
        this.IdBookingExt = orderDetails.IdBookingExt;
        if (this.editText == "Update") {
            const orglist = this.OrderDetailsLst.find(c => c.IdBookingExt === orderDetails.IdBookingExt);
            if (orglist) {
                orglist.BookedQty = orderDetails.BookedQty;
                this.isEdit = true
            }
        }
        if (this.isEdit) {
            this.editText = "Edit";
            // alert("Record Updated Successfully");
        }
        else {
            this.editText = "Update"

        }

    }

    deleteDeliveryAddress(event: Event, deliveryAddr: DeliveryAddressTO) {
        event.preventDefault();
        var i = this.deliveryAddressLst.indexOf(deliveryAddr);
        this.deliveryAddressLst.splice(i, 1);
    }

    editDeliveryAddress(index:number) {
         this.selectedRow = index;
        
        event.preventDefault();
       // this.idBookingDelAddr = deliveryAddr.IdBookingDelAddr;
        this.editDeliveryAddrText = "Update";
        this.isEdit = true;
        // if (this.editDeliveryAddrText == "Update") {
        //     const deliverylist = this.deliveryAddressLst.find(c => c.IdBookingDelAddr === this.idBookingDelAddr);
        //     if (deliverylist) {
        //         this.isEdit = true;
        //         deliverylist.Address = deliveryAddr.Address;
        //         deliverylist.TalukaName = deliveryAddr.TalukaName;
        //         deliverylist.DistrictName = deliveryAddr.DistrictName;
        //         deliverylist.VillageName = deliveryAddr.VillageName;
        //     }
        //     if (!this.isEdit) {
        //         this.editDeliveryAddrText = "Edit";
        //     }
        //     else {
        //         this.editDeliveryAddrText = "Update"

        //     }

       // }
    }
    selectOnClick($event: Event) {
        $event.target.select();
    }

    autocompleListFormatter = (dealerList: CommonInformation): SafeHtml => {
        let html = `<span>${dealerList.Text}</span>`;
        return this._sanitizer.bypassSecurityTrustHtml(html);
    }


    isRateBetween() {
        this.ismin = this.compQuotaRateBand.DeclaredRate + -499;
        this.ismax = this.compQuotaRateBand.DeclaredRate + +499;

        if ((this.bookingTO.BookingRate < this.ismin) || (this.bookingTO.BookingRate > this.ismax)) {
            this.errorMsg.showErrorMessage(" Booking Rate Must Be In Between " + (this.ismin) + " and " + (this.ismax), "Warning");
            this.bookingTO.BookingRate = null;
            this.isRateGreater = false;
        }
    }

    colorstyle() {
        if (this.isRateGreater) {
            return "white";
        }
        else {
            return "black";
        }
    }
    qtycolorstyle(){
        if (this.isQuotaGreater) {
            return "white";
        }
        else {
            return "black";
        }
    }
    onSelectionChange(companyQuotaRate: QuotaInformation) {
        this.isQuotaSelect = true;
        this.isDisplay = true;
        this.compQuotaRateBand.BalanceQty = companyQuotaRate.BalanceQty;
        this.compQuotaRateBand.DeclaredRate = companyQuotaRate.DeclaredRate;
        this.compQuotaRateBand.RateBand = companyQuotaRate.RateBand
        this.bookingTO.BookingRate = companyQuotaRate.DeclaredRate;
        this.compQuotaRateBand.IdQuotaDeclaration = companyQuotaRate.IdQuotaDeclaration;
        this.compQuotaRateBand.GlobalRateId = companyQuotaRate.GlobalRateId;
    }

    //[17/03/2017]Vijaya added to get cdStructure list,delivery period list,district list
    getCdstructureList() {
        this.commonServices.getCdstructureList()
            .subscribe(
            cdStructureList => this.cdStructureList = cdStructureList,
            err => {
                // Log errors if any
                console.log(err);
            });
    }

    getDeliveryPeriodList() {
        this.commonServices.getDeliveryPeriodList()
            .subscribe(
            deliveryPeriodList => {
            this.deliveryPeriodList = deliveryPeriodList,
                this.ss.hideLoader()
            },
            err => {
                // Log errors if any
                console.log(err);
            });
    }


    CollectProductSpecif(proCategoryVal : number){
        this.isBookedQtyGreater=false;
        this.ss.showLoader();
        this.ProdCatVal = proCategoryVal == 2 ? true : false;
        // this.ProdCatVal == true?  this.productCategoryId = myGlobalVal.ProductCatE.Plain 
        // : this.productCategoryId = myGlobalVal.ProductCatE.TMT         
        this.productCategoryId = this.ProdCatVal ? myGlobalVal.ProductCatE.Plain 
        : myGlobalVal.ProductCatE.TMT
      
            this.bookingServices.gnGetBookingMaterialExtList(this.productCategoryId).subscribe(
                data=>{
                    this.OrderDetailsLst = data;
                    this.generateListSizevsSpecs();
                    this.ss.hideLoader();
                },
                err=>{
                    console.log("Server Error : " + err)
                    this.ss.hideLoader();
                }
            )
    }

    generateListSizevsSpecs() {
        this.productSpec = []
        this.productSizeSpecGroupedStockList = {};
        this.productMaterialSpecAndCatList =[]
        var uniqueLayerIds = this.OrderDetailsLst.map(p => p.ProdSpecDesc).filter((value, index, self) => self.indexOf(value) === index);
        uniqueLayerIds.forEach(element => {
            this.productSpec.push(element)
        })
        var i = 0
        for (var i = 0; i < this.OrderDetailsLst.length; ++i) {
            var obj = this.OrderDetailsLst[i];

            //If a property for this DtmStamp does not exist yet, create
            if (this.productSizeSpecGroupedStockList[obj.MaterialSubType] === undefined)
                this.productSizeSpecGroupedStockList[obj.MaterialSubType] = [obj.MaterialSubType];

            //x will always be the array corresponding to the current DtmStamp. Push a value the current value to it.
            this.productSizeSpecGroupedStockList[obj.MaterialSubType].push(obj.BookedQty);
        }


        //debugger;
        for (var k in this.productSizeSpecGroupedStockList) {
            let i: number = 0;
            let materialTO: MaterialProdSpecsvsSizeTO = new MaterialProdSpecsvsSizeTO()
            if (this.productSizeSpecGroupedStockList.hasOwnProperty(k)) {
                //alert('val : ' + this.groupedStockList[k])
                var matval2 = this.productSizeSpecGroupedStockList[k][2]
                var matval4 = this.productSizeSpecGroupedStockList[k][4]
                var matval6 = this.productSizeSpecGroupedStockList[k][6]
                materialTO.MaterialCategory = this.productSizeSpecGroupedStockList[k][0];
                materialTO.StraightQty = this.productSizeSpecGroupedStockList[k][1];
                materialTO.BendQty = matval2
                materialTO.RKShortQty = this.productSizeSpecGroupedStockList[k][3];
                materialTO.RKLongQty = matval4
                materialTO.TukadaQty = this.productSizeSpecGroupedStockList[k][5];
                materialTO.CoilQty = matval6
                materialTO.TotalValue = materialTO.StraightQty + +materialTO.BendQty + +materialTO.RKShortQty
                    + +materialTO.RKLongQty + +materialTO.TukadaQty + +materialTO.CoilQty
                this.productMaterialSpecAndCatList.push(materialTO);
            }
        }
    }

    addBookingQtyInExtTOList(){
       debugger;
        // if (this.globalBookingQty >= + this.tempOrderQty + +orderDetails.BookedQty) {

         this.productMaterialSpecAndCatList.forEach(ele => {
            this.OrderDetailsLst.filter(p => p.MaterialSubType == ele.MaterialCategory)[0].BookedQty = ele.StraightQty
                , this.OrderDetailsLst.filter(p => p.MaterialSubType == ele.MaterialCategory)[1].BookedQty = ele.BendQty
                , this.OrderDetailsLst.filter(p => p.MaterialSubType == ele.MaterialCategory)[2].BookedQty = ele.RKShortQty
                , this.OrderDetailsLst.filter(p => p.MaterialSubType == ele.MaterialCategory)[3].BookedQty = ele.RKLongQty
                , this.OrderDetailsLst.filter(p => p.MaterialSubType == ele.MaterialCategory)[4].BookedQty = ele.TukadaQty
                , this.OrderDetailsLst.filter(p => p.MaterialSubType == ele.MaterialCategory)[5].BookedQty = ele.CoilQty
        })
       this.OrderDetailsLst=this.OrderDetailsLst.filter(p=>p.BookedQty>0);
    }

     calculateTotal() {
        this.totalStraightQty = 0
        this.totalBendQty = 0
        this.totalRKShortQty = 0
        this.totalRKLongQty = 0
        this.totalTukadaQty = 0
        this.totalCoilQty = 0

        this.productMaterialSpecAndCatList.forEach(
            element => {
                this.totalStraightQty += +element.StraightQty
                this.totalBendQty += +element.BendQty
                this.totalRKShortQty += +element.RKShortQty
                this.totalRKLongQty += +element.RKLongQty
                this.totalTukadaQty += +element.TukadaQty
                this.totalCoilQty += +element.CoilQty
                this.total = this.totalStraightQty+this.totalBendQty+this.totalRKShortQty+this.totalRKLongQty+this.totalTukadaQty+this.totalCoilQty;
                if (this.total > this.globalBookingQty) {
                    this.isBookedQtyGreater = true;
                }
                else {
                    this.isBookedQtyGreater = false;
                }  
         });
    }

clearList(){
    this.total=0;
    this.OrderDetailsLst=[];
}

checkBookingQty()
{
    if(this.globalBookingQty <=0)
    {
     this.errorMsg.showErrorMessage("Order Quantity Must Be Greater Than Zero.", "Warning");
     this.isShowModal=false;
     return;
    }
    else
    {
     this.isShowModal=true;
     this.CollectProductSpecif(1);
    }
}

}
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, ViewChild, Pipe, Injectable, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { CommonServices } from 'app/common/services/common.services'
import { CommonInformation } from 'app/common/model/common_Information'
import { bookingServices } from 'app/booking/services/booking_service'
import { ​LoadingSlipExtTO } from '../model/loading_information'
import { LoadingSlipDtlTO } from '../model/loading_information'
import { BookingTO } from 'app/booking/model/booking_information'
import { LoadingSlipTO } from '../model/loading_information'
import { LoadingTO } from '../model/loading_information'
import { MaterialProdSpecsvsSizeTO } from '../model/loading_information'
import { LoadingServices } from '../services/loading_service'
import { ErrorMessage } from 'app/error/errorMessage'
import { ConfirmService } from 'app/error/confirm.service'
import { ConfirmComponent } from 'app/error/confirm.component'
import { DeliveryAddressTO } from 'app/booking/model/booking_information'
// import { CustomValidators } from 'ng2-validation';
import { sharedService } from 'app/common/services/sharedService';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { FormBuilder, FormArray, Validators } from '@angular/forms';
import { AuthenticationService } from 'app/login/login.services'
import { UserTO } from 'app/user/model/userTO'
import { LoadingQuotaTO } from '../model/loading_quotaTO'
import { ResultMessage } from 'app/common/model/common_Information'

import myGlobalVal = require('app/global')
import encryptDecrypt = require('app/common/services/myservice')
declare var componentHandler: any;

@Component({
    selector: 'loading-slip',
    // template:'<h1>Hello</h1>'
    templateUrl: 'app/loading_slip/loading_slip.html'
})

export class LoadingSlipComponent implements OnInit {
    @ViewChild(ErrorMessage) errorMsg: ErrorMessage;
    form: FormGroup;
    userTo: UserTO = {}
    constructor(private ss: sharedService,
        private commonServices: CommonServices,
        private bookingServices: bookingServices,
        private loadingServices: LoadingServices,
        private _confirmService: ConfirmService,
        private builder: FormBuilder
        , private _sanitizer: DomSanitizer
        , private authLoginServices: AuthenticationService
    ) {
        this.userTo = authLoginServices.getUserTOFromLocalStorage();
    }
    resultMessage: ResultMessage = new ResultMessage;

    dealerList: CommonInformation[];
    cdStructureLst: CommonInformation[];
    noOfDeliveriesList: CommonInformation[];
    materialList: CommonInformation[];
    bottomLoadingMaterialSequenceTOList: LoadingSlipExtTO[] = [];
    middleLoadingMaterialSequenceTOList: LoadingSlipExtTO[] = [];
    middle2LoadingMaterialSequenceTOList: LoadingSlipExtTO[] = [];
    middle3LoadingMaterialSequenceTOList: LoadingSlipExtTO[] = [];
    topLoadingMaterialSequenceTOList: LoadingSlipExtTO[] = [];
    commonLoadingSlipExtToList: LoadingSlipExtTO[] = [];
    loadingMaterialSequenceTO: ​LoadingSlipExtTO;
    dealerBookingList: BookingTO[] = [];
    MaterialTO: CommonInformation;
    isDealerSelectedID: boolean = false;
    private loadingSlipTO: LoadingSlipTO = new LoadingSlipTO();
    private loadingTO: any = { NoOfDeliveries: 0 };
    private loadingSlipToList: LoadingSlipTO[] = [];
    private qtyToLoad: number = 0
    private bookingTo: any = new BookingTO();
    isVisibleLoadingTab: any = [];
    cnfOrgList: CommonInformation[] = [];
    transporterOrgList: CommonInformation[] = [];

    private listDeliveryAddr: DeliveryAddressTO[] = []
    private tempListDeliveryAddr: DeliveryAddressTO[] = []
    vehicleNo: number = 0;
    selectedDealerID: number = 0;
    public selectedCnfId: any
    public cnfTo: CommonInformation = {}
    public transporterTo: CommonInformation = {}
    isJointDelivery: false;
    noOfDelivery: number = 0;
    isTopLoading: number = 0; isMiddle1Loading: number = 0; isMiddle2Loading: number = 0;
    isMiddle3Loading: number = 0; isBottomLoading: number = 0;

    isExpandOrder: boolean = true;
    totalQuantitySlipTo: number = 0;
    selectedMaterialLayerId: number = 1
    isAddrSelected: boolean = false;
    public continent: FormControl;
    productCategoryList: CommonInformation[];
    productSpec: string[] ;
    productMaterialSpecAndCatList: MaterialProdSpecsvsSizeTO[] = [];
    productCategoryId: number = 0;
    productSizeSpecGroupedStockList: any = []
    isLoginByCnf: boolean = false;
    ProdCatVal: boolean = false;
    isValidLoadedQty: boolean = false;
    isDispMaterialSizess: boolean = false;
     keys: String[];
    firstKey: string;
    dealerTo : CommonInformation = {}
    commonDealerList : BookingTO[] = []
    isQuotaDeclared: boolean = false;
    lblConfirmationMsg : string 
    bookingInfoTo : BookingTO = new BookingTO
    lblBookingNotFoundMsg : string  ;
    ngOnInit() {
        this.continent = new FormControl('')
        this.ss.showLoader();
        componentHandler.upgradeDom();
        this.isDelaredTodayLoadingQuota()
        //this.getOrgList(myGlobalVal.orgTypeEnum.DEALERTYPEID);
        this.bookingTo = new BookingTO();
        this.initializeLoadingSeq();
        if (this.userTo.UserRoleList[0].RoleId == myGlobalVal.UserRole.C_AND_F_AGENT) {
            this.isLoginByCnf = true;
            this.selectedCnfId = this.userTo.OrganizationId;
            this.getDealerList(this.selectedCnfId);
        }
        else {
            this.getcnfList();
        }
        this.getCdstructureList();
        this.noOfDeliveriesList = this.commonServices.getNoOfDeliveries();
        this.getProductCatList();
        this.getTransporterList()
        this.getMaterialList();
        this.loadingMaterialSequenceTO = new LoadingSlipExtTO();
        this.bottomLoadingMaterialSequenceTOList = [];
        this.middleLoadingMaterialSequenceTOList = [];
        this.topLoadingMaterialSequenceTOList = [];
        this.loadingSlipTO = new LoadingSlipTO();
        this.loadingMaterialSequenceTO = new LoadingSlipExtTO();
        this.loadingSlipTO.LoadingSlipExtTOList = [];

        this.MaterialTO = new CommonInformation();
        this.loadingSlipTO.TblLoadingSlipDtlTO = new LoadingSlipDtlTO();
        //this.loadingSlipTO.LoadingSlipDtlTOList = [];

    }

    initializeLoadingSeq() {
        this.isTopLoading = 0; this.isMiddle1Loading = 0; this.isMiddle2Loading = 0;
        this.isMiddle3Loading = 0; this.isBottomLoading = 0;
    }

    onNoOfDeliveryChange(deliveryNum: number) {
        //alert('val : ' + this.selectedCnfId)
        if (this.loadingTO.VehicleNo == null || this.loadingTO.VehicleNo == "") {
            //this.loadingTO.NoOfDeliveries = 0
            this.loadingTO.NoOfDeliveries = "No. of Deliveries"
            this.errorMsg.showErrorMessage("Please enter Vehicle No. first.", "Warning");
            return;
        }
        this.initializeLoadingSeq();
        for (var _i = 1; _i <= deliveryNum; _i++) {
            switch (_i) {
                case 1:
                    this.isBottomLoading = 1
                    break;
                case 2:
                    this.isTopLoading = 1
                    break;
                case 3:
                    this.isMiddle1Loading = 1
                    break;
                case 4:
                    this.isMiddle2Loading = 1
                    break;
                case 5:
                    this.isMiddle3Loading = 1
                    break;
            }
        }
    }

    changeLoadingSequence(loadingSeq: string) {
        loadingSeq.split('|').forEach(p => {
            switch (p) {
                case myGlobalVal.loadingSequenceName.BOTTOM.toString():
                    this.isBottomLoading = 0;
                    break;

                case myGlobalVal.loadingSequenceName.MIDDLE1.toString():
                    this.isMiddle1Loading = 0;
                    break;

                case myGlobalVal.loadingSequenceName.MIDDLE2.toString():
                    this.isMiddle2Loading = 0;
                    break;

                case myGlobalVal.loadingSequenceName.MIDDLE3.toString():
                    this.isMiddle3Loading = 0;
                    break;

                case myGlobalVal.loadingSequenceName.TOP.toString():
                    this.isTopLoading = 0;
                    break;

                default:
                    break;
            }
        });

    }

    onSelect(dealerId: number) {
        debugger
        if (this.loadingSlipToList.length > 0 && (!this.isJointDelivery || this.isJointDelivery == undefined)) {            
            this.errorMsg.showErrorMessage("You are not able to genrate joint delivery slip.", "Warning");
            var vDealerInf = this.loadingSlipToList.filter(p => p.LoadingLayerId == this.selectedMaterialLayerId)[0]
            this.dealerTo.Value = vDealerInf.DealerOrgId
            this.dealerTo.Text = vDealerInf.DealerOrgName
            return;
        }
        var dealerAvl= false;
        this.loadingSlipToList.filter(p => p.LoadingLayerId == this.selectedMaterialLayerId).forEach(
            ele => {
                if (ele.DealerOrgId != dealerId) {
                    this.errorMsg.showErrorMessage("You are not able to genrate slip for different dealer order in same layer.", "Warning");
                    this.dealerTo.Value = ele.DealerOrgId
                    this.dealerTo.Text = ele.DealerOrgName
                    return dealerAvl = true;
                }
            }
        )

        if(dealerAvl){return}
        this.listDeliveryAddr = [];
        this.tempListDeliveryAddr = [];
        let commonInfo = {} as CommonInformation;
        commonInfo.Value = dealerId;
        commonInfo.Text = null;
        this.getDealerLoadingInfo(commonInfo);
        this.loadingSlipTO.DealerOrgId = dealerId;
        this.loadingSlipTO.LoadingLayerId = this.selectedMaterialLayerId;
        //this.pushLoadingSlipChanges();
        //this.isExpandOrder = true;
        this.isDealerSelectedID = false;
    }


    getDealerLoadingInfo(commonInfo: CommonInformation) {
        var dealerListResult = this.commonDealerList.filter(p=>p.DealerOrgId == commonInfo.Value)
        if(dealerListResult.length == 0 || dealerListResult == undefined){
        this.bookingServices.getDealersBookingList(commonInfo.Value).subscribe(
            p => {
                if(p == null || p.length == 0){
                    this.lblBookingNotFoundMsg = " No pending orders !";
                        return 
                }
                this.lblBookingNotFoundMsg = undefined
                p.forEach(element=>element.BalQty = element.PendingQty)
                debugger
                if(this.commonDealerList.length == 0){
                    this.commonDealerList = p
                }
                else{
                    //this.commonDealerList.concat(p)
                    p.forEach(element=>this.commonDealerList.push(element))
                }
                this.dealerBookingList = p
                this.isExpandOrder = true
            },
            err => { console.log(err) }
        );
    }
    else{
        this.lblBookingNotFoundMsg = "";
         this.dealerBookingList = dealerListResult;
    }
    }



    getOrgList(OrgTypeId: number) {
        this.dealerList = [];
        this.commonServices.getOrgList(OrgTypeId)
            .subscribe(
            commonInfoList => this.dealerList = commonInfoList,
            err => {
                alert(err);
                this.ss.hideLoader();
                // Log errors if any
                console.log(err);
            });
        // return this.commonInfoList;
    }

    getMaterialList() {
        this.commonServices.getMaterial()
            .subscribe(
            materialList => {
            this.materialList = materialList
                this.ss.hideLoader();
            },
            err => {
                // Log errors if any
                console.log(err);
                alert('Server error : ' + err);
                this.ss.hideLoader();
            },
            () => {
                console.log("Done")
                this.ss.hideLoader();
            });
    }

    //Declare varaible for tempOrder
    private tempOrderQty: number = 0;
    addNewLoadingSeqQty(MaterialTO: CommonInformation, SequenceNo: number) {

        this.bookingTo = this.dealerBookingList.filter(p => p.IsSelect)[0];
        var isAddrSelected = this.tempListDeliveryAddr.filter(p => p.IsSelected);
        if (!this.isDealerSelectedID) {
            this.errorMsg.showErrorMessage("Please select the order from pending list", "Warning");
            return;
        }
        else if (this.bookingTo.LoadingQty < +this.tempOrderQty + +this.loadingMaterialSequenceTO.LoadingQty) {
            this.errorMsg.showErrorMessage("Entered order Quantity can not be greater than loading quantity.", "Warning");
            return;
        }
        else if (this.bookingTo.LoadingQty == null || this.bookingTo.LoadingQty == 0) {
            this.errorMsg.showErrorMessage("Please enter the loading Quantity", "Warning");
            return;
        }
        else if (this.loadingMaterialSequenceTO.LoadingQty == null || this.loadingMaterialSequenceTO.LoadingQty == 0) {
            this.errorMsg.showErrorMessage("Please enter the Quantity first", "Warning");
            return;
        }
        else if (MaterialTO == undefined) {
            this.errorMsg.showErrorMessage("Please enter the Quantity first", "Warning");
            return;
        }

        else if (isAddrSelected == undefined || isAddrSelected.length == 0) {
            this.errorMsg.showErrorMessage("Select the Delivery address first.", "Warning");
            return;
        }

        this.mapLayerDeliveryAddr(SequenceNo);
        let obj = {
            'IdLoadingSlipExt': this.loadingMaterialSequenceTO.IdLoadingSlipExt,
            'BookingId': this.loadingMaterialSequenceTO.BookingId,
            'LoadingSlipId': this.loadingMaterialSequenceTO.LoadingSlipId,
            'LoadingLayerid': SequenceNo,
            'MaterialId': MaterialTO.Value,
            'BookingExtId': this.loadingMaterialSequenceTO.BookingExtId,
            'LoadingQty': this.loadingMaterialSequenceTO.LoadingQty,
            'LoadingItem': MaterialTO.Text
        };
        switch (SequenceNo) {
            case 1:
                this.bottomLoadingMaterialSequenceTOList.push(obj);
                break;
            case 2:
                this.middleLoadingMaterialSequenceTOList.push(obj);
                break;
            case 3:
                this.middle2LoadingMaterialSequenceTOList.push(obj);
                break;
            case 4:
                this.middle3LoadingMaterialSequenceTOList.push(obj);
                break;
            case 5:
                this.topLoadingMaterialSequenceTOList.push(obj);
                break;
            default:
                break;
        }
        this.tempOrderQty = +this.tempOrderQty + +this.loadingMaterialSequenceTO.LoadingQty;
        this.loadingMaterialSequenceTO = new LoadingSlipExtTO();
    }

    //[GJ] : 20170223 : Generate the Loading Slip
    generateLoadingSlip() {
        var vlist = this.bottomLoadingMaterialSequenceTOList.concat(this.middleLoadingMaterialSequenceTOList
            , this.topLoadingMaterialSequenceTOList, this.middle2LoadingMaterialSequenceTOList, this.middle3LoadingMaterialSequenceTOList);
        this.loadingSlipTO.LoadingSlipExtTOList = vlist;
        //this.loadingSlipTO.LoadingSlipDtlTOList = this.dealerBookingList.filter(p=>p.IsSelect);
        this.loadingSlipTO.DealerOrgId = this.selectedDealerID;
        this.loadingSlipTO.DeliveryAddressTOList = this.listDeliveryAddr.filter(p => p.IsSelected);
        this.loadingSlipToList.push(this.loadingSlipTO);
        this.generateAddLoadingLayer(vlist);
        //Clear the data after loading slip generated
        this.changeLoadingSequence(this.loadingSlipTO.SequenceLoading);
        this.listDeliveryAddr = []
        this.tempListDeliveryAddr = [];
        this.bottomLoadingMaterialSequenceTOList = []
        this.middleLoadingMaterialSequenceTOList = []
        this.topLoadingMaterialSequenceTOList = []
        this.middle2LoadingMaterialSequenceTOList = []
        this.middle3LoadingMaterialSequenceTOList = []
        //this.loadingSlipTO = {};
        this.isDealerSelectedID = false;
        /*Commit due to the Change in loading slip*/
        //this.dealerBookingList = this.dealerBookingList.filter(p=>!p.IsSelect);
        this.totalQuantitySlipTo += + this.tempOrderQty;
        this.tempOrderQty = 0;
        this.selectedMaterialLayerId = 0;
    }
   
    generateAddLoadingLayer(listLoadingSlipExt: LoadingSlipExtTO[]) {
        if (listLoadingSlipExt == undefined || listLoadingSlipExt.length === 0) {
            return;
        }
        var uniqueLayerIds = listLoadingSlipExt.map(p => p.LoadingLayerid).filter((value, index, self) => self.indexOf(value) === index);
        //.forEach(p=>{alert('Sequence Layer ID : ' + p.toString());})
        uniqueLayerIds.forEach(element => {
            if (this.loadingSlipTO.SequenceLoading != null || this.loadingSlipTO.SequenceLoading != undefined)
                this.loadingSlipTO.SequenceLoading += "|";
            else
                this.loadingSlipTO.SequenceLoading = "";
            switch (element) {
                case 1:
                    this.loadingSlipTO.SequenceLoading += myGlobalVal.loadingSequenceName.BOTTOM;
                    break;
                case 2:
                    this.loadingSlipTO.SequenceLoading += myGlobalVal.loadingSequenceName.MIDDLE1;
                    break;
                case 3:
                    this.loadingSlipTO.SequenceLoading += myGlobalVal.loadingSequenceName.MIDDLE2;
                    break;
                case 4:
                    this.loadingSlipTO.SequenceLoading += myGlobalVal.loadingSequenceName.MIDDLE3;
                    break;
                case 5:
                    this.loadingSlipTO.SequenceLoading += myGlobalVal.loadingSequenceName.TOP;
                    break;
            }
        });
    }

    onSelectionChange(bookingTo: BookingTO) {
        this.loadingSlipTO = new LoadingSlipTO();
        //tblLoadingDtlTO : LoadingSlipDtlTO = {}

        //this.listDeliveryAddr = [];
        //this.tempListDeliveryAddr = [];
        // var v = this.loadingSlipToList.forEach(p => p.TblLoadingSlipDtlTO.IdBooking == bookingTo.IdBooking);
        // if (v != null) {
        //     this.errorMsg.showErrorMessage("Loading slip for this order is already generated.", "Warning");
        //     return;
        // }
        //var v = this.dealerBookingList.filter(p => p.IdBooking == bookingTo.IdBooking).forEach(p1 => p1.IsSelect = true);
        if(!bookingTo.IsSelect){
            return;
        }
        var tempBookingTo = this.dealerBookingList.filter(p => p.IdBooking == bookingTo.IdBooking)[0];
        this.loadingSlipTO.TblLoadingSlipDtlTO = this.returnLoadingDtlTo(tempBookingTo)
        this.loadingSlipTO.DeliveryAddressTOList = this.listDeliveryAddr.filter(p=>p.LoadingLayerId == this.selectedMaterialLayerId)
        this.isDealerSelectedID = true;
        this.loadingSlipTO.CdStructure = bookingTo.CdStructure.toString();
        this.loadingSlipTO.CdStructureId = bookingTo.CdStructureId;
        this.getDeliveryAddrById(bookingTo.IdBooking);
        this.loadingSlipTO.LoadingLayerId = this.selectedMaterialLayerId;
        this.addSelectedLayerLoadingSlipTO();
        //this.pushLoadingSlipChanges()

    }
    valuechange(keyVal: number, currentBookingInfo: BookingTO) {
        if (!currentBookingInfo.IsSelect) {
            this.dealerBookingList.forEach(p1 => p1.LoadingQty = 0);
            this.errorMsg.showErrorMessage("Please select order first.", "Warning")
            return
        }
        else if (keyVal > currentBookingInfo.PendingQty) {
            this.errorMsg.showErrorMessage("Loading quantity must be less than Booking qty.", "Warning")
            this.dealerBookingList.forEach(p1 => p1.LoadingQty = 0);
            return;
        }
        debugger
        this.loadingSlipToList.filter(p=>p.LoadingLayerId == this.selectedMaterialLayerId).forEach(
            element=>{if(element.TblLoadingSlipDtlTO.IdBooking == currentBookingInfo.IdBooking){
                element.TblLoadingSlipDtlTO = this.returnLoadingDtlTo(currentBookingInfo)
            }})
    }

    getcnfList() {
        this.commonServices.getOrgList(myGlobalVal.orgTypeEnum.CNFTYPEID)
            .subscribe(
            p => this.cnfOrgList = p,
            err => {
                // Log errors if any
                console.log(err);
            });
    }

    getDeliveryAddrById(orderId: number) {
        debugger
        var res=  this.listDeliveryAddr.filter(p => p.BookingId == orderId)
        if (res.length == 0 || res == undefined ) {
            this.loadingServices.getDeliveryAddrById(orderId).subscribe(
                p => {
                    p.forEach(ele => {
                        //ele.LoadingLayerId = this.selectedMaterialLayerId
                        ele.IsSelected = false;
                        this.listDeliveryAddr.push(ele)
                    });
                    //this.tempListDeliveryAddr = this.listDeliveryAddr.filter(p=>p.LoadingLayerId == this.selectedMaterialLayerId);
                    this.getDeliveryAddr(this.selectedMaterialLayerId);
                    this.isExpandOrder = false
                },
                err => {
                    console.log(err);
                });
        }
        else {
            //this.tempListDeliveryAddr = this.listDeliveryAddr.filter(p=>p.LoadingLayerId == this.selectedMaterialLayerId);
            this.getDeliveryAddr(this.selectedMaterialLayerId);
        }

    }
    onDeliveryAddrSelectionChange(deliveryAddressTo: DeliveryAddressTO) {
        if(deliveryAddressTo.IsSelected){
            this.tempListDeliveryAddr.filter(p=>p != deliveryAddressTo).forEach(ele=>ele.IsSelected = false)
        }
        else{
            this.tempListDeliveryAddr.filter(p=>p == deliveryAddressTo).forEach(ele=>ele.IsSelected = false)
        }
        if (deliveryAddressTo.IdBookingDelAddr != undefined && deliveryAddressTo.IdBookingDelAddr != 0) {
            this.tempListDeliveryAddr.filter(p => p.IdBookingDelAddr == deliveryAddressTo.IdBookingDelAddr && p.IsSelected).forEach(
                ele => { ele.IsSelected = undefined }
            )
            var v = this.tempListDeliveryAddr.filter(p => p.IdBookingDelAddr == deliveryAddressTo.IdBookingDelAddr).forEach(p1 => {
                p1.IsSelected = true,
                    p1.LoadingLayerId = this.selectedMaterialLayerId
            });
        }
        else {
            this.tempListDeliveryAddr.filter(p => p.LoadingLayerId == deliveryAddressTo.LoadingLayerId && p.IsSelected).forEach(
                ele => { ele.IsSelected = undefined }
            )
            var v = this.tempListDeliveryAddr.filter(p => p.LoadingLayerId == deliveryAddressTo.LoadingLayerId).forEach(p1 => {
                p1.IsSelected = true
            });
        }
      
    }

    validateDeliveryAddrVsLayer(layerId: number) {
        var result = this.tempListDeliveryAddr.filter(p => p.LoadingLayerId == layerId)
        if (result == undefined || result.length == 0)
            return false;
        else
            return true;
    }

    mapLayerDeliveryAddr(layerId: number) {
        // if(!this.validateCurrentLayer()){
        //     alert('not valid')
        //     return;
        // }
        if (this.selectedMaterialLayerId != undefined && this.selectedMaterialLayerId != 0) {
            var objDeliveryAddr = this.tempListDeliveryAddr.filter(p => p.IsSelected)[0];
            if (objDeliveryAddr != undefined) {
                if (objDeliveryAddr.IdBookingDelAddr != 0) {
                    this.listDeliveryAddr.filter(element => element.IdBookingDelAddr == objDeliveryAddr.IdBookingDelAddr).forEach(ele => {
                        ele.LoadingLayerId = this.selectedMaterialLayerId,
                            ele.IsSelected = true
                    })
                }
                else {
                    //objDeliveryAddr = new DeliveryAddressTO();
                    this.listDeliveryAddr = this.listDeliveryAddr.filter(element => element.LoadingLayerId != this.selectedMaterialLayerId)
                    objDeliveryAddr.LoadingLayerId = this.selectedMaterialLayerId;
                    this.listDeliveryAddr.push(objDeliveryAddr);
                }
            }
        }
        this.addSelectedLayerLoadingSlipTO();
        this.cleartheLayerLoadingSlipData();
        this.tempListDeliveryAddr = this.listDeliveryAddr.filter(p =>  p.LoadingLayerId == layerId)//p.IsSelected == undefined ||
        this.selectedMaterialLayerId = layerId;
        var addressFromList = this.loadingSlipToList.filter(element => element.LoadingLayerId == layerId)
        //[0].DeliveryAddressTOList//.filter(p=>p.LoadingLayerId == layerId)

        if (this.tempListDeliveryAddr.filter(p => p.LoadingLayerId == layerId).length == 0 && addressFromList.length != 0) {
            this.tempListDeliveryAddr = addressFromList[0].DeliveryAddressTOList.filter(p => p.LoadingLayerId == layerId)
        }

        this.selectNewLayerOrder(layerId);
        this.getDeliveryAddr(layerId);
        this.calculateBalQty(layerId);
        if (this.tempListDeliveryAddr.filter(p => p.IsSelected) == undefined)
            this.isAddrSelected = false;
        else
            this.isAddrSelected = true;

        //this.loadingSlipTO = this.loadingSlipToList.filter(element => element.LoadingLayerId == layerId)[0];
        // this.loadingSlipTO = this.loadingSlipToList.forEach(ele=>{
        //     ele.LoadingSlipExtTOList.filter(p=>p.LoadingLayerid == layerId)
        // });
        if (this.loadingSlipTO == undefined)
            this.loadingSlipTO = new LoadingSlipTO();
       

    }

    /*Validate the layer before going next layer*/
    validateCurrentLayer(){
        this.loadingSlipToList.filter(p=>p.LoadingLayerId == this.selectedMaterialLayerId).forEach(
            ele=>{if(ele.LoadingSlipExtTOList.length == 0){
                 this.errorMsg.showErrorMessage("Sizes Qty not selected yet for Order# " + ele.TblLoadingSlipDtlTO.IdBooking, "Warning")
                return false;
            }
            else if(ele.DeliveryAddressTOList.length == 0){
                this.errorMsg.showErrorMessage("Delivery Address for current Layer is not Selected." , "Warning")
                return false;
            }
        }
        )
    }

    selectNewLayerOrder(loadingLayerId : number){
        debugger
        var dealerOrgId = this.loadingSlipToList.filter(q=>q.LoadingLayerId == loadingLayerId)
        if(dealerOrgId != undefined && dealerOrgId.length > 0){
             this.dealerBookingList.forEach(element=>element.IsSelect = false);
        this.dealerBookingList = this.commonDealerList.filter(p=>p.DealerOrgId == dealerOrgId[0].DealerOrgId)
        this.loadingSlipToList.filter(p=>p.LoadingLayerId == loadingLayerId).forEach(
            element=>{
                this.dealerBookingList.filter(p=>p.IdBooking==element.TblLoadingSlipDtlTO.IdBooking).forEach(
                    ele=> ele.IsSelect= true)
            }
        )}
        else{
            this.dealerBookingList.forEach(element1=>{element1.IsSelect = false;
                //element1.LoadingQty = 0
            });
        }
    }

    addNewDeeliveryAddr() {
        let objDeliveryAddr: DeliveryAddressTO = new DeliveryAddressTO();
        objDeliveryAddr.LoadingLayerId = this.selectedMaterialLayerId;
        objDeliveryAddr.IdBookingDelAddr = 0;
        this.tempListDeliveryAddr.push(objDeliveryAddr);
    }

    getDealerList(cnfId: number) {
        this.dealerList = [];
        this.commonServices.getDealerList(cnfId)
            .subscribe(
            commonInfoList => {this.dealerList = commonInfoList;
                this.dealerList.sort(ele=>ele.Value)},
    
            err => {
                // Log errors if any
                console.log(err);
            });
    }
    ConfirmAndLoadingTO() {
        debugger
        this.calculateTotalQtyLayerWise(1);
        this.mergeLoadingSlipAgainestidBooking();
        //this.mapLayerDeliveryAddr(this.selectedMaterialLayerId)
        this.addSelectedLayerLoadingSlipTO();
        //debugger;
        if (this.loadingSlipToList.length == 0) {
            this.errorMsg.showErrorMessage("Loading slips are not generated yet.", "Warning")
            return;
        }
        // else if(this.isBottomLoading !=0 || this.isMiddle1Loading !=0 
        // || this.isMiddle2Loading !=0 || this.isMiddle3Loading !=0 || this.isTopLoading !=0)
        // {
        //     this.errorMsg.showErrorMessage("Laod all layer before generating slip.","Warning")
        //     return;
        // }
        this.loadingTO.Qty = this.totalQuantitySlipTo;
        //   this.loadingSlipToList.forEach(ele=>{
        //     this.loadingTO.Qty += +ele.TblLoadingSlipDtlTO.LoadingQty
        // });
        //this.loadingTO.CnfOrgId = this.cnfTo.Value;
        this.loadingTO.CnfOrgId = this.selectedCnfId
        this.loadingTO.IsJointDelivery = (this.isJointDelivery) ? 1 : 0;
        this.loadingSlipToList.forEach(ele => {
            ele.LoadingSlipExtTOList = ele.LoadingSlipExtTOList.filter(p => p.LoadingQty > 0);
        })
        this.loadingTO.loadingSlipList = [];
        this.loadingTO.loadingSlipList = this.loadingSlipToList;
        let LoadingOperation: Observable<ResultMessage>;
        LoadingOperation = this.loadingServices.addLoading(this.loadingTO, this.userTo.IdUser);
        this._confirmService.activate("Have you confirm the loading slip details?", "Confirmation")
            .then(res => {
                if (res) {
                    this.ss.showLoader();
                    LoadingOperation.subscribe(Loading => {
                        this.resultMessage = Loading;
                        debugger
                        if (this.resultMessage.Result == 1 && this.resultMessage.MessageType == myGlobalVal.ResultMessageE.Information) {
                            this.errorMsg.showErrorMessage(this.resultMessage.Text, "Information");
                            this.loadingTO = new LoadingTO();
                            this.dealerList = [];
                            this.dealerBookingList = [];
                            this.isExpandOrder = false;
                            this.loadingSlipToList = [];
                            this.tempListDeliveryAddr =[];
                            this.listDeliveryAddr = [];
                            this.loadingTO = { NoOfDeliveries: 0 };
                            this.ss.hideLoader();

                        }
                        else {
                            this.ss.hideLoader();

                            this.errorMsg.showErrorMessage("Loading Slip not generated.", "Error");
                        }
                    },
                        err => {
                            this.ss.hideLoader();
                            this.errorMsg.showErrorMessage(err, "Error");
                        });
                } else {
                }
            });

    }
    autocompleListFormatter = (data: any): SafeHtml => {
        let html = `<span>${data.Text}</span>`;
        return this._sanitizer.bypassSecurityTrustHtml(html);
    }

    OnCnfvalueChanged(val: any) {
        if (val != undefined) {
            if (val.Text == undefined) {
                this.dealerList = [];
            }
            else {
                this.cnfTo.Value = val.Value
                this.selectedCnfId = val.Value;
                this.getDealerList(this.cnfTo.Value);
            }
        }
    }

    onDealerNameSelection(val: any){
        if (val != undefined) {
            if (val.Text == undefined) {
                this.dealerBookingList = [];
            }
            else {
                this.dealerTo.Value = val.Value
                this.dealerTo.Text = val.Text
                this.selectedDealerID = val.Value;
                this.onSelect(val.Value);
            }
        }
        
    }

    encryptDecrypt() {
        alert('Encrypted Value : ' + encryptDecrypt.encrypted)
        alert('decrypted Value : ' + encryptDecrypt.decrypted)
    }

    //[17/03/2017]Vijaya added to get cdStructure list,delivery period list,district list
    getCdstructureList() {
        this.commonServices.getCdstructureList()
            .subscribe(
            cdStructureLst => this.cdStructureLst = cdStructureLst,
            err => {
                // Log errors if any
                console.log(err);
            });
    }

    getProductCatList() {
        this.commonServices.getProductCatList().subscribe(
            data => {
                this.productCategoryList = data
                this.ss.hideLoader();

            },
            error => {
                this.ss.hideLoader();
                console.log(error)
            },
            () => {
                this.ss.hideLoader();

            }
        )
    }

    CollectMatvsBookedOrder(proCategoryVal: number, dealerBookingInfo : BookingTO) {
        debugger
        if(dealerBookingInfo != undefined){
        this.bookingInfoTo = dealerBookingInfo;}
        else
            dealerBookingInfo = this.bookingInfoTo
        this.isDispMaterialSizess = false;
        // if (this.loadingSlipTO.TblLoadingSlipDtlTO.LoadingQty == undefined ||
        //     this.loadingSlipTO.TblLoadingSlipDtlTO.LoadingQty == 0) {
        if(!dealerBookingInfo.IsSelect  || dealerBookingInfo.LoadingQty == 0){
            this.errorMsg.showErrorMessage("Select and enter qty to Load from pending list.", "Warning");
            return;
        }
        this.loadingSlipTO = this.loadingSlipToList.filter(p=>p.LoadingLayerId == this.selectedMaterialLayerId
        && p.TblLoadingSlipDtlTO.IdBooking == dealerBookingInfo.IdBooking)[0];
        this.loadingSlipTO.TblLoadingSlipDtlTO = this.returnLoadingDtlTo( dealerBookingInfo);
        this.isDispMaterialSizess = true;
        this.ProdCatVal = proCategoryVal == 2 ? true : false;
        // this.ProdCatVal == true?  this.productCategoryId = myGlobalVal.ProductCatE.Plain 
        // : this.productCategoryId = myGlobalVal.ProductCatE.TMT
        this.productCategoryId = this.ProdCatVal ? myGlobalVal.ProductCatE.Plain
            : myGlobalVal.ProductCatE.TMT
        let matCatvsSpecBookedList: any = [];
        matCatvsSpecBookedList = this.loadingSlipToList.filter(p => p.LoadingLayerId == this.selectedMaterialLayerId
        && p.TblLoadingSlipDtlTO.IdBooking == dealerBookingInfo.IdBooking);
        if (matCatvsSpecBookedList.length > 0) {
            matCatvsSpecBookedList = matCatvsSpecBookedList[0].LoadingSlipExtTOList.filter(p => p.ProdCatId == this.productCategoryId);
        }
        if (matCatvsSpecBookedList.length == 0 || matCatvsSpecBookedList == undefined) {
            this.loadingServices.getProductStockList(this.loadingSlipTO, this.productCategoryId).subscribe(
                data => {
                    this.commonLoadingSlipExtToList = data;
                    this.generateListSizevsSpecs();
                    //this.calcaluteAvialableStock();
                }
                err=> {
                    console.log("Server Error : " + err)
                    this.ss.hideLoader();
                }
            )
        }
        else {
            this.commonLoadingSlipExtToList = matCatvsSpecBookedList;
            this.generateListSizevsSpecs();
        }

    }

    generateListSizevsSpecs() {
        this.productSpec = []
        this.productSizeSpecGroupedStockList = [];
        this.productMaterialSpecAndCatList = []
        var uniqueLayerIds = this.commonLoadingSlipExtToList.map(p => p.ProdSpecDesc).filter((value, index, self) => self.indexOf(value) === index);
        uniqueLayerIds.forEach(element => {
            this.productSpec.push(element)
        })
        this.productSpec.push('Quota')
        var i = 0
        for (var i = 0; i < this.commonLoadingSlipExtToList.length; ++i) {
            var obj = this.commonLoadingSlipExtToList[i];

            //If a property for this Material Desc does not exist yet, create
            if (this.productSizeSpecGroupedStockList[obj.MaterialDesc] === undefined)
                this.productSizeSpecGroupedStockList[obj.MaterialDesc] = [{ 'key': obj.MaterialDesc, value: [obj.MaterialDesc] }];

            //x will always be the array corresponding to the Material Desc. Push a value the current value to it.
            this.productSizeSpecGroupedStockList[obj.MaterialDesc].push({ 'key': obj.ProdSpecDesc, 'value': obj.LoadingQty });
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
        this.firstKey = this.productSizeSpecGroupedStockList.first;
        this.keys = Object.keys(this.productSizeSpecGroupedStockList);
        this.pushAvlQuotaForSize();

        this.calculateTotalEnterQty();
    }
    pushAvlQuotaForSize() {
         this.loadingServices.getCnfDeclaredLoadingQuota(this.selectedCnfId).subscribe(
            data => {
                this.loadingQuotaAvailableStock = data
            if (this.loadingQuotaAvailableStock.length > 0) {
                var totalVal = 0;
                 this.keys.forEach(ele => {
                     totalVal = 0;
                this.loadingQuotaAvailableStock.filter(p => p.MaterialDesc == ele).forEach(
                        ele => {
                            totalVal += +ele.BalanceQuota});
                 this.productSizeSpecGroupedStockList[ele].push({ 'key': 'Quota', 'value': totalVal })
            })
            }
            else{
                this.keys.forEach(ele => {
                 this.productSizeSpecGroupedStockList[ele].push({ 'key': 'Quota', 'value': 0 })
                })
            }
        },
        err=>{console.log("Server error");
        })
    }
    addLoadingQtyInExtTOList() {
        
        var otherCatIDList;
        this.addSelectedLayerLoadingSlipTO();

        this.keys.forEach(ele => {
            
            this.productSizeSpecGroupedStockList[ele].forEach(
                element => {
                    if (element.key != ele && element.key != 'Quota') {
                        this.commonLoadingSlipExtToList.filter(p => p.MaterialDesc == ele
                            && p.ProdSpecDesc == element.key)[0].LoadingQty = element.value
                    }
                }
            )
        })

        //   this.productMaterialSpecAndCatList.forEach(ele => {
        //     this.commonLoadingSlipExtToList.filter(p => p.MaterialDesc == ele.MaterialCategory)[0].LoadingQty = ele.StraightQty
        //         , this.commonLoadingSlipExtToList.filter(p => p.MaterialDesc == ele.MaterialCategory)[1].LoadingQty = ele.BendQty
        //         , this.commonLoadingSlipExtToList.filter(p => p.MaterialDesc == ele.MaterialCategory)[2].LoadingQty = ele.RKShortQty
        //         , this.commonLoadingSlipExtToList.filter(p => p.MaterialDesc == ele.MaterialCategory)[3].LoadingQty = ele.RKLongQty
        //         , this.commonLoadingSlipExtToList.filter(p => p.MaterialDesc == ele.MaterialCategory)[4].LoadingQty = ele.TukadaQty
        //         , this.commonLoadingSlipExtToList.filter(p => p.MaterialDesc == ele.MaterialCategory)[5].LoadingQty = ele.CoilQty
        // })
        this.commonLoadingSlipExtToList.forEach(ele => { ele.LoadingLayerid = this.selectedMaterialLayerId })
        this.commonLoadingSlipExtToList.forEach(ele => { ele.LoadingLayerE = this.selectedMaterialLayerId })
        var getLoadingSlip = this.loadingSlipToList.filter(p => p.LoadingLayerId == this.selectedMaterialLayerId
        &&  p.TblLoadingSlipDtlTO.IdBooking == this.loadingSlipTO.TblLoadingSlipDtlTO.IdBooking)
        if (getLoadingSlip.length > 0 && getLoadingSlip != undefined) {
            otherCatIDList = this.loadingSlipToList.filter(p => p.LoadingLayerId == this.selectedMaterialLayerId
            &&  p.TblLoadingSlipDtlTO.IdBooking == this.loadingSlipTO.TblLoadingSlipDtlTO.IdBooking)
            [0].LoadingSlipExtTOList
            if (otherCatIDList != undefined) {
                otherCatIDList.filter(p => p.ProdCatId != this.productCategoryId)
            }
            this.commonLoadingSlipExtToList.concat(otherCatIDList);
        }
        this.commonLoadingSlipExtToList.forEach(ele=>ele.BookingId = this.loadingSlipTO.TblLoadingSlipDtlTO.IdBooking)
        this.loadingSlipToList.filter(p => p.LoadingLayerId == this.selectedMaterialLayerId
        &&  p.TblLoadingSlipDtlTO.IdBooking == this.loadingSlipTO.TblLoadingSlipDtlTO.IdBooking)
        [0].LoadingSlipExtTOList = this.commonLoadingSlipExtToList;
        switch (this.selectedMaterialLayerId) {

            case 1:
                this.bottomLoadingMaterialSequenceTOList = [];
                this.loadingSlipToList.filter(p => p.LoadingLayerId == this.selectedMaterialLayerId).forEach(
                    element => {
                        element.LoadingSlipExtTOList.filter(p => p.LoadingQty > 0).forEach(ele => {
                            this.bottomLoadingMaterialSequenceTOList.push(ele)
                        })
                    }
                )
                break;
            case 2:
                this.middleLoadingMaterialSequenceTOList = [];
                this.loadingSlipToList.filter(p => p.LoadingLayerId == this.selectedMaterialLayerId).forEach(
                    element => {
                        element.LoadingSlipExtTOList.filter(p => p.LoadingQty > 0).forEach(ele => {
                            this.middleLoadingMaterialSequenceTOList.push(ele)
                        })
                    }
                )
                break;
            case 3:
                this.middle2LoadingMaterialSequenceTOList = [];
                this.loadingSlipToList.filter(p => p.LoadingLayerId == this.selectedMaterialLayerId).forEach(
                    element => {
                        element.LoadingSlipExtTOList.filter(p => p.LoadingQty > 0).forEach(ele => {
                            this.middle2LoadingMaterialSequenceTOList.push(ele)
                        })
                    }
                )
                break;
            case 4:
                this.middle3LoadingMaterialSequenceTOList = [];
                this.loadingSlipToList.filter(p => p.LoadingLayerId == this.selectedMaterialLayerId).forEach(
                    element => {
                        element.LoadingSlipExtTOList.filter(p => p.LoadingQty > 0).forEach(ele => {
                            this.middle3LoadingMaterialSequenceTOList.push(ele)
                        })
                    }
                )

                break;
            case 5:
                this.topLoadingMaterialSequenceTOList = [];
                this.loadingSlipToList.filter(p => p.LoadingLayerId == this.selectedMaterialLayerId).forEach(
                    element => {
                        element.LoadingSlipExtTOList.filter(p => p.LoadingQty > 0).forEach(ele => {
                            this.topLoadingMaterialSequenceTOList.push(ele)
                        })
                    }
                )

                break;
            default:
                break;
        }
        // this.loadingSlipTO.LoadingSlipExtTOList = this.loadingSlipToList.filter(p=>p.LoadingLayerId == this.selectedMaterialLayerId)
        //     [0].LoadingSlipExtTOList.filter(p=>p.LoadingQty > 0);
        this.addSelectedLayerLoadingSlipTO();
        this.bookingInfoTo = new BookingTO();
    }

    getDeclaredLoadQuota() {

    }
    
    selectOnClick($event: Event) {
        $event.target.select();
    }

    addSelectedLayerLoadingSlipTO() {
        debugger
        this.loadingSlipTO.DealerOrgId = this.selectedDealerID;
        this.loadingSlipTO.DealerOrgName = this.dealerTo.Text;
        this.loadingSlipTO.DeliveryAddressTOList = this.listDeliveryAddr.filter(p => p.LoadingLayerId == this.selectedMaterialLayerId);
    
        //var isbookingIdExist =  this.loadingSlipToList.filter(p=>p.TblLoadingSlipDtlTO.IdBooking  == this.loadingSlipTO.TblLoadingSlipDtlTO.IdBooking);
        // if(isbookingIdExist != undefined && isbookingIdExist.length >0 ){
        // this.loadingSlipToList.filter(p=>p.TblLoadingSlipDtlTO.IdBooking  == 
        //     this.loadingSlipTO.TblLoadingSlipDtlTO.IdBooking ).forEach(ele=>{
        //        // ele.LoadingSlipExtTOList = ele.LoadingSlipExtTOList.filter(p=>p.LoadingLayerid != this.selectedMaterialLayerId)
        //         //ele.DeliveryAddressTOList = ele.DeliveryAddressTOList.filter(p=>p.LoadingLayerId != this.selectedMaterialLayerId)
        //     })

        // }
        // else{
        // this.loadingSlipToList = this.loadingSlipToList.filter(p =>( p.LoadingLayerId != this.loadingSlipTO.LoadingLayerId
        // || p.LoadingLayerId == this.loadingSlipTO.LoadingLayerId)   
        // && p.TblLoadingSlipDtlTO.IdBooking != this.loadingSlipTO.TblLoadingSlipDtlTO.IdBooking);
        
        var loadingSlipTo = this.loadingSlipToList.filter(p =>p.LoadingLayerId == this.loadingSlipTO.LoadingLayerId
        && p.TblLoadingSlipDtlTO.IdBooking == this.loadingSlipTO.TblLoadingSlipDtlTO.IdBooking)[0]
        this.loadingSlipToList = this.loadingSlipToList.filter(p=>p != loadingSlipTo)
        var isValidToPush = this.loadingSlipTO.TblLoadingSlipDtlTO;
        if(isValidToPush != undefined){
        this.loadingSlipToList.push(this.loadingSlipTO);}
        this.loadingSlipToList.filter(p=>p.LoadingLayerId == this.selectedMaterialLayerId).forEach(
            element=>{
                element.DeliveryAddressTOList = this.tempListDeliveryAddr.filter(p => p.LoadingLayerId == this.selectedMaterialLayerId && p.IsSelected == true);
            })
        //}
        //Clear the data after loading slip generated

    }
    mergeLoadingSlipAgainestidBooking() {
        var uniqueBookingIds = this.loadingSlipToList.map(p => p.TblLoadingSlipDtlTO.IdBooking).filter((value, index, self) => self.indexOf(value) === index);
        uniqueBookingIds.forEach(element => {
            //alert(element);
        })
    }
    cleartheLayerLoadingSlipData() {
        //this.listDeliveryAddr = []
        this.tempListDeliveryAddr = [];
      
        this.loadingSlipTO = new LoadingSlipTO();
        this.isDealerSelectedID = false;
        this.totalQuantitySlipTo += + this.tempOrderQty;
        this.tempOrderQty = 0;
        this.selectedMaterialLayerId = 0;

    }
    postLoadingSlipToList() {
        this.addSelectedLayerLoadingSlipTO();

    }

    ///// tO Calculate the Avialable stock summary
    totalAvialableStraight: number = 0;
    totalAvialableBend: number = 0;
    totalAvialableRKShort: number = 0;
    totalAvialableRKLong: number = 0;
    totalAvialableTukada: number = 0;
    totalAvialableCoil: number = 0;
    loadingQuotaAvailableStock: LoadingQuotaTO[] = []
    calcaluteAvialableStock() {
        this.totalAvialableStraight = 0;
        this.totalAvialableBend = 0;
        this.totalAvialableRKShort = 0;
        this.totalAvialableRKLong = 0;
        this.totalAvialableTukada = 0;
        this.totalAvialableCoil = 0;
        this.loadingServices.getCnfDeclaredLoadingQuota(this.selectedCnfId).subscribe(
            data => {
                this.loadingQuotaAvailableStock = data
                if (this.loadingQuotaAvailableStock.length > 0) {
                    this.loadingQuotaAvailableStock.filter(p => p.ProdSpecDesc == "Straight").forEach(
                        ele => this.totalAvialableStraight += +ele.BalanceQuota);
                    this.loadingQuotaAvailableStock.filter(p => p.ProdSpecDesc == "Bend").forEach(
                        ele => this.totalAvialableBend += +ele.BalanceQuota
                    )
                    this.loadingQuotaAvailableStock.filter(p => p.ProdSpecDesc == "RK Short").forEach(
                        ele => this.totalAvialableRKShort += +ele.BalanceQuota
                    )
                    this.loadingQuotaAvailableStock.filter(p => p.ProdSpecDesc == "RK Long").forEach(
                        ele => this.totalAvialableRKLong += +ele.BalanceQuota
                    )
                    this.loadingQuotaAvailableStock.filter(p => p.ProdSpecDesc == "Tukada").forEach(
                        ele => this.totalAvialableTukada += +ele.BalanceQuota
                    )
                    this.loadingQuotaAvailableStock.filter(p => p.ProdSpecDesc == "Coil").forEach(
                        ele => this.totalAvialableCoil += +ele.BalanceQuota
                    )

                }
            }
        )

    }
    ////

    //// Validate the Loading Qty and entered qty
    validateLoadingQtyAgainestLayer(event: Event, specs: string, loadingQtyTo: MaterialProdSpecsvsSizeTO) {
        debugger
        this.calculateTotalEnterQty();
        if (!this.calculateLoadingQtyValidation(event, specs)) {
            switch (specs.toString()) {
                case myGlobalVal.ProductSpecsE.BEND.toString():
                    this.productMaterialSpecAndCatList.filter(p => p.MaterialCategory == loadingQtyTo.MaterialCategory)[0].BendQty = 0
                    break;
                case myGlobalVal.ProductSpecsE.COIL.toString():
                    this.productMaterialSpecAndCatList.filter(p => p.MaterialCategory == loadingQtyTo.MaterialCategory)[0].CoilQty = 0
                    break;
                case myGlobalVal.ProductSpecsE.RKLONG.toString():
                    this.productMaterialSpecAndCatList.filter(p => p.MaterialCategory == loadingQtyTo.MaterialCategory)[0].RKLongQty = 0
                    break;
                case myGlobalVal.ProductSpecsE.RKSHORT.toString():
                    this.productMaterialSpecAndCatList.filter(p => p.MaterialCategory == loadingQtyTo.MaterialCategory)[0].RKShortQty = 0
                    break;
                case myGlobalVal.ProductSpecsE.STRAIGHT.toString():
                    this.productMaterialSpecAndCatList.filter(p => p.MaterialCategory == loadingQtyTo.MaterialCategory)[0].StraightQty = 0
                    break;
                case myGlobalVal.ProductSpecsE.TUKADA.toString():
                    this.productMaterialSpecAndCatList.filter(p => p.MaterialCategory == loadingQtyTo.MaterialCategory)[0].TukadaQty = 0
                    break;

            }
            this.calculateTotalEnterQty();
        }

    }
    totalStraight: number = 0; totalBend: number = 0;
    totalRKShort: number = 0; totalRKLong: number = 0;
    totalTukda: number = 0; totalCoil: number = 0;

    calculateTotalEnterQty() {

        this.productSizeSpecGroupedStockList['Total'] = []
        // if (this.productSizeSpecGroupedStockList['Total'] === undefined)
        this.productSizeSpecGroupedStockList['Total'].push({ 'key': 'Total', value: 'Total' });
         var totalOrderQty = 0;
        for (var i = 0; i < this.productSpec.length; ++i) {
            var totalSumSpec = 0
            this.keys.forEach(ele => {
            this.productSizeSpecGroupedStockList[ele].forEach(
                element => {
                    var v1 = element.key;
                    if (element.key == this.productSpec[i] && element.key != 'Quota') {
                        totalSumSpec += +element.value
                    }
                   
                })
            })
            totalOrderQty += +totalSumSpec;
            //x will always be the array corresponding to the Material Desc. Push a value the current value to it.
            this.productSizeSpecGroupedStockList['Total'].push({ 'key': this.productSpec[i], 'value': totalSumSpec });
        }
        if(totalOrderQty == this.loadingSlipTO.TblLoadingSlipDtlTO.LoadingQty){
            this.isValidLoadedQty = true;
        }
        else{
            this.isValidLoadedQty = false;
        }

    }

    calculateLoadingQtyValidation(event: Event, specs: string): boolean {
        var totalOrderQty = 0;
        totalOrderQty = +this.totalStraight + +this.totalBend + +this.totalRKShort
            + +this.totalRKLong + +this.totalTukda + +this.totalCoil
        if (totalOrderQty == this.loadingSlipTO.TblLoadingSlipDtlTO.LoadingQty) {
            this.isValidLoadedQty = true;
        }
        if (totalOrderQty > this.loadingSlipTO.TblLoadingSlipDtlTO.LoadingQty) {
            this.errorMsg.showErrorMessage("Entered Qty should not exceed the total loading Qty (" + this.loadingSlipTO.TblLoadingSlipDtlTO.LoadingQty + ").", "Warning")
            event.target.value = 0;
            return false;
        }
        else
            return true;
    }
    ////

    getTransporterList() {
        this.commonServices.getOrgList(myGlobalVal.orgTypeEnum.TRANSPORTER)
            .subscribe(
            p => this.transporterOrgList = p
            ,
            err => {
                // Log errors if any
                console.log(err);
            });
    }

    calculateTotalQtyLayerWise(layerId : number){
        var totalQty = 0;
        this.loadingSlipToList.forEach(element=>{
            var extToList = element.LoadingSlipExtTOList
            if(extToList.length != 0 || extToList != undefined){
                extToList.forEach(p=> this.totalQuantitySlipTo += + p.LoadingQty)
            }
        })
    }

    calculateBalQty(layerId : number){
        debugger
        if(this.loadingSlipToList.length == 0 ){
            this.dealerBookingList.forEach(p=>p.BalQty = p.PendingQty);
        }
        else{
            this.dealerBookingList.forEach(element => {
                var totalQty = 0
                debugger
                this.loadingSlipToList.filter(p=>p.TblLoadingSlipDtlTO.IdBooking == element.IdBooking).forEach(
                    ele => {
                        totalQty += +ele.TblLoadingSlipDtlTO.LoadingQty
                        debugger
                        if(ele.LoadingLayerId == layerId){
                            element.LoadingQty = ele.TblLoadingSlipDtlTO.LoadingQty
                        }
                        // else{
                        //     element.LoadingQty = 0
                        // }
                    }
                )
                element.BalQty = element.PendingQty - +totalQty;
            });


        }
        this.dealerBookingList.filter(p=>p.IsSelect == false).forEach(
            ele1=>ele1.LoadingQty = 0
        )
    }

    isDelaredTodayLoadingQuota(): boolean {
        //let quotaMsg : string = "";
        this.ss.showLoader()
        this.loadingServices.isDelaredTodayLoadingQuota().subscribe(
            data => {
                if (data) {
                    this.isQuotaDeclared = true;                  
                }
                else{
                    this.lblConfirmationMsg ="Today's Loading Quota is not declared yet."
                }
                return data;
            },
            err => {
                this.ss.hideLoader();
                console.log("Server Error : " + err)
            }

        )
        return true;
    }

    returnLoadingDtlTo(bookingInfo : BookingTO): LoadingSlipDtlTO{
        let loadingDtlTo : LoadingSlipDtlTO =new LoadingSlipDtlTO();
        loadingDtlTo.IdBooking = bookingInfo.IdBooking
        loadingDtlTo.LoadingQty = bookingInfo.LoadingQty
        loadingDtlTo.BookingRate = bookingInfo.BookingRate
        loadingDtlTo.DealerName = bookingInfo.DealerName
        loadingDtlTo.BookingQty = bookingInfo.BookingQty
        return loadingDtlTo;
    }

    getDeliveryAddr(layerId : number){
        debugger
        this.tempListDeliveryAddr = [];
        this.loadingSlipToList.filter(p=>p.LoadingLayerId == layerId).forEach(
            ele=> {
                var addrResult = this.listDeliveryAddr.filter(p=>p.BookingId == ele.TblLoadingSlipDtlTO.IdBooking)
                if(addrResult != undefined && addrResult.length >0){
                    addrResult.forEach(element=>{
                        if((element.IsSelected && element.LoadingLayerId == layerId) || !element.IsSelected){
                            this.tempListDeliveryAddr.push(element);
                        }
                    })
                }
            
            })
    }
}







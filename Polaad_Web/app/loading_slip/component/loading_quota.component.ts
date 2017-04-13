import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, ViewChild, Pipe, Injectable, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';
import { CommonServices } from 'app/common/services/common.services'
import { CommonInformation } from 'app/common/model/common_Information'
import { ResultMessage } from 'app/common/model/common_Information'
import { LoadingServices } from 'app/loading_slip/services/loading_service'
import { StockSummaryTO } from 'app/stock_details/model/stockTO'
import { LoadingQuotaTO } from 'app/loading_slip/model/loading_quotaTO'
import { MaterialCatConfigPerc } from 'app/Masters/model/loading_configuratorTO'
import { ErrorMessage } from 'app/error/errorMessage'
import { ConfirmService } from 'app/error/confirm.service'
import { ConfirmComponent } from 'app/error/confirm.component'
import { sharedService } from 'app/common/services/sharedService';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { FormBuilder, FormArray, Validators } from '@angular/forms';
import { AuthenticationService } from 'app/login/login.services'
import { UserTO } from 'app/user/model/userTO'
import { SizeAndSpecWiseStock } from 'app/stock_details/model/stockTO'

declare var componentHandler: any;

import myGlobalVal = require('app/global')

@Component({
    selector: 'loading-configurator',
    // template:'<h1>Hello</h1>'
    templateUrl: 'app/loading_slip/loading_quota_declaration.html',
    providers: [ConfirmService]

})

export class LoadingQuotaComponent implements OnInit {
    @ViewChild(ErrorMessage) errorMsg: ErrorMessage;
    userTo: UserTO = {}
    constructor(
        private ss: sharedService
        , private loadingServices: LoadingServices
        , private authLoginServices: AuthenticationService
        , private _confirmService: ConfirmService
        , private commonServices: CommonServices
        , private router : Router

    ) {
        this.userTo = authLoginServices.getUserTOFromLocalStorage();
    }
    resultMessage: ResultMessage = new ResultMessage;
    listLoadingQuota: LoadingQuotaTO[] = [];
    MaterialSpce: string[] = [];
    groupedLoadingConfigList: any = {};
    MaterialCatVsCnfList: any = []
    lblMessage: string;
    totalSixmm: number = 0; totalEightmm: number = 0; totalTenmm: number = 0; totalOneTwomm: number = 0; totalOneSixmm: number = 0; totalTwo0mm: number = 0;
    ; totalTwo5mm: number = 0; totalTwo8mm: number = 0; totalThreeTwomm: number = 0;
    stockSummaryToList: SizeAndSpecWiseStock[] = [];
    isQuotaDeclared: boolean = false;

    specificationList: CommonInformation[] = []
    productCatList: CommonInformation[] = []
    ProdSpecId: number = 0
    ProdCatId: number = 1
    ProdCatTmtVal: boolean = false;
    isDisplayLoadingQuotaList: boolean = false;
    isModifiedData: boolean = false
    isQuotaConfirmed : boolean ;
    lblConfirmationMsg : string = "";

    ngOnInit() {
        componentHandler.upgradeDom();
        this.getDropdownList();
        //this.getLoadingQuota();
        //this.getStockSummaryList();
        this.isLoadingQuotaDeclaredToday();
    }

    getDropdownList() {
        this.ss.showLoader();
        this.commonServices.getMaterialSepc().subscribe(
            data => {
                this.specificationList = data;
            },
            err => {
                this.ss.hideLoader()
                console.log("Server Error : " + err)

            }

        );

        this.commonServices.getProductCatList().subscribe(
            data1 => {
                this.ss.hideLoader()
                this.productCatList = data1;
            },
            err => {
                this.ss.hideLoader()
                console.log("Server Error : " + err);
            }
        )
    }
    assignRedioButtonVal(RedioVal : number){        
        this.ProdCatId = RedioVal;
        this.checkModifiedAndDisplayConfigList()
    }

    checkModifiedAndDisplayConfigList() {
        debugger;
        if (!this.isModifiedData) {
            this.displayConfiguratorList();
            return;
        }

        this._confirmService.activate("Do you want to submit modified values from below Loading Configuratio?", "Confirmation")
            .then(res => {
                this.ss.showLoader();
                if (res) {
                    this.postLoadingQuotaToApi();
                }
                else {
                    this.displayConfiguratorList();
                }
                this.isModifiedData = false;
                this.ss.hideLoader();
            })

    }
    displayConfiguratorList() {
        debugger;
        //this.ProdCatTmtVal == true ? this.ProdCatId = myGlobalVal.ProductCatE.Plain : this.ProdCatId = myGlobalVal.ProductCatE.TMT
        if (this.ProdSpecId != 0 && this.ProdCatId != 0) {
            this.groupedLoadingConfigList = {};
            this.MaterialCatVsCnfList = []
            this.listLoadingQuota = []
            this.MaterialSpce = []
            this.getLoadingQuota();
            this.getStockSummaryList();

        }
        else
            this.isDisplayLoadingQuotaList = false;
    }
    getLoadingQuota() {
        this.ss.showLoader();
       
        this.loadingServices.getLoadingQuota(this.ProdSpecId, this.ProdCatId).subscribe(
            data => {
                this.listLoadingQuota = data;
                debugger
                //this.listLoadingQuota.sort(ele=>ele.MaterialId)
                if (this.listLoadingQuota.length > 7 && this.listLoadingQuota != undefined) {
                    this.isDisplayLoadingQuotaList =true;

                    this.configureCnfAndCat();
                    this.calculatePercentageTotal();
                    this.lblMessage = undefined
                }
                else
                    this.lblMessage = "Data not found for Loading configuration."
                this.ss.hideLoader();
            },
            err => {
                this.ss.hideLoader();
                console.log("Server error : " + err);

            }
        )

    }

    configureCnfAndCat() {
        var uniqueLayerIds = this.listLoadingQuota.map(p => p.MaterialDesc).filter((value, index, self) => self.indexOf(value) === index);
        uniqueLayerIds.forEach(element => {
            this.MaterialSpce.push(element)
        })
        var i = 0
        for (var i = 0; i < this.listLoadingQuota.length; ++i) {
            var obj = this.listLoadingQuota[i];

            //If a property for this CngOrgID does not exist yet, create
            if (this.groupedLoadingConfigList[obj.CnfOrgId] === undefined)
                this.groupedLoadingConfigList[obj.CnfOrgId] = [obj.CnfOrgId];

            //x will always be the array corresponding to the current DtmStamp. Push a value the current value to it.
            this.groupedLoadingConfigList[obj.CnfOrgId].push(obj.AllocQuota);
        }
        this.MaterialCatVsCnfList = [];
        for (var k in this.groupedLoadingConfigList) {
            let i: number = 0;
            let loaderConfigPercTO: MaterialCatConfigPerc = new MaterialCatConfigPerc()
            if (this.groupedLoadingConfigList.hasOwnProperty(k)) {
                //alert('val : ' + this.groupedStockList[k])
                var matval2 = this.groupedLoadingConfigList[k][2]
                var matval4 = this.groupedLoadingConfigList[k][4]
                var matval6 = this.groupedLoadingConfigList[k][6]

                loaderConfigPercTO.cnfId = this.groupedLoadingConfigList[k][0];
                loaderConfigPercTO.cnfName = this.listLoadingQuota.filter(p => p.CnfOrgId == this.groupedLoadingConfigList[k][0])[0].CnfOrgName;
                loaderConfigPercTO.SixMM = this.groupedLoadingConfigList[k][1];
                loaderConfigPercTO.EightMM = this.groupedLoadingConfigList[k][2];
                loaderConfigPercTO.TenMM = this.groupedLoadingConfigList[k][3];
                loaderConfigPercTO.TweleveMM = this.groupedLoadingConfigList[k][4];
                loaderConfigPercTO.OneSixMM = this.groupedLoadingConfigList[k][5];
                loaderConfigPercTO.TwoZeroMM = this.groupedLoadingConfigList[k][6];
                loaderConfigPercTO.TwoFiveMM = this.groupedLoadingConfigList[k][7];
                loaderConfigPercTO.TwoEightMM = this.groupedLoadingConfigList[k][8];
                loaderConfigPercTO.ThreeTwoMM = this.groupedLoadingConfigList[k][9];
                this.MaterialCatVsCnfList.push(loaderConfigPercTO);
                this.groupedLoadingConfigList[k].forEach(ele => {
                    //alert(ele)

                })
            }
        }
    }

    selectOnClick($event: Event) {
        $event.target.select();
    }

    //calculatePercentageTotal($event : Event, materialSizr : string , loadingQuotaTo : MaterialCatConfigPerc) {
    calculatePercentageTotal() {
        this.totalSixmm = 0
        this.totalEightmm = 0
        this.totalTenmm = 0
        this.totalOneTwomm = 0
        this.totalOneSixmm = 0
        this.totalTwo0mm = 0
        this.totalTwo5mm = 0
        this.totalTwo8mm = 0
        this.totalThreeTwomm = 0

        this.MaterialCatVsCnfList.forEach(
            element => {
                this.totalSixmm += +element.SixMM
                this.totalEightmm += +element.EightMM
                this.totalTenmm += +element.TenMM
                this.totalOneTwomm += +element.TweleveMM
                this.totalOneSixmm += +element.OneSixMM
                this.totalTwo0mm += +element.TwoZeroMM
                this.totalTwo5mm += +element.TwoFiveMM
                this.totalTwo8mm += +element.TwoEightMM
                this.totalThreeTwomm += +element.ThreeTwoMM
            });
            //isNaN(Number(this.totalThreeTwomm))?this.totalThreeTwomm = 0



    }

    validateConfigPerc($event: Event, materialSizr: string, loadingQuotaTo: MaterialCatConfigPerc) {
        //this.calculatePercentageTotal($event, materialSizr, loadingQuotaTo);
        this.calculatePercentageTotal();
        if (materialSizr != undefined) {
            this.validateLoadingQuota($event, materialSizr, loadingQuotaTo)
            this.calculatePercentageTotal();

        }
    }

    postLoadingQuotaDeclaration() {
        this.submitStockAvialability();
        this._confirmService.activate("Have you confirm to declare the loading Quota?", "Confirmation")
            .then(res => {
                if (res) {
                    this.postLoadingQuotaToApi();
                }
            })

    }

    postLoadingQuotaToApi() {
        this.ss.showLoader();
        this.loadingServices.postLoadingQuotaDeclaration(this.listLoadingQuota
            , this.userTo.IdUser).subscribe(postData => {
                this.ss.hideLoader();
                this.resultMessage = postData;
                if (this.resultMessage.Result == 1) {
                    this.errorMsg.showErrorMessage("Loading Quota declared successfully", "Information");
                }
                else
                    this.errorMsg.showErrorMessage("Loading Quota not declared.", "Error");
            },
            err => {
                console.log('Server side error : ' + err)
                this.ss.hideLoader();
            })
    }

    submitStockAvialability() {
        debugger;
        if (this.listLoadingQuota.length == 0)
            return;

        this.MaterialCatVsCnfList.forEach(ele => {
            this.listLoadingQuota.filter(p => p.CnfOrgId == ele.cnfId)[0].AllocQuota = ele.SixMM
                , this.listLoadingQuota.filter(p => p.CnfOrgId == ele.cnfId)[1].AllocQuota = ele.EightMM
                , this.listLoadingQuota.filter(p => p.CnfOrgId == ele.cnfId)[2].AllocQuota = ele.TenMM
                , this.listLoadingQuota.filter(p => p.CnfOrgId == ele.cnfId)[3].AllocQuota = ele.TweleveMM
                , this.listLoadingQuota.filter(p => p.CnfOrgId == ele.cnfId)[4].AllocQuota = ele.OneSixMM
                , this.listLoadingQuota.filter(p => p.CnfOrgId == ele.cnfId)[5].AllocQuota = ele.TwoZeroMM
                , this.listLoadingQuota.filter(p => p.CnfOrgId == ele.cnfId)[6].AllocQuota = ele.TwoFiveMM
                , this.listLoadingQuota.filter(p => p.CnfOrgId == ele.cnfId)[7].AllocQuota = ele.TwoEightMM
                , this.listLoadingQuota.filter(p => p.CnfOrgId == ele.cnfId)[8].AllocQuota = ele.ThreeTwoMM


        })
        //alert('after change : ' + JSON.stringify(this.stockDetailsTOList))
    }

    isLoadingQuotaDeclaredToday(): boolean {
        debugger
        //let quotaMsg : string = "";
        this.ss.showLoader()
        this.loadingServices.isLoadingQuotaDeclaredToday().subscribe(
            data => {
                debugger
                if (data) {
                    this.isQuotaDeclared = true;                  
                    this.errorMsg.showErrorMessage("Today's Loading Quota already declared.", "Warning")
                }
                else{
                    debugger
                    this.isLoadingQuotaConfirmed()
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
    isLoadingQuotaConfirmed(){
         //this.ss.showLoader()
        this.loadingServices.isLoadingQuotaConfirmed().subscribe(
            data => {
                debugger
                if (!data) {
                    this.lblConfirmationMsg = "Loading Stock is not confirmed yet.";
                    //this.router.navigate(['StockUpdate']);
                }
                 this.isQuotaConfirmed = data;
            },
            err => {
                this.ss.hideLoader();
                console.log("Server Error : " + err)
            }

        )
        return true;
    }
    getStockSummaryList() {
        this.ss.showLoader();
        this.loadingServices.getStockSummaryDet(this.ProdSpecId, this.ProdCatId).subscribe(
            data => {
                this.stockSummaryToList = data;
                this.calcaluteAvialableStock();
                this.ss.hideLoader();
            },
            err => {
                this.ss.hideLoader();
                console.log("Server error : " + err);

            }
        )

    }
    totalValBySize: number = 0
    validateLoadingQuota(event: Event, size: string, loadConfigPerTo: MaterialCatConfigPerc) {
        this.totalValBySize = 0;
        size = size.replace('|', " ");
        this.stockSummaryToList.filter(p => p.MaterialDesc == size).forEach(
            element => this.totalValBySize += element.TotalStock
        )
        //.reduce((a,b)=> a.TotalStock + b.TotalStock);
        let commonInfoVal: CommonInformation = {}
        switch (size) {
            case '6 MM':
                commonInfoVal = this.calculateStockValidate(size, this.totalValBySize, this.totalSixmm, event, loadConfigPerTo)
                if (commonInfoVal != undefined && commonInfoVal != null) {
                    this.totalSixmm = commonInfoVal.Value
                    this.MaterialCatVsCnfList.filter(p => p.cnfId == loadConfigPerTo.cnfId)[0].SixMM = 0
                }
                break;
            case '8 MM':
                commonInfoVal = this.calculateStockValidate(size, this.totalValBySize, this.totalEightmm, event, loadConfigPerTo)
                if (commonInfoVal != undefined && commonInfoVal != null) {
                    this.totalEightmm = commonInfoVal.Value
                    this.MaterialCatVsCnfList.filter(p => p.cnfId == loadConfigPerTo.cnfId)[0].EightMM = 0
                }
                break;
            case '10 MM':
                commonInfoVal = this.calculateStockValidate(size, this.totalValBySize, this.totalTenmm, event, loadConfigPerTo)
                if (commonInfoVal != undefined && commonInfoVal != null) {
                    this.totalTenmm = commonInfoVal.Value
                    this.MaterialCatVsCnfList.filter(p => p.cnfId == loadConfigPerTo.cnfId)[0].TenMM = 0
                }
                break;
            case '12 MM':
                commonInfoVal = this.calculateStockValidate(size, this.totalValBySize, this.totalOneTwomm, event, loadConfigPerTo)
                if (commonInfoVal != undefined && commonInfoVal != null) {
                    this.totalOneTwomm = commonInfoVal.Value
                    this.MaterialCatVsCnfList.filter(p => p.cnfId == loadConfigPerTo.cnfId)[0].TweleveMM = 0
                }
                break;
            case '16 MM':
                commonInfoVal = this.calculateStockValidate(size, this.totalValBySize, this.totalOneSixmm, event, loadConfigPerTo)
                if (commonInfoVal != undefined && commonInfoVal != null) {
                    this.totalOneSixmm = commonInfoVal.Value
                    this.MaterialCatVsCnfList.filter(p => p.cnfId == loadConfigPerTo.cnfId)[0].OneSixMM = 0
                }
                break;
            case '20 MM':
                commonInfoVal = this.calculateStockValidate(size, this.totalValBySize, this.totalTwo0mm, event, loadConfigPerTo)
                if (commonInfoVal != undefined && commonInfoVal != null) {
                    this.totalTwo0mm = commonInfoVal.Value
                    this.MaterialCatVsCnfList.filter(p => p.cnfId == loadConfigPerTo.cnfId)[0].TwoZeroMM = 0
                }

                break;
            case '25 MM':
                commonInfoVal = this.calculateStockValidate(size, this.totalValBySize, this.totalTwo5mm, event, loadConfigPerTo)
                if (commonInfoVal != undefined && commonInfoVal != null) {
                    this.totalTwo5mm = commonInfoVal.Value
                    this.MaterialCatVsCnfList.filter(p => p.cnfId == loadConfigPerTo.cnfId)[0].TwoFiveMM = 0
                }
                break;
            case '28 MM':
                commonInfoVal = this.calculateStockValidate(size, this.totalValBySize, this.totalTwo8mm, event, loadConfigPerTo)
                if (commonInfoVal != undefined && commonInfoVal != null) {
                    this.totalTwo8mm = commonInfoVal.Value
                    this.MaterialCatVsCnfList.filter(p => p.cnfId == loadConfigPerTo.cnfId)[0].TwoEightMM = 0
                }
                break;
            case '32 MM':
                commonInfoVal = this.calculateStockValidate(size, this.totalValBySize, this.totalThreeTwomm, event, loadConfigPerTo)
                if (commonInfoVal != undefined && commonInfoVal != null) {
                    this.totalThreeTwomm = commonInfoVal.Value
                    this.MaterialCatVsCnfList.filter(p => p.cnfId == loadConfigPerTo.cnfId)[0].ThreeTwoMM = 0
                }
                break;
        }

    }

    calculateStockValidate(size: string, StockSummaryTotal: number, allocTotolStock: number, event: Event, loadConfigPerTo: MaterialCatConfigPerc)
        : CommonInformation {
        let commonInfo: CommonInformation = undefined
        if (StockSummaryTotal < allocTotolStock) {
            commonInfo = new CommonInformation();
            this.errorMsg.showErrorMessage("Loading Quota should not exceed the Stock (" + StockSummaryTotal + ").", "Warning")
            allocTotolStock += -event.target.value;
            event.target.value = 0;
            commonInfo.Value = allocTotolStock;
            commonInfo.Text = "true";
        }
        return commonInfo;
    }

//// tO Calculate the Avialable stock summary
    totalAvialableSixmm: number = 0; 
    totalAvialableEightmm: number = 0; 
    totalAvialableTenmm: number = 0; 
    totalAvialableOneTwomm: number = 0; 
    totalAvialableOneSixmm: number = 0; 
    totalAvialableTwo0mm: number = 0;
    totalAvialableTwo5mm: number = 0; 
    totalAvialableTwo8mm: number = 0; 
    totalAvialableThreeTwomm: number = 0;
    calcaluteAvialableStock(){
        debugger
        this.totalAvialableSixmm  = 0; 
        this.totalAvialableEightmm  = 0; 
        this.totalAvialableTenmm  = 0; 
        this.totalAvialableOneTwomm  = 0; 
        this.totalAvialableOneSixmm  = 0; 
        this.totalAvialableTwo0mm  = 0;
        this.totalAvialableTwo5mm  = 0; 
        this.totalAvialableTwo8mm  = 0; 
        this.totalAvialableThreeTwomm  = 0;
        
 
         this.stockSummaryToList.filter(p => p.MaterialDesc == "6 MM").forEach(ele=>{this.totalAvialableSixmm += +ele.TotalStock})
         this.stockSummaryToList.filter(p => p.MaterialDesc == "8 MM").forEach(ele=>{this.totalAvialableEightmm += +ele.TotalStock})
         this.stockSummaryToList.filter(p => p.MaterialDesc == "10 MM").forEach(ele=>{this.totalAvialableTenmm += +ele.TotalStock})
         this.stockSummaryToList.filter(p => p.MaterialDesc == "12 MM").forEach(ele=>{this.totalAvialableOneTwomm += +ele.TotalStock})
         this.stockSummaryToList.filter(p => p.MaterialDesc == "16 MM").forEach(ele=>{this.totalAvialableOneSixmm += +ele.TotalStock})
         this.stockSummaryToList.filter(p => p.MaterialDesc == "20 MM").forEach(ele=>{this.totalAvialableTwo0mm += +ele.TotalStock})
         this.stockSummaryToList.filter(p => p.MaterialDesc == "25 MM").forEach(ele=>{this.totalAvialableTwo5mm += +ele.TotalStock})
         this.stockSummaryToList.filter(p => p.MaterialDesc == "28 MM").forEach(ele=>{this.totalAvialableTwo8mm += +ele.TotalStock})
         this.stockSummaryToList.filter(p => p.MaterialDesc == "32 MM").forEach(ele=>{this.totalAvialableThreeTwomm += +ele.TotalStock})
    }
////

//#region Class

//#endregion

}
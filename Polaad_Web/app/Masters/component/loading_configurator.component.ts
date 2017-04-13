
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, ViewChild, Pipe, Injectable, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { CommonServices } from 'app/common/services/common.services'
import { CommonInformation } from 'app/common/model/common_Information'
import { ResultMessage } from 'app/common/model/common_Information'
import { LoadingConfiguratorService } from 'app/Masters/services/loading_configurator.service'
import { StockSummaryTO } from 'app/stock_details/model/stockTO'
import { LoadingConfiguratorTO } from 'app/Masters/model/loading_configuratorTO'
import { MaterialCatConfigPerc } from 'app/Masters/model/loading_configuratorTO'
import { ErrorMessage } from 'app/error/errorMessage'
import { ConfirmService } from 'app/error/confirm.service'
import { ConfirmComponent } from 'app/error/confirm.component'
import { sharedService } from 'app/common/services/sharedService';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { FormBuilder, FormArray, Validators } from '@angular/forms';
import { AuthenticationService } from 'app/login/login.services'
import { UserTO } from 'app/user/model/userTO'
declare var componentHandler: any;

import myGlobalVal = require('app/global')

@Component({
    selector: 'loading-configurator',
    // template:'<h1>Hello</h1>'
    templateUrl: 'app/Masters/loading_configurator.html',
    providers: [ConfirmService]

})

export class LoadingConfiguratorComponent implements OnInit {
    @ViewChild(ErrorMessage) errorMsg: ErrorMessage;
    userTo: UserTO = {}
    constructor(
        private ss: sharedService
        , private loadingConfiguratorServices: LoadingConfiguratorService
        , private authLoginServices: AuthenticationService
        , private _confirmService: ConfirmService
        , private commonServices : CommonServices
    ) {
        this.userTo = authLoginServices.getUserTOFromLocalStorage();
    }
    resultMessage : ResultMessage = new ResultMessage;
    listLoadingConfig: LoadingConfiguratorTO[] = [];
    MaterialSpce: string[] = [];
    groupedLoadingConfigList: any = {};
    MaterialCatVsCnfList: any = []
    lblMessage: string;
    totalSixmm: number = 0; totalEightmm: number = 0; totalTenmm: number = 0; totalOneTwomm: number = 0; totalOneSixmm: number = 0; totalTwo0mm: number = 0;
    ; totalTwo5mm: number = 0; totalTwo8mm: number = 0; totalThreeTwomm: number = 0;

    specificationList : CommonInformation[] = []
    productCatList : CommonInformation[] = []
    ProdSpecId : number = 0
    ProdCatId : number = 0
    ProdCatVal : boolean = false;
    isDisplayConfigList : boolean = false;
    isModifiedData : boolean =false

    ngOnInit() {
        componentHandler.upgradeDom();
        this.getDropdownList();
        //this.getMaterialAndConfigure();
    }

    getDropdownList(){
        this.ss.showLoader();
        this.commonServices.getMaterialSepc().subscribe(
            data => {
                this.specificationList = data;
            },
            err=>{
                this.ss.hideLoader()
                console.log("Server Error : " + err)
                
            }

        );

        this.commonServices.getProductCatList().subscribe(
            data1=>{
                this.ss.hideLoader()
                this.productCatList = data1;
            },
            err=>{
                this.ss.hideLoader()
                console.log("Server Error : " + err);
            }
        )
    }

    checkModifiedAndDisplayConfigList()
    {
        if(!this.isModifiedData){
            this.displayConfiguratorList();
            return; 
        }
        
         this._confirmService.activate("Do you want to submit modified values from below Loading Configuratio?", "Confirmation")
            .then(res => {
                this.ss.showLoader();
                if (res) {
                    this.postLoaderConfigToServer();
                }
                else{
                      this.displayConfiguratorList();
                }
                this.isModifiedData = false;
                this.ss.hideLoader();
            })

    }

    assignCatValue(ProdCatVal : boolean){
          ProdCatVal == true ? this.ProdCatId = 2 : this.ProdCatId =1
          this.ProdCatVal =ProdCatVal 
          this.checkModifiedAndDisplayConfigList()
    }

    displayConfiguratorList() {   
          this.ProdCatVal == true ? this.ProdCatId = 2 : this.ProdCatId =1
      
        if(this.ProdSpecId != 0 && this.ProdCatId !=0){
            this.groupedLoadingConfigList = {};
            this.MaterialCatVsCnfList = []
            this.listLoadingConfig = []
            this.MaterialSpce = []
            this.getMaterialAndConfigure();        

        }
        else
            this.isDisplayConfigList = false;
    }
    getMaterialAndConfigure() {
        debugger
        this.ss.showLoader();
        // if (this.listLoadingConfig.length > 0)
        //     return;
        this.loadingConfiguratorServices.getLoadingConfigurator(this.ProdSpecId, this.ProdCatId).subscribe(
            data => {
                this.listLoadingConfig = data;
                if (this.listLoadingConfig.length > 0 && this.listLoadingConfig != undefined){
                    this.configureCnfAndCat();
                    this.calculatePercentageTotal();
                    this.isDisplayConfigList = true;
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
        var uniqueLayerIds = this.listLoadingConfig.map(p => p.MaterialDesc).filter((value, index, self) => self.indexOf(value) === index);
        uniqueLayerIds.forEach(element => {
            this.MaterialSpce.push(element)
        })
        var i = 0
        for (var i = 0; i < this.listLoadingConfig.length; ++i) {
            var obj = this.listLoadingConfig[i];

            //If a property for this CngOrgID does not exist yet, create
            if (this.groupedLoadingConfigList[obj.CnfOrgId] === undefined)
                this.groupedLoadingConfigList[obj.CnfOrgId] = [obj.CnfOrgId];

            //x will always be the array corresponding to the current DtmStamp. Push a value the current value to it.
            this.groupedLoadingConfigList[obj.CnfOrgId].push(obj.AllocPct);
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
                loaderConfigPercTO.cnfName = this.listLoadingConfig.filter(p => p.CnfOrgId == this.groupedLoadingConfigList[k][0])[0].CnfOrgName;
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


    postLoaderQuotaConfig() {
        this.submitStockAvialability();
        this._confirmService.activate("Have you confirm to load loading configuration Quota?", "Confirmation")
            .then(res => {
                if (res) {
                    this.postLoaderConfigToServer();
                }
            })

    }

    postLoaderConfigToServer() {
        this.ss.showLoader();
        this.loadingConfiguratorServices.postStockCatAndSpecDetails(this.listLoadingConfig
            , this.userTo.IdUser).subscribe(postData => {
                this.ss.hideLoader();
                this.resultMessage = postData;
                if (this.resultMessage.Result == 1) {
                    this.errorMsg.showErrorMessage("Loading Quota configured successfully", "Information");
                }
                else
                    this.errorMsg.showErrorMessage("Loading Quota not configured.", "Error");
            },
            err => {
                console.log('Server side error : ' + err)
                this.ss.hideLoader();
            })
    }

    submitStockAvialability() {
        debugger;
        if (this.listLoadingConfig.length == 0)
            return;

        this.MaterialCatVsCnfList.forEach(ele => {
            this.listLoadingConfig.filter(p => p.CnfOrgId == ele.cnfId)[0].AllocPct = ele.SixMM
                , this.listLoadingConfig.filter(p => p.CnfOrgId == ele.cnfId)[1].AllocPct = ele.EightMM
                , this.listLoadingConfig.filter(p => p.CnfOrgId == ele.cnfId)[2].AllocPct = ele.TenMM
                , this.listLoadingConfig.filter(p => p.CnfOrgId == ele.cnfId)[3].AllocPct = ele.TweleveMM
                , this.listLoadingConfig.filter(p => p.CnfOrgId == ele.cnfId)[4].AllocPct = ele.OneSixMM
                , this.listLoadingConfig.filter(p => p.CnfOrgId == ele.cnfId)[5].AllocPct = ele.TwoZeroMM
                , this.listLoadingConfig.filter(p => p.CnfOrgId == ele.cnfId)[6].AllocPct = ele.TwoFiveMM
                , this.listLoadingConfig.filter(p => p.CnfOrgId == ele.cnfId)[7].AllocPct = ele.TwoEightMM
                , this.listLoadingConfig.filter(p => p.CnfOrgId == ele.cnfId)[8].AllocPct = ele.ThreeTwoMM


        })
        //alert('after change : ' + JSON.stringify(this.stockDetailsTOList))
    }

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
                 
    }

    validateConfigPerc($event:Event, loaderConfigPerTo : MaterialCatConfigPerc) {
        this.isModifiedData = true;
        this.calculatePercentageTotal();
        if (this.totalSixmm > 100 || this.totalEightmm > 100 || this.totalTenmm > 100 || this.totalOneTwomm > 100 ||
            this.totalOneSixmm > 100 || this.totalTwo0mm > 100 || this.totalTwo5mm > 100 || this.totalTwo8mm > 100 || this.totalThreeTwomm > 100) {
            this.errorMsg.showErrorMessage("Single Size for all cnf should not exceed 100% .", "Warning")
            this.calculateTotalConfigPerc($event.target.value, loaderConfigPerTo);
            $event.target.value = 0;
            //this.calculatePercentageTotal();
        }
    }

     ValidateAndPostLoadingQuotaConfig() {
        this.calculatePercentageTotal();
        if (this.totalSixmm < 100 || this.totalEightmm < 100 || this.totalTenmm < 100 || this.totalOneTwomm < 100 ||
            this.totalOneSixmm < 100 || this.totalTwo0mm < 100 || this.totalTwo5mm < 100 || this.totalTwo8mm < 100 || this.totalThreeTwomm < 100) {
            this.errorMsg.showErrorMessage("Single Size for all cnf should not less than 100% .", "Warning")
           return;
        }
        this.postLoaderQuotaConfig();
    }

    calculateTotalConfigPerc(entereVal: number, loaderConfigPerTo : MaterialCatConfigPerc) {
        if (this.totalSixmm > 100){
            this.MaterialCatVsCnfList.filter(p=>p.cnfId == loaderConfigPerTo.cnfId)[0].SixMM = 0;
            this.totalSixmm +=  -entereVal;
        }
        else if (this.totalEightmm > 100){
            this.MaterialCatVsCnfList.filter(p=>p.cnfId == loaderConfigPerTo.cnfId)[0].EightMM = 0;            
            this.totalEightmm +=  -entereVal;
        }
        else if (this.totalTenmm > 100){
            this.MaterialCatVsCnfList.filter(p=>p.cnfId == loaderConfigPerTo.cnfId)[0].TenMM = 0;            
            this.totalTenmm +=  -entereVal;
        }
        else if (this.totalOneTwomm > 100){
            this.MaterialCatVsCnfList.filter(p=>p.cnfId == loaderConfigPerTo.cnfId)[0].TweleveMM = 0;
            this.totalOneTwomm += -entereVal;
        }
        else if (this.totalOneSixmm > 100){
            this.MaterialCatVsCnfList.filter(p=>p.cnfId == loaderConfigPerTo.cnfId)[0].OneSixMM = 0;
            this.totalOneSixmm += -entereVal;
        }
        else if (this.totalTwo0mm > 100){
            this.MaterialCatVsCnfList.filter(p=>p.cnfId == loaderConfigPerTo.cnfId)[0].TwoZeroMM = 0;
            this.totalTwo0mm +=- -entereVal;
        }
        else if (this.totalTwo5mm > 100){
            this.MaterialCatVsCnfList.filter(p=>p.cnfId == loaderConfigPerTo.cnfId)[0].TwoFiveMM = 0;
            this.totalTwo5mm += -entereVal;
        }
        else if (this.totalTwo8mm > 100){
            this.MaterialCatVsCnfList.filter(p=>p.cnfId == loaderConfigPerTo.cnfId)[0].TwoEightMM = 0;
            this.totalTwo8mm += -entereVal;
        }
        else if (this.totalThreeTwomm > 100){
            this.MaterialCatVsCnfList.filter(p=>p.cnfId == loaderConfigPerTo.cnfId)[0].ThreeTwoMM = 0;
            this.totalThreeTwomm += -entereVal;
        }
    }

    selectOnClick($event: Event) {
        $event.target.select();
    }
    
}
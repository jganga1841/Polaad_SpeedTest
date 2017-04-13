import {Component, OnInit, ViewContainerRef,ViewChild,ChangeDetectorRef} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {LoadingServices} from '../services/loading_service'
import {LoadingQuotaTO} from '../model/loading_quotaTO'
import {ConfirmService} from 'app/error/confirm.service'
import {ErrorMessage} from 'app/error/errorMessage'
import myGlobalVal = require('app/global')
import {sharedService} from 'app/common/services/sharedService';
import {UserTO} from 'app/user/model/userTO'
import {AuthenticationService} from 'app/login/login.services'
import { CommonServices } from 'app/common/services/common.services'
import {CommonInformation} from 'app/common/model/common_Information'
import { StockProdSpecTO } from 'app/stock_details/model/stockTO'
@Component({
    selector:'view-loadingSlip',
    templateUrl:'app/loading_slip/view_loading_quota.html',
})  

export class ViewLoadingQuota implements OnInit{

   
    isShowCnFLst:boolean=false;
    userTO:UserTO
    cnfList:CommonInformation[];
    txnTypeList:CommonInformation[];
    private loadingQuotaList : LoadingQuotaTO[] =[]
    stockSpec: string[] = [];
    MaterialSizeSpecLst: any = []
    productSizeSpecGroupedStockList: any = {}

    constructor(private ss:sharedService,
    private loadingServices : LoadingServices,
    private loginService:AuthenticationService,
    private commonServices: CommonServices,
    ) { }

    cnfOrgId:number

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
                             this.getcnfList(myGlobalVal.orgTypeEnum.CNFTYPEID);
                             this.isShowCnFLst = true;
                         }
                 }
               this.getLoadingQuotaList();
                 
     }


      getLoadingQuotaList() {
        this.stockSpec= [];
        this.loadingQuotaList = [];
        this.MaterialSizeSpecLst = [];
       this.productSizeSpecGroupedStockList = {};
        
        this.loadingServices.getCnfDeclaredLoadingQuota(this.cnfOrgId)
            .subscribe(
            p =>{ this.loadingQuotaList = p
                 if(this.loadingQuotaList.length!=0)
                {
                    this.configureStockSpecAndCat();
                }
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

      getcnfList(orgTypeId: number) {
        this.commonServices.getOrgList(orgTypeId)
            .subscribe(
            commonInfoList => this.cnfList = commonInfoList,
            err => {
                // Log errors if any
                console.log(err);
            });
    }
   

    onddlCnFChage()
    {
        this.stockSpec=[];
        this.getLoadingQuotaList();

    }


     configureStockSpecAndCat() {
        
        this.MaterialSizeSpecLst = [];
        var uniqueLayerIds = this.loadingQuotaList.map(p => p.ProdSpecDesc).filter((value, index, self) => self.indexOf(value) === index);
        uniqueLayerIds.forEach(element => {
            this.stockSpec.push(element)
        })
        var i = 0
        for (var i = 0; i < this.loadingQuotaList.length; ++i) {
            var obj = this.loadingQuotaList[i];

            //If a property for this DtmStamp does not exist yet, create
            if (this.productSizeSpecGroupedStockList[obj.MaterialDesc] === undefined)
                this.productSizeSpecGroupedStockList[obj.MaterialDesc] = [obj.MaterialDesc];

            //x will always be the array corresponding to the current DtmStamp. Push a value the current value to it.
            //debugger;
            var result = obj.AllocQuota +"/"+ obj.BalanceQuota
            this.productSizeSpecGroupedStockList[obj.MaterialDesc].push(result);
        }


    
        debugger;
        for (var k in this.productSizeSpecGroupedStockList) {
            let i: number = 0;
            let materialTO: StockProdSpecTO = new StockProdSpecTO()
            if (this.productSizeSpecGroupedStockList.hasOwnProperty(k)) {
                //alert('val : ' + this.groupedStockList[k])
                var matval2 = this.productSizeSpecGroupedStockList[k][2]
                var matval4 = this.productSizeSpecGroupedStockList[k][4]
                var matval6 = this.productSizeSpecGroupedStockList[k][6]
                materialTO.MaterialCategory = this.productSizeSpecGroupedStockList[k][0];
                materialTO.StraightQty =this.productSizeSpecGroupedStockList[k][1];
                materialTO.BendQty = matval2
                materialTO.RKShortQty = this.productSizeSpecGroupedStockList[k][3];
                materialTO.RKLongQty = matval4
                materialTO.TukadaQty = this.productSizeSpecGroupedStockList[k][5];
                materialTO.CoilQty = matval6
                // materialTO.TotalValue = materialTO.StraightQty + +materialTO.BendQty + +materialTO.RKShortQty
                //     + +materialTO.RKLongQty + +materialTO.TukadaQty + +materialTO.CoilQty
                this.MaterialSizeSpecLst.push(materialTO);
                //this.calculateTotal();
            }
        }   


    }

}
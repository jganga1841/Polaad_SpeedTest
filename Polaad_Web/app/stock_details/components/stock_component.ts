import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, ViewChild, Pipe, Injectable, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { CommonServices } from 'app/common/services/common.services'
import { CommonInformation } from 'app/common/model/common_Information'
import { ResultMessage } from 'app/common/model/common_Information'
import { StockDetailsServices } from 'app/stock_details/services/stock_services'
import { StockSummaryTO } from 'app/stock_details/model/stockTO'
import { StockDetailsTO } from 'app/stock_details/model/stockTO'
import { StockProdSpecTO } from 'app/stock_details/model/stockTO'
import { ErrorMessage } from 'app/error/errorMessage'
import { ConfirmService } from 'app/error/confirm.service'
import { ConfirmComponent } from 'app/error/confirm.component'
import { sharedService } from 'app/common/services/sharedService';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { FormBuilder, FormArray, Validators } from '@angular/forms';
import { AuthenticationService } from 'app/login/login.services'
import { UserTO } from 'app/user/model/userTO'
declare var componentHandler: any;
import { SizeAndSpecWiseStock } from '../model/stockTO'
import myGlobalVal = require('app/global')
import {RunningSize} from '../model/stockTO'
@Component({
    selector: 'loading-slip',
    // template:'<h1>Hello</h1>'
    templateUrl: 'app/stock_details/stock_details.html',
    providers: [ConfirmService]

})

export class StockDetailsComponent implements OnInit {
    @ViewChild(ErrorMessage) errorMsg: ErrorMessage;
    userTo: UserTO = {}
    constructor(
        private ss: sharedService
        , private commonServices: CommonServices
        , private _sanitizer: DomSanitizer
        , private stockServices: StockDetailsServices
        , private authLoginServices: AuthenticationService
        , private _confirmService: ConfirmService

    ) {
        this.userTo = authLoginServices.getUserTOFromLocalStorage();
    }

    locationTO  : CommonInformation = 0
    materialTO : CommonInformation = 0
    locationList: CommonInformation[];
    compartmentList: CommonInformation[];
    productCategoryList: CommonInformation[];
    public locationTo: CommonInformation = {}
    public comparmentTo: CommonInformation = {}
    materialSpecAndCatList: StockProdSpecTO[] = [];
    stockSummaryTo: StockSummaryTO = new StockSummaryTO();
    stockDetailTO: StockDetailsTO = { LocationId: 0, ProdCatId: 0, CompartmentId: 0 }
    materialList: CommonInformation[];
    stockDetailsTOList: StockDetailsTO[] = []
    runningStockDetailsTOList: RunningSize[] = []
    stockSummaryList: SizeAndSpecWiseStock[] = []
    LocationId: number
    CompartmentId: number
    ProductCategoryId: number
    productSpec: string[] = [];
    groupedStockList: any = [];
    runningStockDetailTO: RunningSize = {}  
    keys: String[];
    firstKey: string;
    stockDate: string = null
    isvalidateMaterialAction: boolean = false;
    resultMessage: ResultMessage = new ResultMessage();
    stockSpec: string[] = [];
    MaterialSizeSpecLst: StockProdSpecTO[] = []
    productSizeSpecGroupedStockList: any = {}
    productMaterialSpecAndCatList: StockProdSpecTO[] = [];
    totalStraightQty: number = 0; totalBendQty: number = 0; totalRKShortQty: number = 0; totalRKLongQty: number = 0;
    totalTukadaQty: number = 0; totalCoilQty: number = 0; total: number;
    isUpdate:boolean=false;
    dailyRunningStockDetailsTOList: RunningSize[];
    runningSizeStockDate:string=null;
    lastUpdatedstockDate:string;
    isShow:boolean=false;
    selectedCompartment:string=null;
    isConfirmed:boolean=false;
    ngOnInit() {
        componentHandler.upgradeDom();
        this.stockUpdateCall();
    }
   stockUpdateCall(){
  
        this.ss.showLoader();
        this.getLocationList();
        this.getProductCatList();
        this.stockSpec=[];
   }

    stockSummaryCall(){
        this.ss.showLoader();
        this.getStockSummaryList();
        this.stockSummaryList = [];
        this.stockSpec=[];
       // this.IsLoadingQuotaDeclaredForTheDate();
        
    }
    runningSizeCall() {
        this.getMaterialList();
        this.getDailyRunningSizeList();
        this.runningStockDetailsTOList = [];
        this.stockSpec = [];
    }
    getLocationList() {
        this.commonServices.getLocationtList().subscribe(
            data => {
                this.locationList = data
            },
            error => {
                console.log(error)
            }
        )
    }
    getCompartmentList(LocationId: number) {
        this.compartmentList = [];
        this.stockDetailTO.CompartmentId = 0
        this.validateProdAndLoc();

        if (LocationId != 0 && LocationId != undefined) {
            this.commonServices.getCompartmentList(LocationId).subscribe(
                data1 => {
                    this.compartmentList = data1
                },
                error => {
                    console.log(error)
                }
            )
        }
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

    autocompleListFormatter = (data: any): SafeHtml => {
        let html = `<span>${data.Text}</span>`;
        return this._sanitizer.bypassSecurityTrustHtml(html);
    }

    getMaterialAndConfigure() {
         this.selectedCompartment=this.compartmentList.filter(c=>c.Value==this.stockDetailTO.CompartmentId)[0].Text;
        this.stockDetailsTOList = [];
        this.materialSpecAndCatList = [];
        this.productSpec = [];
       this.groupedStockList = {};
        
        this.stockServices.getProductStockList(this.stockDetailTO).subscribe(
            data => {
                debugger
                this.stockDetailsTOList = data;
                this.configureProdSpecAndCat();                
            }
        )

    }

    configureProdSpecAndCat() {
        var uniqueLayerIds = this.stockDetailsTOList.map(p => p.ProdSpecDesc).filter((value, index, self) => self.indexOf(value) === index);
        uniqueLayerIds.forEach(element => {
            this.productSpec.push(element)
        })
        //this.productSpec.push('Quota')
        var i = 0
        for (var i = 0; i < this.stockDetailsTOList.length; ++i) {
            var obj = this.stockDetailsTOList[i];

            //If a property for this DtmStamp does not exist yet, create
            if (this.groupedStockList[obj.MaterialDesc] === undefined)
                this.groupedStockList[obj.MaterialDesc] = [{'key':obj.MaterialDesc ,value : [obj.MaterialDesc]}];
            //x will always be the array corresponding to the current DtmStamp. Push a value the current value to it.
            this.groupedStockList[obj.MaterialDesc].push({ 'key' : obj.ProdSpecDesc, 'value' : obj.NoOfBundles});
        }
        this.materialSpecAndCatList = [];
        debugger;
        for (var k in this.groupedStockList) {
            let i: number = 0;
            let materialTO: StockProdSpecTO = new StockProdSpecTO()
            if (this.groupedStockList.hasOwnProperty(k)) {
                //alert('val : ' + this.groupedStockList[k])
                var matval2 = this.groupedStockList[k][2]
                var matval4 = this.groupedStockList[k][4]
                var matval6 = this.groupedStockList[k][6]

                materialTO.MaterialCategory = this.groupedStockList[k][0];
                materialTO.StraightQty = this.groupedStockList[k][1];
                materialTO.BendQty = matval2
                materialTO.RKShortQty = this.groupedStockList[k][3];
                materialTO.RKLongQty = matval4
                materialTO.TukadaQty = this.groupedStockList[k][5];
                materialTO.CoilQty = matval6
                this.materialSpecAndCatList.push(materialTO);
                this.groupedStockList[k].forEach(ele => {

                })
            }
        }
        this.firstKey = this.groupedStockList.first;
        this.keys = Object.keys(this.groupedStockList);
        //this.pushQuotaForSize();
    }

    pushQuotaForSize(){
         this.keys.forEach(ele => {
              this.groupedStockList[ele].push({'key':'Quota', 'value':'0'})
         })
    }

    submitStockAvialability() {
        debugger
        this.keys.forEach(ele => {
            this.groupedStockList[ele].forEach(
                element => {
                    //alert("Key : " + element.key + "Val : " + element.value)
                    if (element.key != ele) {
                        this.stockDetailsTOList.filter(p => p.MaterialDesc == ele
                            && p.ProdSpecDesc == element.key)[0].NoOfBundles = element.value
                    }
                }
            )
        })
    }

   

    validateProdAndLoc() {
        if (this.stockDetailTO.ProdCatId != 0
            && this.stockDetailTO.LocationId != 0 && this.stockDetailTO.CompartmentId != 0)
            this.isvalidateMaterialAction = true;
        else
            this.isvalidateMaterialAction = false;

    }

    postStockCatAndSpecDetails() {
        debugger;
        this.submitStockAvialability();
        this.stockSummaryTo.StockDetailsTOList = this.stockDetailsTOList;
        this._confirmService.activate("Have you confirm to load Stock details?", "Confirmation")
            .then(res => {
                if (res) {
                    this.ss.showLoader();
                    this.stockServices.postStockCatAndSpecDetails(this.stockSummaryTo, this.userTo.IdUser)
                        .subscribe(postData => {
                            this.resultMessage = postData
                            this.ss.hideLoader();
                            if (this.resultMessage.Result == 1) {
                                this.errorMsg.showErrorMessage("Stock details updated successfully", "Information");
                                this.stockDetailTO = { LocationId: 0, ProdCatId: 0, CompartmentId: 0 }
                                this.stockDetailsTOList = [];
                                this.materialSpecAndCatList = [];
                                this.productSpec = [];
                                this.groupedStockList = {};
                                this.validateProdAndLoc();
                                this.getStockSummaryList();
                                
                            }
                            else
                                this.errorMsg.showErrorMessage(this.resultMessage.Text, "Error");
                        },
                        err => {
                            console.log('Server side error : ' + err)
                            this.ss.hideLoader();
                        })
                }
            })

    }

    getMaterialList() {
        this.commonServices.getMaterial()
            .subscribe(
            materialList => this.materialList = materialList,
            err => {
                this.ss.hideLoader();
                // Log errors if any
                console.log(err);
            });
    }
   getDailyRunningSizeList() {
        this.stockServices.getDailyRunningSizeList(this.runningSizeStockDate)
            .subscribe(
            dailyRunningStockDetailsTOList => this.dailyRunningStockDetailsTOList = dailyRunningStockDetailsTOList,
            err => {
                this.ss.hideLoader();
                // Log errors if any
                console.log(err);
            });
    }
    addRunningMaterial(locationTO: CommonInformation, materialTO: CommonInformation, runningStockDetailTO: RunningSize) {
        if(runningStockDetailTO.TotalStock==0)
        {
            return ;
        }
        else
        {
            this.runningStockDetailsTOList.push({
            'LocationName': locationTO.Text,
            'LocationId':locationTO.Value,
            'MaterialId':materialTO.Value,
            'MaterialDesc': materialTO.Text,
            'TotalStock':   runningStockDetailTO.TotalStock,
        });
        }
       
    }

    deleteMaterial(event: Event, runningstock: StockDetailsTO) {
        event.preventDefault();
        var index = this.runningStockDetailsTOList.indexOf(runningstock);
        this.runningStockDetailsTOList.splice(index, 1);
    }

    getStockSummaryList() {
        this.stockSpec= [];
        this.stockSummaryList = [];
        this.MaterialSizeSpecLst = [];
        this.productSizeSpecGroupedStockList={};
        this.stockServices.getStockSummaryDetails(this.stockDate)
            .subscribe(                
            stockSummaryList => {   
                debugger;            
                this.stockSummaryList = stockSummaryList
                if(this.stockSummaryList!= null)
                {
                    this.isUpdate=true
                    debugger;
                    this.configureStockSpecAndCat();
                }
                else
                {
                    this.isUpdate=false
                }
                    
                     this.ss.hideLoader();
            },
            err => {
                this.ss.hideLoader();
                // Log errors if any
                console.log(err);
            });
    }

    configureStockSpecAndCat() {
           this.MaterialSizeSpecLst = [];
        debugger
        var uniqueLayerIds = this.stockSummaryList.map(p => p.ProdSpecDesc).filter((value, index, self) => self.indexOf(value) === index);
        uniqueLayerIds.forEach(element => {
            this.stockSpec.push(element)
        })
        var i = 0
        for (var i = 0; i < this.stockSummaryList.length; ++i) {
            var obj = this.stockSummaryList[i];

            //If a property for this DtmStamp does not exist yet, create
            if (this.productSizeSpecGroupedStockList[obj.MaterialDesc] === undefined)
                this.productSizeSpecGroupedStockList[obj.MaterialDesc] = [obj.MaterialDesc];

            //x will always be the array corresponding to the current DtmStamp. Push a value the current value to it.
            this.productSizeSpecGroupedStockList[obj.MaterialDesc].push(obj.TotalStock);
        }

      
        //debugger;
        for (var k in this.productSizeSpecGroupedStockList) {
            let i: number = 0;
            let materialTO: StockProdSpecTO = new StockProdSpecTO()
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
                this.MaterialSizeSpecLst.push(materialTO);
                this.calculateTotal();
            }
        }   


    }

    calculateTotal() {
        this.totalStraightQty = 0
        this.totalBendQty = 0
        this.totalRKShortQty = 0
        this.totalRKLongQty = 0
        this.totalTukadaQty = 0
        this.totalCoilQty = 0

        this.MaterialSizeSpecLst.forEach(
            element => {
                this.totalStraightQty += +element.StraightQty
                this.totalBendQty += +element.BendQty
                this.totalRKShortQty += +element.RKShortQty
                this.totalRKLongQty += +element.RKLongQty
                this.totalTukadaQty += +element.TukadaQty
                this.totalCoilQty += +element.CoilQty
                this.total = this.totalStraightQty+this.totalBendQty+this.totalRKShortQty+this.totalRKLongQty+this.totalTukadaQty+this.totalCoilQty;
            });
    }


    selectOnClick($event: Event) {
        $event.target.select();
    }



    getStockSummary() {
        if (this.MaterialSizeSpecLst.length == 0)
            return;
        //     this.materialSpecAndCatList.forEach(ele=>{
        //         this.stockDetailsTOList.filter(
        //             p=>{
        //                 (p.MaterialDesc == ele.MaterialCategory && p.ProdSpecDesc == this.productSpec[0])[0].NoOfBundles = ele.StraightQty
        //                 ,(p.MaterialDesc == ele.MaterialCategory && p.ProdSpecDesc == this.productSpec[1])[0].NoOfBundles = ele.BendQty
        //             ,(p.MaterialDesc == ele.MaterialCategory && p.ProdSpecDesc == this.productSpec[2])[0].NoOfBundles = ele.RKShortQty
        //         ,(p.MaterialDesc == ele.MaterialCategory && p.ProdSpecDesc == this.productSpec[3])[0].NoOfBundles = ele.RKLongQty
        //     ,(p.MaterialDesc == ele.MaterialCategory && p.ProdSpecDesc == this.productSpec[4])[0].NoOfBundles = ele.TukadaQty
        // ,(p.MaterialDesc == ele.MaterialCategory && p.ProdSpecDesc == this.productSpec[5])[0].NoOfBundles = ele.CoilQty})
        //     })
        this.MaterialSizeSpecLst.forEach(ele => {
            this.stockSummaryList.filter(p => p.MaterialDesc == ele.MaterialCategory)[0].TotalStock = ele.StraightQty
                , this.stockSummaryList.filter(p => p.MaterialDesc == ele.MaterialCategory)[1].TotalStock = ele.BendQty
                , this.stockSummaryList.filter(p => p.MaterialDesc == ele.MaterialCategory)[2].TotalStock = ele.RKShortQty
                , this.stockSummaryList.filter(p => p.MaterialDesc == ele.MaterialCategory)[3].TotalStock = ele.RKLongQty
                , this.stockSummaryList.filter(p => p.MaterialDesc == ele.MaterialCategory)[4].TotalStock = ele.TukadaQty
                , this.stockSummaryList.filter(p => p.MaterialDesc == ele.MaterialCategory)[5].TotalStock = ele.CoilQty


        })
        //alert('after change : ' + JSON.stringify(this.stockDetailsTOList))
    }


   postStockSummaryDetails() {
        this.getStockSummary();
        this._confirmService.activate("Have you confirm to load Stock Summary?", "Confirmation")
            .then(res => {
                if (res) {
                    this.ss.showLoader();
                    this.stockServices.postStockSummaryDetails(this.stockSummaryList, this.userTo.IdUser)
                        .subscribe(postData => {
                            this.resultMessage = postData
                            this.ss.hideLoader();
                            if (this.resultMessage.Result == 1) {
                                this.errorMsg.showErrorMessage("Stock Summary Details Confirmed successfully", "Information");
                                this.stockDetailTO = { LocationId: 0, ProdCatId: 0, CompartmentId: 0 }
                                this.stockDetailsTOList = [];
                                this.stockSummaryList = []
                                this.materialSpecAndCatList = [];
                                this.productSpec = [];
                                this.stockSpec=[];
                                this.groupedStockList = {};
                                this.getStockSummaryList();
                                
                            }
                            else
                                this.errorMsg.showErrorMessage("Stock Summary Details Not Confirmed .", "Error");
                        },
                        err => {
                            console.log('Server side error : ' + err)
                            this.ss.hideLoader();
                        })
                }
            })

    }

    postRunningSizeDetails()
    {

          this._confirmService.activate("Have You Confirm To Add Running Sizes?", "Confirmation")
            .then(res => {
                if (res) {
                    this.ss.showLoader();
                    this.stockServices.postRunningSizeDetails(this.runningStockDetailsTOList, this.userTo.IdUser)
                        .subscribe(postData => {
                            this.resultMessage = postData
                            this.ss.hideLoader();
                            if (this.resultMessage.Result == 1) {
                                this.errorMsg.showErrorMessage("Running Size Details Saved Successfully", "Information");
                                this.runningStockDetailsTOList = [];
                            }
                            else
                                this.errorMsg.showErrorMessage("Running Size Details Not Saved .", "Error");
                        },
                        err => {
                            console.log('Server side error : ' + err)
                            this.ss.hideLoader();
                        })
                }
            })

    }

    getLastUpdatedStockDate() {
        this.isShow = true;
        this.stockServices.getLastUpdatedStockDate(this.stockDetailTO).subscribe(
            lastUpdatedstockDate => {
                this.lastUpdatedstockDate = lastUpdatedstockDate;
            },
            err => {
                console.log('Server side error : ' + err)
                this.ss.hideLoader();
            })
    }
    // IsLoadingQuotaDeclaredForTheDate() {
    //     this.stockServices.IsLoadingQuotaDeclaredForTheDate().subscribe(
    //         isConfirmed => {
    //             this.isConfirmed = isConfirmed;
    //             return  this.isConfirmed;
    //         },
    //         err => {
    //             console.log('Server side error : ' + err)
    //             this.ss.hideLoader();
    //         })
    // }

}







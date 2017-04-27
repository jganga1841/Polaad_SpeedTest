import{Component,ViewChild,OnInit} from '@angular/core';
import {ConfirmService} from 'app/error/confirm.service'
import {ConfirmComponent} from 'app/error/confirm.component'
import {ErrorMessage} from 'app/error/errorMessage'
import { CommonInformation } from 'app/common/model/common_Information'
import { CommonServices } from 'app/common/services/common.services'
import { sharedService } from 'app/common/services/sharedService';
import { StockDetailsTO } from 'app/stock_details/model/stockTO'
import { StockDetailsServices } from 'app/stock_details/services/stock_services'
import { productSpecService } from '../services/productSpecificationService'
import{Observable}from 'rxjs/Rx';
import {UserTO} from 'app/user/model/userTO'
import {AuthenticationService} from 'app/login/login.services'
import {ProductSpecInfoTO} from '../model/productSpecificationInfo'
import {ResultMessage} from 'app/common/model/common_Information'
import myGlobalVal = require('app/global')

@Component({
    selector:'my-productSpecification',
    // template:'<h1>Hello</h1>'
    templateUrl:'app/Masters/productSpecification.html'
})


export class ProductSpecificationMaster implements OnInit
{
      materialList: CommonInformation[];
      productCategoryList: CommonInformation[];
      isOpen:boolean=false;
      productSpec: string[] = [];
      productSpecInfoList:ProductSpecInfoTO[]=[];
      //private prodSpecTo:ProductSpecInfoTO
      userTO:UserTO
      materialId:number=0;
      productCatId:number=0;
      loginUserId:number;
      avgBundleWt:number=0;
      materialTO:CommonInformation
      productCatTO:CommonInformation
      public resultMessage:ResultMessage
      prodSpecTo:ProductSpecInfoTO;
      isShow:boolean=false;
    @ViewChild(ErrorMessage) errorMsg: ErrorMessage;

    constructor(
         private ss: sharedService
        ,private _confirmService:ConfirmService
        ,private commonServices: CommonServices
        ,private productSpecService:productSpecService
        ,private loginService:AuthenticationService
        ){
             //this.prodSpecTo = new ProductSpecInfoTO();
             this.userTO=loginService.getUserTOFromLocalStorage();
             this.loginUserId=this.userTO.IdUser;
        }

    ngOnInit(){
          this.prodSpecTo=new ProductSpecInfoTO();
          this.getMaterialList();
          this.getProductCatList();
    }

    //  onMaterialSelect(materialId:number)
    // {
    //  this.materialId=materialId;
    // }
    onProductCatSelect()
    {
      this.getProductSpecList(this.materialId,this.productCatId);
      if(this.productCatId!=0)
       {this.isOpen=true;}
       else {this.isOpen=false;}
    
    }

     getMaterialList() {
        this.commonServices.getMaterial()
            .subscribe(
            materialList => this.materialList = materialList,
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

    getProductSpecList(materialId:number,productCatId:number){
        if(materialId != 0 && productCatId != 0)
        {
            this.isShow=true;
            this.productSpecInfoList = [];
            this.productSpecService.getProductSpecificationList(productCatId).subscribe(
            data => {
                debugger;
                this.productSpecInfoList = data,
                this.productSpecInfoList= this.productSpecInfoList.filter(c=>c.MaterialId == materialId)
                this.productSpecInfoList.forEach(ele=>{
                    ele.AvgBundleWt = ele.AvgSecWt * ele.StdLength * ele.NoOfPcs
                })
                this.prodSpecTo.SecWt=this.productSpecInfoList[0].SecWt;
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
       
    }

    saveProductSpecification(SecWt:number) {
        let ProductSpecOperation: Observable<ResultMessage>;
        this.productSpecInfoList.forEach(c=>c.SecWt=SecWt);
        ProductSpecOperation = this.productSpecService.addProductSpecification(this.productSpecInfoList, this.loginUserId);
        ProductSpecOperation.subscribe(result => {
            if (result.Result == 1 ||  result.MessageType == myGlobalVal.ResultMessageE.Information)
             {
                this.errorMsg.showErrorMessage("Record Saved Successfully", "Information");
             }
            else
                this.errorMsg.showErrorMessage("Record not Saved", "Error");

        },
            err => { });
    }

    showConfirmDialog(SecWt:number): boolean {
        var warningmsg: string
        warningmsg = "Do You Want To Add The Product Specification?";
        this._confirmService.activate(warningmsg, "Confirmation")
            .then(res => {
                if (res) {
                    this.saveProductSpecification(SecWt);
                } else {
                }
            });
        return false;

    }
    calculateAvgBundleWt(prodSpecTo:ProductSpecInfoTO){
        
     var avgSecWt:number=prodSpecTo.AvgSecWt;
     var stdLength:number=prodSpecTo.StdLength;
     var noOfPcs:number =prodSpecTo.NoOfPcs;
     if(avgSecWt==undefined)
     {
         avgSecWt=0
     }
     this. avgBundleWt=(avgSecWt*stdLength*noOfPcs)
     this.productSpecInfoList.filter(c=>c.MaterialId==prodSpecTo.MaterialId &&  c.ProdCatId==prodSpecTo.ProdCatId && c.ProdSpecId==prodSpecTo.ProdSpecId).forEach(c=>c.AvgBundleWt=this.avgBundleWt)
    }

    selectOnClick($event: Event) {
        $event.target.select();
    }


}
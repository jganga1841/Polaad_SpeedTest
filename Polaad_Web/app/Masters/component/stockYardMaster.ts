import{Component,ViewChild,OnInit} from '@angular/core';
import{MenuComponent} from'app/common/component/menu.component'
import{StockYardInfo} from'app/Masters/model/stockYardInfo'
import{stockYardService} from'app/Masters/services/stockYardService'
import {Router } from '@angular/router';
import {Observable} from 'rxjs/Rx';
import {ErrorMessage} from 'app/error/errorMessage'
import {Subscription} from "rxjs";
import {ConfirmService} from 'app/error/confirm.service'
import {ConfirmComponent} from 'app/error/confirm.component'

@Component({
    selector:'my-stockYard',
    // template:'<h1>Hello</h1>'
    templateUrl:'app/Masters/stockYard.component.html'
})  



export class StockYardMaster implements OnInit
{
    // @ViewChild(MenuComponent)
    // public menuComponent:MenuComponent;
    @ViewChild(ErrorMessage) errorMsg: ErrorMessage;
    constructor(
        private _confirmService:ConfirmService,
        private stockYardServiceObj:stockYardService
        ){}
    private stockYardObj:StockYardInfo=new StockYardInfo();
        stockYardInfoList : StockYardInfo[];

    ngOnInit()
    {
       this.GetAllStockYardList();
    }

    GetAllStockYardList()
    {
            
            this.stockYardServiceObj.getStockYardList().subscribe(
                p=>this.stockYardInfoList =p,
                err=>{console.log(err)}
            );
            
    }

    SaveNewStockYard()
    {
    
        let BookingOperation:Observable<number>;
        BookingOperation = this.stockYardServiceObj.AddStockYard(this.stockYardObj);
            BookingOperation.subscribe(result=>{            
                if(result==1)
                    {
                        this.errorMsg.showErrorMessage("Record Saved Successfully", "Information");
                    }
                else
                    this.errorMsg.showErrorMessage("Record not Saved", "Error");
    
            },
            err=>{});
    }

}
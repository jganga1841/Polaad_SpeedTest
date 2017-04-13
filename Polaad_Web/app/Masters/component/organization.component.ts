import{Component,ViewChild,OnInit} from '@angular/core';
import{MenuComponent} from'app/common/component/menu.component';
import{OrganizationInfo} from'app/Masters/model/organizationInfo';
import{AddressInfo} from'app/Masters/model/addressInfo';
import{PersonInfo} from'app/Masters/model/personInfo';
import{OrganizationService} from'app/Masters/services/organizationService';
import {Router } from '@angular/router';
import {Observable} from 'rxjs/Rx';
import {ErrorMessage} from 'app/error/errorMessage';
import {Subscription} from "rxjs";
import {ConfirmService} from 'app/error/confirm.service';
import {ConfirmComponent} from 'app/error/confirm.component';
import {CommonInformation} from 'app/common/model/common_Information';

@Component({
    selector:'my-org',
    // template:'<h1>Hello</h1>'
    templateUrl:'app/Masters/organizationGui.html'
})  



export class OrganizationComponent implements OnInit
{
    // @ViewChild(MenuComponent)
    // public menuComponent:MenuComponent;
    @ViewChild(ErrorMessage) errorMsg: ErrorMessage;
    constructor(
        //private _confirmService:ConfirmService,
        private orgServiceObj:OrganizationService
        ){}
    private newOrgInfo:OrganizationInfo=new OrganizationInfo();
    stateList : CommonInformation[];
    private addressInfo:AddressInfo=new AddressInfo();
    
    ngOnInit()
    {
     
      this.GetStatesForDropDown();

    }

    GetStatesForDropDown()
    {
        debugger;
        this.orgServiceObj.GetStatesForDDL(1)
            .subscribe(element=>{this.stateList = element},
                err=>{
                    alert('Server error :' + err)
                    console.log(err)
                },
                ()=>{
                            console.log("Done")
                    })
    }

    SaveNewOrganization()
    {
    
        // let BookingOperation:Observable<number>;
        // BookingOperation = this.stockYardServiceObj.AddStockYard(this.org);
        //     BookingOperation.subscribe(result=>{            
        //         if(result==1)
        //             {
        //                 this.errorMsg.showErrorMessage("Record Saved Successfully", "Information");
        //             }
        //         else
        //             this.errorMsg.showErrorMessage("Record not Saved", "Error");
    
        //     },
        //     err=>{});
    }

}
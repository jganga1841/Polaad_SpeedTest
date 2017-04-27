
import {Injectable, EventEmitter} from '@angular/core'
import {Http,Headers,Response,RequestOptions}from '@angular/http';
import {CommonInformation} from '../model/common_Information'
import {Observable} from 'rxjs/Rx'
import {QuotaInformation} from 'app/quota_declaration/model/quota_information'
import {BookingActionsTO} from 'app/booking/model/booking_information'
import myGlobalVal = require('app/global')
import {ResultMessage} from 'app/common/model/common_Information'

@Injectable()
export class CommonServices {
    constructor(private http: Http) { }
    dealerList: CommonInformation[];
    materialList: CommonInformation[];

    quotaInfo: QuotaInformation;
    //getDealerList():CommonInformation[]{   
    getOrgList(orgTypeId: number): Observable<CommonInformation[]> {   //
        return this.http.get(myGlobalVal.gnGetOrgListForDDL + orgTypeId)
            // ...and calling .json() on the response to return data
            .map((res: Response) => res.json())
            //...errors if any
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    /*[GJ]@20170307 : get the dealer list againest*/
    getDealerList(cnfId: number): Observable<CommonInformation[]> {   //
        return this.http.get(myGlobalVal.gnDealerList + cnfId)
            // ...and calling .json() on the response to return data
            .map((res: Response) => res.json())
            //...errors if any
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    getNoOfDeliveries(): CommonInformation[] {
        return [{ Value: 1, Text: '1' }, { Value: 2, Text: '2' }, { Value: 3, Text: '3' }, { Value: 4, Text: '4' }
            , { Value: 5, Text: '5' }];
    }
    getQuotaInfo(): QuotaInformation {
        this.quotaInfo.QuotaAllocDate = new Date();
        this.quotaInfo.RateBand = 122;
        return this.quotaInfo;
    }


    getDealerAddressDetails(): string {
        return "";
    }

    getMaterialList(): CommonInformation[] {
        return this.materialList = [
            { Text: 'Select Material', Value: 0 }
            , { Text: '8 MM', Value: 1 }
            , { Text: '12 MM', Value: 2 }
        ];
        //   return this.http.get(this.CommonUrl + 'task/GetProjects')
        //                  .map((res:Response)=>res.json())
        //                  //...errors if any
        //                  .catch((error:any)=>Observable.throw(error.json().error|| 'Server error'));
    }

    getQuotaValidDurationList(): CommonInformation[] {
        return [{ Value: 1, Text: '0' }, { Value: 1, Text: '15' }, { Value: 2, Text: '30' }, { Value: 3, Text: '45' }, { Value: 4, Text: '60' }];
    }

    getConfirmNnConfList(): CommonInformation[] {
        return [{ Value: 1, Text: 'C' }, { Value: 0, Text: 'N' }];
    }

    isNumber(evt: any) {
        evt = (evt) ? evt : window.event;
        var charCode = (evt.which) ? evt.which : evt.keyCode;

        if (charCode > 31 && (charCode != 46 && (charCode < 48 || charCode > 57))) {
            return false;
        } else {
            return true;
     }
}
 getBookingStatus(txnTypeId : number):Observable<CommonInformation[]>{
          return this.http.get(myGlobalVal.gnGetBookingStatus+'?txnTypeId='+ txnTypeId)
                 // ...and calling .json() on the response to return data
                 .map((res:Response)=>res.json())
                 //...errors if any
                 .catch((error:any)=>Observable.throw(error.json().error|| 'Server error'));
    }

        
//[08-03-2017]Vijaymala Added to get Rate Reason List
     //  getCompanyQuota():QuotaInformation{
        getRateReason():Observable<CommonInformation[]>{
         return this.http.get(myGlobalVal.gnGetReasonList)
                 // ...and calling .json() on the response to return data
                 .map((res:Response)=>res.json())
                 //...errors if any
                 .catch((error:any)=>Observable.throw(error.json().error|| 'Server error'));
       
      }

//[14-03-2017]Vijaymala Added to display Delivery Days List
    //   getDeliveryPeriodList():CommonInformation[]{
    //     return [{Value:1, Text:"1"},{Value:2, Text:"2"},{Value:3, Text:"3"},{Value:4, Text:"4"},{Value:5, Text:"5"}
    //     ,{Value:6, Text:"6"},{Value:7, Text:"7"},{Value:7, Text:"8"},{Value:7, Text:"9"},{Value:7, Text:"10"}];
    // }


//[17/03/2017]Vijaya added to get cdStructure list,delivery period list,district list

getCdstructureList():Observable<CommonInformation[]>{
     return this.http.get(myGlobalVal.gnGetCdStructureList)
                 // ...and calling .json() on the response to return data
                 .map((res:Response)=>res.json())
                 //...errors if any
                 .catch((error:any)=>Observable.throw(error.json().error|| 'Server error'));   
}


getDeliveryPeriodList():Observable<CommonInformation[]>{
     return this.http.get(myGlobalVal.gnGetDeliveryPeriodList)
                 // ...and calling .json() on the response to return data
                 .map((res:Response)=>res.json())
                 //...errors if any
                 .catch((error:any)=>Observable.throw(error.json().error|| 'Server error'));   
}

 //[27/02/2017]Vijaymala added to submit  for director confirmation/C&F approved beyond quota and rate band 
     closeBooking(bookingActionsTO : BookingActionsTO,loginUserId:number):Observable<ResultMessage>{
       
        //debugger
        var params = {
            bookingActionsTO : bookingActionsTO,
            loginUserId : loginUserId
        };
        let bodyString = JSON.stringify(params);
        let headers = new Headers({'Content-Type':'application/json'});
        let options = new RequestOptions({headers : headers});
         return this.http.post(myGlobalVal.gnPostBookingClosure, bodyString, options)
                 // ...and calling .json() on the response to return data
                 .map((res:Response)=>res.json())

                 //...errors if any
                 .catch((error:any)=>Observable.throw(alert(error.json().error), error.json().error|| 'Server error'));                 
    }
    
   getLocationtList():Observable<CommonInformation[]>{
       return this.getListForDropDown(myGlobalVal.gnLocationList);
    }

    getCompartmentList(locationId : number):Observable<CommonInformation[]>{
              return this.getListForDropDown(myGlobalVal.gnCompartmentList+ locationId);
    }

    
    getProductCatList():Observable<CommonInformation[]>{
        return this.getListForDropDown(myGlobalVal.gnMaterialTypeList);
    }

   getMaterialSepc():Observable<CommonInformation[]>{
       return this.getListForDropDown(myGlobalVal.gnMaterialSpecList);
    }
     
      getMaterial():Observable<CommonInformation[]>{
          return this.getListForDropDown(myGlobalVal.gnGetMaterilaForDDL);
    }

    getListForDropDown(apiUrl : string):Observable<CommonInformation[]>{
         return this.http.get(apiUrl)
            // ...and calling .json() on the response to return data
            .map((res: Response) => res.json())
            //...errors if any
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
}



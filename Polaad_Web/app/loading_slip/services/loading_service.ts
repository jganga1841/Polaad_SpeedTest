import{Injectable} from '@angular/core'
import {Http,Headers,Response,RequestOptions}from '@angular/http';
import{Observable}from 'rxjs/Rx';
import {LoadingSlipTO} from '../model/loading_information'
import {LoadingSlipExtTO} from '../model/loading_information'
import {LoadingTO} from '../model/loading_information'
import {LoadingQuotaTO} from '../model/loading_quotaTO'
import {ResultMessage} from 'app/common/model/common_Information'
import {DeliveryAddressTO} from 'app/booking/model/booking_information'
import {CommonInformation} from 'app/common/model/common_Information'
import {SizeAndSpecWiseStock} from 'app/stock_details/model/stockTO'
import myGlobalVal = require('app/global')

@Injectable()
export class LoadingServices{
    constructor (private http: Http) {}
    addLoading(loadingTO : LoadingTO, loginUserID : number):Observable<ResultMessage>{
        debugger
        var params ={
            loadingSlipTO : loadingTO,
            loginUserId : loginUserID
        };
        let bodyString = JSON.stringify(params);
         let headers = new Headers({'Content-Type':'application/json'});
        let options = new RequestOptions({headers : headers});

         return this.http.post(myGlobalVal.gnNewLoadingSlip, bodyString, options)
                 // ...and calling .json() on the response to return data
                 .map((res:Response)=>res.json())

                 //...errors if any
                 .catch((error:any)=>Observable.throw(alert(error.json().error), error.json().error|| 'Server error'));                 
    }

    loadingSlipList(cnfId:number,loadingStatusId:number,fromDate:string,toDate:string):Observable<LoadingTO[]>
    {   
        //alert('v S : ' + myGlobalVal.gnLoadingSlipList)
         //return this.http.get(myGlobalVal.gnLoadingSlipList +cnfId+"&loadingStatusId=" +loadingStatusId+"&fromDate​ ="+fromDate​+"&toDate="+toDate)
          //return this.http.get(myGlobalVal.gnLoadingSlipList + cnfId + "&loadingStatusId=" + loadingStatusId + "&fromDate="+fromDate +"&toDate="+toDate)
          return this.http.get(myGlobalVal.gnGetLoadingSlipList+cnfId+"&loadingStatusId="+loadingStatusId+"&fromDate="+fromDate+"&toDate="+toDate)
                 // ...and calling .json() on the response to return data
                 .map((res:Response)=>res.json())
                 //...errors if any
                 .catch((error:any)=>Observable.throw(error.json().error|| 'Server error'));
    }
    todaysLoadingSlipList(cnfId:number,loadingStatusId:number):Observable<LoadingTO[]>
    {   
        //alert('v S : ' + myGlobalVal.gnLoadingSlipList)
         //return this.http.get(myGlobalVal.gnLoadingSlipList +cnfId+"&loadingStatusId=" +loadingStatusId)
          return this.http.get(myGlobalVal.gnGetLoadingSlipList+cnfId+"&loadingStatusId="+loadingStatusId)
         
                 // ...and calling .json() on the response to return data
                 .map((res:Response)=>res.json())
                 //...errors if any
                 .catch((error:any)=>Observable.throw(error.json().error|| 'Server error'));
    }


    getLoadingToById(idLoading : number):Observable<LoadingTO>{
        return this.http.get(myGlobalVal.gnLoadingToById +  idLoading)
                 // ...and calling .json() on the response to return data
                 .map((res:Response)=>res.json())
                 //...errors if any
                 .catch((error:any)=>Observable.throw(error.json().error|| 'Server error'));
    }
/*[GJ]@20170307 : Get the the Loading Status Reasons*/
    getLoadStatusReason(statusId : number): Observable<CommonInformation[]>{
        return this.http.get(myGlobalVal.gnGetStatusReasons +  statusId)
                 // ...and calling .json() on the response to return data
                 .map((res:Response)=>res.json())
                 //...errors if any
                 .catch((error:any)=>Observable.throw(error.json().error|| 'Server error'));
    }

    postStatusReasonService(loadingTo : LoadingTO,loginUserId:number){
          var params ={
            loadingTO : loadingTo,
            loginUserId : loginUserId
        };
        let bodyString = JSON.stringify(params);
         let headers = new Headers({'Content-Type':'application/json'});
        let options = new RequestOptions({headers : headers});

         return this.http.post(myGlobalVal.gnPostStatusWithReason, bodyString, options)
                 // ...and calling .json() on the response to return data
                 .map((res:Response)=>res.json())

                 //...errors if any
                 .catch((error:any)=>Observable.throw(alert(error.json().error), error.json().error|| 'Server error'));                 
    }

    getDeliveryAddrById(OrderId : number): Observable<DeliveryAddressTO[]>{
        return this.http.get(myGlobalVal.gnDeliveryAddrList +  OrderId)
                 // ...and calling .json() on the response to return data
                 .map((res:Response)=>res.json())
                 //...errors if any
                 .catch((error:any)=>Observable.throw(error.json().error|| 'Server error'));
    }

    getLoadingQuota(ProdSpecId:number, ProdCatId:number) : Observable<LoadingQuotaTO[]>{
        return this.http.get(myGlobalVal.gnGetLoadingQuota + ProdSpecId +  "&prodCatId=" + ProdCatId )
                 // ...and calling .json() on the response to return data
                 .map((res:Response)=>res.json())
                 //...errors if any
                 .catch((error:any)=>Observable.throw(error.json().error|| 'Server error'));
    }

    postLoadingQuotaDeclaration(listLoadingQuota : LoadingQuotaTO[], loginId : number):Observable<ResultMessage>{
         var params ={
            loadingQuotaDeclarationTOList : listLoadingQuota,
            loginUserId : loginId
        };
        let bodyString = JSON.stringify(params);
         let headers = new Headers({'Content-Type':'application/json'});
        let options = new RequestOptions({headers : headers});

         return this.http.post(myGlobalVal.gnPostLoadingQuotaDeclaration, bodyString, options)
                 // ...and calling .json() on the response to return data
                 .map((res:Response)=>res.json())

                 //...errors if any
                 .catch((error:any)=>Observable.throw(alert(error.json().error), error.json().error|| 'Server error'));                 
    }

     isLoadingQuotaDeclaredToday(): Observable<boolean>{
        return this.http.get(myGlobalVal.gnIsLoadingQuotaDeclaredToday )
                 // ...and calling .json() on the response to return data
                 .map((res:Response)=>res.json())
                 //...errors if any
                 .catch((error:any)=>Observable.throw(error.json().error|| 'Server error'));
    }
    isDelaredTodayLoadingQuota(): Observable<boolean> {
        return this.http.get(myGlobalVal.gnIsDeclaredTodayLoadingQuota)
            // ...and calling .json() on the response to return data
            .map((res: Response) => res.json())
            //...errors if any
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
    getStockSummaryDet(ProdSpecId:number, ProdCatId:number): Observable<SizeAndSpecWiseStock[]>{
        return this.http.get(myGlobalVal.gnGetStockSummaryAgainestCatSpec + ProdSpecId + "&prodCatId=" + ProdCatId )
                 // ...and calling .json() on the response to return data
                 .map((res:Response)=>res.json())
                 //...errors if any
                 .catch((error:any)=>Observable.throw(error.json().error|| 'Server error'));
    }

    isLoadingQuotaConfirmed():Observable<boolean>{
         return this.http.get(myGlobalVal.gnIsLoadingQuotaConfirmed )
                 // ...and calling .json() on the response to return data
                 .map((res:Response)=>res.json())
                 //...errors if any
                 .catch((error:any)=>Observable.throw(error.json().error|| 'Server error'));
    }

     getProductStockList(loadingSlipTO : LoadingSlipTO, proCategoryID : number):Observable<LoadingSlipExtTO[]>{
          return this.http.get(myGlobalVal.gnGetLoadingSlipExtList 
          + loadingSlipTO.TblLoadingSlipDtlTO.IdBooking+'&prodCatId='+proCategoryID)
                 // ...and calling .json() on the response to return data
                 .map((res:Response)=>res.json())
                 //...errors if any
                 .catch((error:any)=>Observable.throw(error.json().error|| 'Server error'));
    }

    getCnfDeclaredLoadingQuota(cnfOrgId : number):Observable<LoadingQuotaTO[]>{
             return this.http.get(myGlobalVal.gnGetCnfDecLoadingQuota + cnfOrgId)
                 // ...and calling .json() on the response to return data
                 .map((res:Response)=>res.json())
                 //...errors if any
                 .catch((error:any)=>Observable.throw(error.json().error|| 'Server error'));
    }

    getInOutloadingSlipList(statusId:string):Observable<LoadingTO[]>
    {   
        //alert('v S : ' + myGlobalVal.gnLoadingSlipList)
         return this.http.get(myGlobalVal.getInOutloadingSlipList + statusId )
                 // ...and calling .json() on the response to return data
                 .map((res:Response)=>res.json())
                 //...errors if any
                 .catch((error:any)=>Observable.throw(error.json().error|| 'Server error'));
    }

     getSuperwisorListForDropDown():Observable<CommonInformation[]>{
        return this.http.get(myGlobalVal.gnGetSuperwisorListForDropDown)
                 // ...and calling .json() on the response to return data
                 .map((res:Response)=>res.json())
                 //...errors if any
                 .catch((error:any)=>Observable.throw(error.json().error|| 'Server error'));
    }

    postAllocateSupervisor(loadingTo : LoadingTO,loginUserId:number){
          var params ={
            loadingTO : loadingTo,
            loginUserId : loginUserId
        };
        let bodyString = JSON.stringify(params);
         let headers = new Headers({'Content-Type':'application/json'});
        let options = new RequestOptions({headers : headers});

         return this.http.post(myGlobalVal.gnPostAllocateSupervisor, bodyString, options)
                 // ...and calling .json() on the response to return data
                 .map((res:Response)=>res.json())

                 //...errors if any
                 .catch((error:any)=>Observable.throw(alert(error.json().error), error.json().error|| 'Server error'));                 
    }

    

}

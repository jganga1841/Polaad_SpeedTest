import{Injectable} from '@angular/core'
import {Http,Headers,Response,RequestOptions}from '@angular/http';
import{Observable}from 'rxjs/Rx';
import {CommonInformation} from 'app/common/model/common_Information'
import {ResultMessage} from 'app/common/model/common_Information'
import {StockDetailsTO} from 'app/stock_details/model/stockTO'
import {StockSummaryTO} from 'app/stock_details/model/stockTO'
import {SizeAndSpecWiseStock} from '../model/stockTO'
import myGlobalVal = require('app/global')
import {RunningSize} from '../model/stockTO'

@Injectable()
export class StockDetailsServices{
    constructor (private http: Http) {}

    getProductStockList(stockDetailTO : StockDetailsTO):Observable<StockDetailsTO[]>{
          return this.http.get(myGlobalVal.gnStockMatAndSpecList+stockDetailTO.CompartmentId+'&prodCatId='+stockDetailTO.ProdCatId)
                 // ...and calling .json() on the response to return data
                 .map((res:Response)=>res.json())
                 //...errors if any
                 .catch((error:any)=>Observable.throw(error.json().error|| 'Server error'));
    }

    postStockCatAndSpecDetails(stockSummaryTo : StockSummaryTO
        , loginId : number): Observable<ResultMessage>{
         var params ={
            stockSummaryTO : stockSummaryTo,
            loginUserId : loginId
        };
        let bodyString = JSON.stringify(params);
         let headers = new Headers({'Content-Type':'application/json'});
        let options = new RequestOptions({headers : headers});

         return this.http.post(myGlobalVal.gnPostMateAndSpecsList, bodyString, options)
                 // ...and calling .json() on the response to return data
                 .map((res:Response)=>res.json())

                 //...errors if any
                 .catch((error:any)=>Observable.throw(alert(error.json().error), error.json().error|| 'Server error'));                 
    }

    getStockSummaryDetails(stockDate:string):Observable<SizeAndSpecWiseStock[]>{
          return this.http.get(myGlobalVal.gnGetStockSummaryDetails+stockDate)
                 // ...and calling .json() on the response to return data
                 .map((res:Response)=>res.json())
                 //...errors if any
                 .catch((error:any)=>Observable.throw(error.json().error|| 'Server error'));
    }


     postStockSummaryDetails(stockSummaryToList : SizeAndSpecWiseStock[]
        , loginId : number): Observable<ResultMessage>{
         var params ={
            sizeSpecWiseStockTOList  : stockSummaryToList,
            loginUserId : loginId
        };
        let bodyString = JSON.stringify(params);
         let headers = new Headers({'Content-Type':'application/json'});
        let options = new RequestOptions({headers : headers});

         return this.http.post(myGlobalVal.gnPostStockSummaryConfirmation, bodyString, options)
                 // ...and calling .json() on the response to return data
                 .map((res:Response)=>res.json())

                 //...errors if any
                 .catch((error:any)=>Observable.throw(alert(error.json().error), error.json().error|| 'Server error'));                 
    }

     postRunningSizeDetails(runningSizesTOList​  : RunningSize[]
        , loginId : number): Observable<ResultMessage>{
         var params ={
            runningSizesTOList : runningSizesTOList,
            loginUserId : loginId
        };
        let bodyString = JSON.stringify(params);
         let headers = new Headers({'Content-Type':'application/json'});
        let options = new RequestOptions({headers : headers});

         return this.http.post(myGlobalVal.gnPostRunningSizeList, bodyString, options)
                 // ...and calling .json() on the response to return data
                 .map((res:Response)=>res.json())

                 //...errors if any
                 .catch((error:any)=>Observable.throw(alert(error.json().error), error.json().error|| 'Server error'));                 
    }
     getDailyRunningSizeList(runningSizestockDate:string):Observable<RunningSize[]>{
          return this.http.get(myGlobalVal.gnGetDatewiseRunningSizeDtls+runningSizestockDate)
                 // ...and calling .json() on the response to return data
                 .map((res:Response)=>res.json())
                 //...errors if any
                 .catch((error:any)=>Observable.throw(error.json().error|| 'Server error'));
    }

    getLastUpdatedStockDate(stockDetailTO : StockDetailsTO):Observable<string>
    {
          return this.http.get(myGlobalVal.gnGetLastUpdatedStockDate+stockDetailTO.CompartmentId+'&prodCatId='+stockDetailTO.ProdCatId)
                 // ...and calling .json() on the response to return data
                 .map(o => o.text())
                 
                 //...errors if any
                 .catch((error:any)=>Observable.throw(error.json().error|| 'Server error'));
    }

    IsLoadingQuotaDeclaredForTheDate():Observable<boolean>
    {
        return this.http.get(myGlobalVal.gnIsLoadingQuotaConfirmed)
           // ...and calling .json() on the response to return data
                 .map((res:Response)=>res.json())
                 //...errors if any
                 .catch((error:any)=>Observable.throw(error.json().error|| 'Server error'));
    }
}
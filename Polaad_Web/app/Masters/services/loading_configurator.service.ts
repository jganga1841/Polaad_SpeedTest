import{Injectable} from '@angular/core'
import {Http,Headers,Response,RequestOptions}from '@angular/http';
import{Observable}from 'rxjs/Rx';
import {CommonInformation} from 'app/common/model/common_Information'
import {ResultMessage} from 'app/common/model/common_Information'
import {LoadingConfiguratorTO} from 'app/Masters/model/loading_configuratorTO'
import {StockSummaryTO} from 'app/stock_details/model/stockTO'

import myGlobalVal = require('app/global')


@Injectable()
export class LoadingConfiguratorService{
constructor (private http: Http) {}

getLoadingConfigurator( prodSpecId: number,prodCatId:number):Observable<LoadingConfiguratorTO[]>{
    return this.http.get(myGlobalVal.gnLoadingConfiguratorList +prodSpecId +"&prodCatId=" + prodCatId )
                 // ...and calling .json() on the response to return data
                 .map((res:Response)=>res.json())
                 //...errors if any
                 .catch((error:any)=>Observable.throw(error.json().error|| 'Server error'));
}

postStockCatAndSpecDetails(listLoadingConfig : LoadingConfiguratorTO[]
    , loginId : number):Observable<ResultMessage>{
         var params ={
            loadingQuotaConfigList : listLoadingConfig,
            loginUserId : loginId
        };
        let bodyString = JSON.stringify(params);
         let headers = new Headers({'Content-Type':'application/json'});
        let options = new RequestOptions({headers : headers});

         return this.http.post(myGlobalVal.gnPostLoadingQuotaConfig, bodyString, options)
                 // ...and calling .json() on the response to return data
                 .map((res:Response)=>res.json())

                 //...errors if any
                 .catch((error:any)=>Observable.throw(alert(error.json().error), error.json().error|| 'Server error'));                 
    }

}

import{Injectable} from '@angular/core'
import {Http,Headers,Response,RequestOptions}from '@angular/http';
import{Observable}from 'rxjs/Rx';
// import {MarketTrendTO} from '../model/market_trend_information'
import myGlobalVal = require('app/global')
import {​CompetitorUpdatesTOList} from '../model/market_trend_information'
import {ResultMessage} from 'app/common/model/common_Information'
@Injectable()
export class MarketTrendServices{
    constructor (private http: Http) {
    }  

       addMarketTrendUpdate(​​competitorUpdatesTOList​:​CompetitorUpdatesTOList[],loginUserId:number):Observable<ResultMessage>{
        //debugger
        var params ={
            competitorUpdatesTOList:competitorUpdatesTOList,
            loginUserId : loginUserId,
        };
        let bodyString = JSON.stringify(params);
        let headers = new Headers({'Content-Type':'application/json'});
        let options = new RequestOptions({headers : headers});
         return this.http.post(myGlobalVal.gnPostMarketTrend, bodyString, options)
                 // ...and calling .json() on the response to return data
                 .map((res:Response)=>res.json())

                 //...errors if any
                 .catch((error:any)=>Observable.throw(alert(error.json().error), error.json().error|| 'Server error'));                 
    }

     //Vijaymala Added to get market update to director[2017/03/23]
    getMarketUpdate(fromDate:string,toDate:string) :Observable<​CompetitorUpdatesTOList[]>{
        return this.http.get(myGlobalVal.gnGetMarketUpdate+fromDate +"&toDate="+toDate)
                 // ...and calling .json() on the response to return data
                 .map((res:Response)=>res.json())
                 //...errors if any
                 .catch((error:any)=>Observable.throw(error.json().error|| 'Server error'));
     } 

}
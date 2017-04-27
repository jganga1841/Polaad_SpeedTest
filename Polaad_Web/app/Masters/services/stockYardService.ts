import{Injectable} from '@angular/core'
import {Http,Headers,Response,RequestOptions}from '@angular/http';
import{Observable}from 'rxjs/Rx';
import {StockYardInfo} from '../model/stockYardInfo'
import {CommonServices} from 'app/common/services/common.services'
import myGlobalVal = require('app/global')

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class stockYardService{
    constructor (private http: Http) {
    }  

     AddStockYard(stockyardInfoTO : StockYardInfo):Observable<number>
     {
        //debugger
       
        var params ={
            stockYardInfo : stockyardInfoTO,
            loginUserId : 1
        };
        let bodyString = JSON.stringify(params);
        let headers = new Headers({'Content-Type':'application/json'});
        let options = new RequestOptions({headers : headers});
         return this.http.post(myGlobalVal.gnAddStockYard, bodyString, options)
                 // ...and calling .json() on the response to return data
                 .map((res:Response)=>res.json())

                 //...errors if any
                 .catch((error:any)=>Observable.throw(alert(error.json().error), error.json().error|| 'Server error'));                 
    }

    getStockYardList():Observable<StockYardInfo []>
    {
       
         return this.http.get(myGlobalVal.gnGetStockYard)
                 // ...and calling .json() on the response to return data
                 .map((res:Response)=>res.json())
                 //...errors if any
                 .catch((error:any)=>Observable.throw(alert(error.json().error), error.json().error|| 'Server error'));                 
    }
}
import{Injectable} from '@angular/core'
import {Http,Headers,Response,RequestOptions}from '@angular/http';
import{Observable}from 'rxjs/Rx';
import {ProductSpecInfoTO} from '../model/productSpecificationInfo'
import {CommonServices} from 'app/common/services/common.services'
import myGlobalVal = require('app/global')
import {ResultMessage} from 'app/common/model/common_Information'
@Injectable()
export class productSpecService{
    constructor (private http: Http) {
    }  

     addProductSpecification(productSpecList: ProductSpecInfoTO[],loginUserId:number):Observable<ResultMessage>
     {
        //debugger
        var params ={
            productInfoTOList : productSpecList,
            loginUserId : loginUserId
        };
        let bodyString = JSON.stringify(params);
        let headers = new Headers({'Content-Type':'application/json'});
        let options = new RequestOptions({headers : headers});
         return this.http.post(myGlobalVal.gnAddProductSpec, bodyString, options)
                 // ...and calling .json() on the response to return data
                 .map((res:Response)=>res.json())

                 //...errors if any
                 .catch((error:any)=>Observable.throw(alert(error.json().error), error.json().error|| 'Server error'));                 
    }

    getProductSpecificationList(prodCatId:number):Observable<ProductSpecInfoTO[]>
    {
       
         return this.http.get(myGlobalVal.gnGetProductSpecList + prodCatId)
                 // ...and calling .json() on the response to return data
                 .map((res:Response)=>res.json())
                 //...errors if any
                 .catch((error:any)=>Observable.throw(alert(error.json().error), error.json().error|| 'Server error'));                 
    }
}

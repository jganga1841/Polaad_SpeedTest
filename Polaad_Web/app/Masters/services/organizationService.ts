import{Injectable} from '@angular/core'
import {Http,Headers,Response,RequestOptions}from '@angular/http';
import{Observable}from 'rxjs/Rx';
import {OrganizationInfo} from '../model/organizationInfo'
import{AddressInfo} from'app/Masters/model/addressInfo'
import{PersonInfo} from'app/Masters/model/personInfo'
import {CommonServices} from 'app/common/services/common.services'
import myGlobalVal = require('app/global')
import {CommonInformation} from 'app/common/model/common_Information'

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class OrganizationService
{
    constructor (private http: Http) 
    {

    }  
      

     GetStatesForDDL(countryId:number):Observable<CommonInformation []>
    {
       alert("In state Service");
         return this.http.get(myGlobalVal.gnGetStateListForDDL + countryId)
                 // ...and calling .json() on the response to return data
                 .map((res:Response)=>res.json())
                 //...errors if any
                 .catch((error:any)=>Observable.throw(alert(error.json().error), error.json().error|| 'Server error'));                 
    }

    GetDistrictForDDL(stateId : number): Observable<CommonInformation[]>{
        return this.http.get(myGlobalVal.gnGetDistrictList +  stateId)
                 // ...and calling .json() on the response to return data
                 .map((res:Response)=>res.json())
                 //...errors if any
                 .catch((error:any)=>Observable.throw(error.json().error|| 'Server error'));
    }

    GetTalukaForDDL(districtId : number): Observable<CommonInformation[]>
    {
        return this.http.get(myGlobalVal.gnGetTalukaListForDDL +  districtId)
                 // ...and calling .json() on the response to return data
                 .map((res:Response)=>res.json())
                 //...errors if any
                 .catch((error:any)=>Observable.throw(error.json().error|| 'Server error'));
    }
}
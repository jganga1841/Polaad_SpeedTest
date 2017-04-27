// Imports
import {Injectable} from '@angular/core';
import {Http,Headers,Response,RequestOptions}from '@angular/http';
import{AgentInformation} from'app/agent/model/agents_information';
import{Observable}from 'rxjs/Rx';
import{QuotaInformation} from 'app/quota_declaration/model/quota_information'
import{OrganizationTO} from 'app/quota_declaration/model/firm_information'
import {CommonInformation} from 'app/common/model/common_Information'
// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import myGlobalKey = require('app/global')
import {ResultMessage} from 'app/common/model/common_Information'

@Injectable()
export class QuotaDeclarationService{

  competitorQuotaList : OrganizationTO[];
  agent:AgentInformation;
  quotaInfo :QuotaInformation ; 
    // Resolve HTTP using the constructor
     constructor (private http: Http) {}

     //Vijaymala added to get companyquota
      getCompanyQuotaList(fromDate:string,toDate:string):Observable<OrganizationTO[]>{
     
        return this.http.get(myGlobalKey.gnGetRateDeclartionHist+fromDate +"&toDate="+toDate)
        
                 // ...and calling .json() on the response to return data
                 .map((res:Response)=>res.json())

                 //...errors if any
                 .catch((error:any)=>Observable.throw(error.json().error|| 'Server error'));
      }  

    //  getCompanyQuota():Observable<QuotaInformation>{
        getCompanyQuota(OrganizationId : number):Observable<QuotaInformation[]>{
         return this.http.get(myGlobalKey.gnGetTodayQuotaAndRateInfo+OrganizationId)
                 // ...and calling .json() on the response to return data
                 .map((res:Response)=>res.json())
                 //...errors if any
                 .catch((error:any)=>Observable.throw(error.json().error|| 'Server error'));
       
      }

   
//Vijaymala added to get competitor Quota
  getCompetitorQuotaList():Observable<OrganizationTO[]>{ 
        return this.http.get(myGlobalKey.gnGetOrgList + myGlobalKey.orgTypeEnum.COMPETITORID)
        
                 // ...and calling .json() on the response to return data
                 .map((res:Response)=>res.json())

                 //...errors if any
                 .catch((error:any)=>Observable.throw(error.json().error|| 'Server error'));
      }

//Vijaymala added to get C&F Quota
      getCFQuotaList():Observable<OrganizationTO[]>{
  
        return this.http.get(myGlobalKey.gnGetOrgList +  myGlobalKey.orgTypeEnum.CNFTYPEID)
        
                 // ...and calling .json() on the response to return data
                 .map((res:Response)=>res.json())

                 //...errors if any
                 .catch((error:any)=>Observable.throw(error.json().error|| 'Server error'));
      }



      // ijaymala added to announce C&F Quota
   announceQuota(loginUserId:number,cnfannouncementQuotaLst:OrganizationTO[],declaredRate:number,comments:string,rateReasonId:number,rateReasonDesc:string):Observable<ResultMessage>{
       //alert('quota'+cnfannouncementQuotaLst.length);
        var data ={
           cnfList : cnfannouncementQuotaLst,
           declaredRate  : declaredRate,
           loginUserId : loginUserId,
           comments:comments,
           rateReasonId:rateReasonId,
           rateReasonDesc:rateReasonDesc
        };
        //let bodyString = JSON.stringify(cnfannouncementQuotaLst); // Stringify payload
        let bodyString = JSON.stringify(data); // Stringify payload
        let headers = new Headers({ 'Content-Type': 'application/json;charset=utf-8' }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers }); // Create a request option
        return this.http.post(myGlobalKey.gnAnnounceRateAndQuota, bodyString, options) // ...using post request
                         .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
                        
    }  

    



}





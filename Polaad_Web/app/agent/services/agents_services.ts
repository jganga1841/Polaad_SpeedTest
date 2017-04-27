import {Injectable, EventEmitter} from '@angular/core'
import {AddressTO} from '../model/address_information'
import {Observable} from 'rxjs/Rx'
import {QuotaInformation} from 'app/quota_declaration/model/quota_information'
import {BookingTO} from 'app/booking/model/booking_information'
import {Http,Headers,Response,RequestOptions}from '@angular/http';
import myGlobalConst = require('app/global');

@Injectable()
export class AgentsServices{
    constructor(private http:Http){}
    dealerAddrInfo : AddressTO
    bookingInfoList : BookingTO[]
    //getDealerAddrInfo(dealerId : number):AddressTO{
    getDealerAddrInfo(dealerId : number):Observable<AddressTO>{
        let params={orgId:dealerId};
        let bodyString = JSON.stringify(params);
        let headers = new Headers({'Content-Type':'application/json'});
        let options = new RequestOptions({headers : headers});
        return this.http.get(myGlobalConst.gnGetOrgAddrInfo +dealerId)
                 // ...and calling .json() on the response to return data
                 .map((res:Response)=>res.json())
                 //...errors if any
                 .catch((error:any)=>Observable.throw(error.json().error|| 'Server error'));

        // this.dealerAddrInfo.AreaName = "Garden Colney";
        // this.dealerAddrInfo.StreetName = "NH Highway";
        // this.dealerAddrInfo.PinCode = 123456;
        // this.dealerAddrInfo.CountryName = "India";
        // this.dealerAddrInfo.StateName = "Maharshtra";
        // this.dealerAddrInfo.TalukaName = "Pune";
        // this.dealerAddrInfo.DistrictName = "Pune";
        // this.dealerAddrInfo.VillageName = "Shivane";
        // this.dealerAddrInfo.StateId = 1;
        // this.dealerAddrInfo.CountryId = 2;
        // this.dealerAddrInfo.PlotNo = "Shivane";
        // this.dealerAddrInfo.TalukaId = 3;
        // this.dealerAddrInfo.DistrictId = 2;        
        // return this.dealerAddrInfo;

    }

    //getLastFourBookingHist() :BookingTO[]{
    getLastFourBookingHist(dealerId:number, lastNRecords:number=4) :Observable<BookingTO[]>{
        let params={lastNRecords:lastNRecords, dealerId:dealerId};
        let bodyString = JSON.stringify(params);
        let headers = new Headers({'Content-Type':'application/json'});
        let options = new RequestOptions({headers : headers});
        return this.http.get(myGlobalConst.gnGetDealerBookingHist +dealerId+'&lastNRecords='+lastNRecords)
                 // ...and calling .json() on the response to return data
                 .map((res:Response)=>res.json())
                 //...errors if any
                 .catch((error:any)=>Observable.throw(error.json().error|| 'Server error'));
       // return this.bookingInfoList = [];
    //     return this.bookingInfoList = [
    //         {DealerId :1, BookingDate: new Date(), BookingQty:100, BookingRate:450, DeliveryDays:10, NoOfDeliveries:1}
    //         , {DealerId :2, BookingDate: new Date(), BookingQty:120, BookingRate:470, DeliveryDays:10, NoOfDeliveries:1,OrderDetailsInfo: null}
    //         , {DealerId :3, BookingDate: new Date(), BookingQty:140, BookingRate:450, DeliveryDays:10, NoOfDeliveries:1,OrderDetailsInfo: null}
    //         , {DealerId :4, BookingDate: new Date(), BookingQty:10, BookingRate:460, DeliveryDays:10, NoOfDeliveries:1,OrderDetailsInfo: null}
    //         ];
     } 
}
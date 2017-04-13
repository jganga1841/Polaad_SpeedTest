import{Injectable} from '@angular/core'
import {Http,Headers,Response,RequestOptions}from '@angular/http';
import{Observable}from 'rxjs/Rx';
import {BookingTO} from '../model/booking_information'
import {CommonServices} from 'app/common/services/common.services'
import {BookingActionsTO} from 'app/booking/model/booking_information'
import {ResultMessage} from 'app/common/model/common_Information'
import myGlobalVal = require('app/global')

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class bookingServices{
    constructor (private http: Http) {
    }  
    

    addBooking(bookingTO : BookingTO,loginUserId:number):Observable<ResultMessage>{
        //debugger
        var params ={
            bookingTO : bookingTO,
            loginUserId : loginUserId
        };
        let bodyString = JSON.stringify(params);
        let headers = new Headers({'Content-Type':'application/json'});
        let options = new RequestOptions({headers : headers});
         return this.http.post(myGlobalVal.gnOrderBooking, bodyString, options)
                 // ...and calling .json() on the response to return data
                 .map((res:Response)=>res.json())

                 //...errors if any
                 .catch((error:any)=>Observable.throw(alert(error.json().error), error.json().error|| 'Server error'));                 
    }

    viewBooking(cnfID: number, dealerId: number, statusId: number): Observable<BookingTO[]> {
        return this.http.get(myGlobalVal.gnGetAllBooking + '?cnfId=' + cnfID + '&dealerId=' + dealerId + '&statusId=' + statusId)
            // ...and calling .json() on the response to return data
            .map((res: Response) => res.json())
            //...errors if any
            .catch((error: any) => Observable.throw(alert(error.json().error), error.json().error || 'Server error'));
    }

    //Vijaymala Added to getbooking data for loading slip[2017/02/14]
    getDealersBookingList(dealerId: number): Observable<BookingTO[]> {
        return this.http.get(myGlobalVal.gnGetPendingBookingList + dealerId)
            // ...and calling .json() on the response to return data
            .map((res: Response) => res.json())
            //...errors if any
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    } 


//[27/02/2017]Vijaymala added to get booking list beyond quota and rate band for director confirmation

    viewConfirmationBooking(): Observable<BookingTO[]> {
        return this.http.get(myGlobalVal.gnViewConfirmationBooking)
            // ...and calling .json() on the response to return data
            .map((res: Response) => res.json())
            //...errors if any
            .catch((error: any) => Observable.throw(alert(error.json().error), error.json().error || 'Server error'));
    }

 //[27/02/2017]Vijaymala added to submit  for director confirmation/C&F approved beyond quota and rate band 
     addConfirmationBooking(bookingTO : BookingTO,loginUserId:number):Observable<number>{
        //debugger
        var params ={
            bookingTO : bookingTO,
            loginUserId : loginUserId
        };
        let bodyString = JSON.stringify(params);
        let headers = new Headers({'Content-Type':'application/json'});
        let options = new RequestOptions({headers : headers});
         return this.http.post(myGlobalVal.gnBookingConfirmation, bodyString, options)
                 // ...and calling .json() on the response to return data
                 .map((res:Response)=>res.json())

                 //...errors if any
                 .catch((error:any)=>Observable.throw(alert(error.json().error), error.json().error|| 'Server error'));                 
    }
//[28/02/2017]Vijaymala added to get booking list beyond quota and rate band for C&F confirmation
     getPendingBookingsForAcceptance(OrganizationId: number): Observable<BookingTO[]> {
         return this.http.get(myGlobalVal.gnViewConfirmationBookingByCF + '?cnfId=' + OrganizationId)
             // ...and calling .json() on the response to return data
             .map((res: Response) => res.json())
             //...errors if any
             .catch((error: any) => Observable.throw(alert(error.json().error), error.json().error || 'Server error'));
     }

    //Vijaymala Added to getbooking data for loading slip[2017/02/14]

     getBookingListAccToBookingId(bookingId: number): Observable<BookingTO[]> {
         return this.http.get(myGlobalVal.gnBookingListById + '?bookingId=' + bookingId)
             // ...and calling .json() on the response to return data
             .map((res: Response) => res.json())
             //...errors if any
             .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
     } 

     deleteBookingOrder(bookingTO : BookingTO,loginUserId:number){
        var params ={
            bookingTO : bookingTO,
            loginUserId :loginUserId
        };
        let bodyString = JSON.stringify(params);
        let headers = new Headers({'Content-Type':'application/json'});
        let options = new RequestOptions({headers : headers});
         return this.http.post(myGlobalVal.gnDeleteBookingOrder, bodyString, options)
                 // ...and calling .json() on the response to return data
                 .map((res:Response)=>res.json())

                 //...errors if any
                 .catch((error:any)=>Observable.throw(alert(error.json().error), error.json().error|| 'Server error'));        
     }

    editBookingOrder(bookingTO : BookingTO,loginUserId:number):Observable<ResultMessage>{
        //debugger
        var params ={
            bookingTO : bookingTO,
            loginUserId : loginUserId
        };
        let bodyString = JSON.stringify(params);
        let headers = new Headers({'Content-Type':'application/json'});
        let options = new RequestOptions({headers : headers});
         return this.http.post(myGlobalVal.gnEditOrderBooking, bodyString, options)
                 // ...and calling .json() on the response to return data
                 .map((res:Response)=>res.json())

                 //...errors if any
                 .catch((error:any)=>Observable.throw(alert(error.json().error), error.json().error|| 'Server error'));                 
    }

     //Vijaymala Added to getbooking data for loading slip[2017/02/14]

    getBookinOpenCloseInfo(): Observable<BookingActionsTO> {
        return this.http.get(myGlobalVal.gnGetBookinOpenCloseInfo)
            // ...and calling .json() on the response to return data
            .map((res: Response) => res.json())
            //...errors if any
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    } 

     //Vijaymala Added to getbooking data for loading slip[2017/02/14]

    gnGetBookingMaterialExtList(prodCatId:number) :Observable<BookingTO[]>{
        return this.http.get(myGlobalVal.gnGetBookingMaterialExtList+'?prodCatId='+ prodCatId)
                 // ...and calling .json() on the response to return data
                 .map((res:Response)=>res.json())
                 //...errors if any
                 .catch((error:any)=>Observable.throw(error.json().error|| 'Server error'));
     } 
   

}
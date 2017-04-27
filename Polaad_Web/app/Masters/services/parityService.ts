import { Injectable } from '@angular/core'
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { ParitySummaryTO } from 'app/Masters/model/parityTO';
import { ParityDetailsTO } from 'app/Masters/model/parityTO';
import myGlobalVal = require('app/global');
import { ResultMessage } from 'app/common/model/common_Information'
@Injectable()
export class ParityService {
    constructor(private http: Http) { }

    getParityList(): Observable<ParityDetailsTO[]> {
        return this.http.get(myGlobalVal.gnGetParityDetails)
            // ...and calling .json() on the response to return data
            .map((res: Response) => res.json())
            //...errors if any
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    postParityDetails(paritySummaryTOObj: ParitySummaryTO
        , loginId: number): Observable<ResultMessage> {

        console.log('1')
        var params = {
            parityTO: paritySummaryTOObj,
            loginUserId: loginId
        };
        let bodyString = JSON.stringify(params);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        console.log(bodyString);
        debugger;
        return this.http.post(myGlobalVal.gnSetParityDetails, bodyString, options)
            // ...and calling .json() on the response to return data
            .map((res: Response) => res.json())

            //...errors if any
            .catch((error: any) => Observable.throw(alert(error.json().error), error.json().error || 'Server error'));

    }

}

import { Injectable } from '@angular/core';
import { Http, Headers, Response,RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

import 'rxjs/add/operator/map'
import myGlobal = require('app/global')
import {UserTO} from 'app/user/model/userTO'


export interface ILogin {
   isLogin:boolean;
   loginDisplayName? : string 
}
@Injectable()
export class AuthenticationService {
    constructor(private http: Http
    ,private router: Router) { }
        storageUserTO : UserTO = new UserTO()
    
 //JSON.parse(localStorage.getItem('currentUser'));
    login(userTo : UserTO) {
         let bodyString = userTo;
         let headers = new Headers({'Content-Type':'application/json'});
        let options = new RequestOptions({headers : headers});
        return this.http.post(myGlobal.gnLoginApi, bodyString,options)//JSON.stringify({ username: username, password: password })
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let user = response.json();
                // If you want ot store the token , then use the user.token condition
                //if (user && user.token) {
                    debugger;
                    if (user) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
            })
            .catch((error:any)=> Observable.throw(error.json().error || "Server Error"));
          //  let user = JSON.stringify({username : username,password : password});
            //return localStorage.setItem('currentUser', user);;
    }

    logout():Observable<number> {
        // remove user from local storage to log user out
        this.storageUserTO = JSON.parse(localStorage.getItem('currentUser'));

        let bodyString = JSON.stringify(this.storageUserTO) //JSON.stringify(userTo);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(myGlobal.gnLogoutApi, bodyString, options)//JSON.stringify({ username: username, password: password })
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let user = response.json();                                 
                    this.isNotLogin();
                    localStorage.removeItem('currentUser');
            })
            .catch((error : any) => {
                Observable.throw(error.json().error || "Server Error")
                    this.isNotLogin();
                    localStorage.removeItem('currentUser');
                });

    }

    Ilogin:ILogin={isLogin:false}; 
    isLogin(){
        this.Ilogin.isLogin=true;
    }
    isNotLogin(){
        this.Ilogin.isLogin=false;
    }

    getClientIPLocation():Observable<any>{
          let data$ =  this.http.request(myGlobal.gnIpInfo,)//JSON.stringify({ username: username, password: password })
            .map((response: Response) => response.json())
            //.catch((error:any)=>Observable.throw(error.json().error|| 'Server error'));   
            return data$;
    }

    getUserTOFromLocalStorage():UserTO{
       let userTo : UserTO= {};
       userTo = JSON.parse(localStorage.getItem('currentUser'));
       if(userTo == undefined || userTo == null)
            this.router.navigate(['Login']);  
       this.isLogin();     
       return userTo;
    }
    
}
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthenticationService } from './login.services';
import { UserTO } from 'app/user/model/userTO'
import { LoginTO } from 'app/user/model/loginTO'
import { isLoggedin } from "app/gaurds/auth.guard"
//import { GeolocationService } from 'app/common/services/geolocation.service';
//import { MapsService } from 'app/common/services/maps.service';
//import { GeocodingService } from 'app/common/services/geocoding.service';




@Component({
    selector: "login",
    templateUrl: 'app/login/login.component.html',
})
export class LoginComponent implements OnInit {
    //model: any = {};
    //center: google.maps.LatLng;
    loading = false;
    returnUrl: string;
    isloggedIn: boolean = false;
    isError: boolean = false;
    errorMessage: string = ""
    //position: google.maps.LatLng;
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        // private geolocation: GeolocationService
        // , private geocoding: GeocodingService
        //, public maps: MapsService
    ) { }
    private userTo: UserTO
    private loginTO: LoginTO
    private locationDetails: any;
    ngOnInit() {
        // reset login status
        if (localStorage.getItem('currentUser') != undefined) {
            this.authenticationService.logout().subscribe(
                element => {

                });
        }
        this.authenticationService.isNotLogin();

        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        this.userTo = new UserTO();
        this.loginTO = new LoginTO();
        // get return url from route parameters or default to '/'       
        this.isloggedIn = isLoggedin();
    }

    login() {
        this.isError = false;
        this.loading = true;
        this.getClientIPLocation();

    }

    callLoginService() {
        this.userTo.LoginTO = this.loginTO;
        this.authenticationService.login(this.userTo)
            .subscribe(
            data => {
                this.authenticationService.isLogin();
                this.router.navigate([this.returnUrl]);
                //this.router.navigate(["Dashboard"]);

            },
            error => {
                this.errorMessage = "Error from server side.Please try after some time. ";
                this.loading = false;
                this.authenticationService.isNotLogin();
                this.isError = true;
            },
            () => {
                this.isError = true;
                this.errorMessage = "Invalid User ID or Password";
                this.loading = false;
            });
    }

    getClientIPLocation() {
        this.authenticationService.getClientIPLocation().subscribe
            (data => {
                this.locationDetails = data;
                /*Data returns beelow property : ip, hostname, loc //Latitude and Longitude
                data.org //organization, data.city, data.region, data.country, data.phone*/
                //   alert('ip : '+ this.locationDetails.ip + ' loc : ' + this.locationDetails.loc
                //   + ' city : '+ this.locationDetails.city + ' Country : ' + this.locationDetails.country)
                this.loginTO.LoginIP = this.locationDetails.ip;
                this.callLoginService()
            },
            error => {
                this.loginTO.LoginIP = '0.0.0.0';
                this.callLoginService()

            },
            () => { })
    }

    warning: boolean;
    message: string;
    zoom: number;
    title: string;
    content: string;
    // getCurrentPosition() {

    //     this.warning = false;
    //     this.message = "";

    //     if (navigator.geolocation) {

    //         // Gets the current position.
    //         this.geolocation.getCurrentPosition().forEach(

    //             // Next.
    //             (position: Position) => {

    //                 if (this.center.lat() != position.coords.latitude && this.center.lng() != position.coords.longitude) {

    //                     // Sets the new center map & zoom.
    //                     // New center object: triggers OnChanges.
    //                     this.center = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    //                     this.zoom = 11;

    //                     // Translates the location into address.
    //                     this.geocoding.geocode(this.center).forEach(

    //                         // Next.
    //                         (results: google.maps.GeocoderResult[]) => {

    //                             // Sets the marker to the center map.
    //                             this.setMarker(this.center, "your locality", results[0].formatted_address);

    //                         }, null

    //                     ).then(() => console.log('Geocoding service: completed.'));

    //                 }

    //             }, null

    //         ).then(() => console.log('Geolocation service: completed.')).catch(

    //             (error: PositionError) => {

    //                 if (error.code > 0) {

    //                     switch (error.code) {
    //                         case error.PERMISSION_DENIED:
    //                             this.message = 'permission denied';
    //                             break;
    //                         case error.POSITION_UNAVAILABLE:
    //                             this.message = 'position unavailable';
    //                             break;
    //                         case error.TIMEOUT:
    //                             this.message = 'position timeout';
    //                             break;
    //                     }

    //                     this.warning = true;

    //                 }

    //             });

    //     } else {

    //         // Browser doesn't support geolocation.
    //         this.message = "browser doesn't support geolocation";
    //         this.warning = true;

    //     }

    // }

    // // Sets the marker & the info window.
    // setMarker(latLng: google.maps.LatLng, title: string, content: string) {

    //     // Removes all markers.
    //     this.maps.deleteMarkers();

    //     // Sets the marker.
    //     this.position = latLng;
    //     this.title = title;
    //     // Sets the info window.
    //     this.content = content;

    // }

}

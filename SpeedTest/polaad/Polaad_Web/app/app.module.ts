import { NgModule }      from '@angular/core';
import { AppComponent }  from 'app/app.component';
import { BrowserModule } from '@angular/platform-browser';
import {RouterModule}     from '@angular/router';
import { FormsModule,ReactiveFormsModule }    from '@angular/forms';
import { HttpModule}      from '@angular/http';
import { APP_BASE_HREF}  from '@angular/common';
import{MenuComponent} from'app/common/component/menu.component'
import { routeConfig }     from './app.routes';
import{DashBoardComponent} from 'app/dashboard/component/dashboard.component'
import{QuotaDeclarationComponent} from 'app/quota_declaration/component/quota_declaration.component'
import{QuotaDeclarationService}from 'app/quota_declaration/services/quota_declaration_service'
import { Ng2DatetimePickerModule } from 'ng2-datetime-picker';

import{BookingComponent} from 'app/booking/component/booking.component'
import {CommonServices} from 'app/common/services/common.services'
import {AgentsServices} from 'app/agent/services/agents_services'
import {bookingServices} from 'app/booking/services/booking_service'
import{ViewBookinComponent,ViewParticularBooking} from 'app/booking/component/viewBooking.component'
import{LoadingSlipComponent}from 'app/loading_slip/component/loading_slip.component'
import{LoadingQuotaComponent}from 'app/loading_slip/component/loading_quota.component'
import{ErrorMessage} from 'app/error/errorMessage'
import {ConfirmService} from "app/error/confirm.service";
import {ConfirmComponent} from "app/error/confirm.component";
import{LoadingServices} from 'app/loading_slip/services/loading_service'
import {SqueezeBoxModule} from 'squeezebox';

import { ContextMenuComponent } from 'angular2-contextmenu/src/contextMenu.component';
import { ContextMenuService } from 'angular2-contextmenu/src/contextMenu.service';

import{ViewLoadingComponent} from './loading_slip/component/view_loading_slips.component'

import{DeliverySlipConfComponent} from './loading_slip/component/delivery_slip_confirmation.component'
import{StockYardMaster} from'app/Masters/component/stockYardMaster'
import{stockYardService} from'app/Masters/services/stockYardService'

//[GJ] : 20170225 : Import the Login and authentication
import {AuthGuard} from './gaurds/auth.guard'
import {LoginComponent} from './login/login.component'
import {AuthenticationService} from './login/login.services'
import {isLoggedin} from './gaurds/auth.guard'
// import { CustomFormsModule } from 'ng2-validation'
import {sharedService} from 'app/common/services/sharedService';

import{MasterSettingsComponent} from'app/Masters/component/mastersettings.component'
import { Ng2AutoCompleteModule } from 'ng2-auto-complete';
import{OrganizationComponent} from'app/Masters/component/organization.component'
//import {FocusModule} from 'angular2-focus';
import{MarketTrendComponent} from 'app/market_trend/component/market_trend.component'
import {MarketTrendServices} from 'app/market_trend/service/market_trend_service'

import {OnlyNumber} from 'app/directive/onlyNumber.directive'
import {StockDetailsComponent} from 'app/stock_details/components/stock_component'
import {StockDetailsServices} from 'app/stock_details/services/stock_services'
import{ProductSpecificationMaster} from'app/Masters/component/productSpecification.component'
import{productSpecService} from'app/Masters/services/productSpecificationService'
import{LoadingConfiguratorComponent} from'app/Masters/component/loading_configurator.component';
import{LoadingConfiguratorService} from'app/Masters/services/loading_configurator.service';

import{BookingMenuComponent} from'app/booking/component/bookingMenuComponent';
import{LoadingMenuComponent} from'app/loading_slip/component/loadingMenuComponent';
import{ViewInOutLoadingComponent} from'app/loading_slip/component/view_inOut_loading_slip.component';
import {HelpComponent} from 'app/help/component/help.component'
import{ViewLoadingQuota} from'app/loading_slip/component/view_loading_quota.component'
import {parityComponent} from 'app/Masters/component/parity.component';
import {ParityService} from 'app/Masters/services/parityService';

// Services.
//import { GeolocationService } from 'app/common/services/geolocation.service';
//import { MapsService } from 'app/common/services/maps.service';
//import { GeocodingService } from 'app/common/services/geocoding.service';


@NgModule({
  imports: [ BrowserModule,HttpModule
  , RouterModule.forRoot(routeConfig)
  , Ng2DatetimePickerModule

  , SqueezeBoxModule
  , Ng2AutoCompleteModule
  , ReactiveFormsModule
  , FormsModule
  //, FocusModule.forRoot()
  ],

  declarations:[AppComponent,MenuComponent
  , DashBoardComponent
  , QuotaDeclarationComponent
  , BookingComponent
  , ViewBookinComponent
  , LoadingSlipComponent
  , ErrorMessage
  , ConfirmComponent
  , LoginComponent
  , StockYardMaster
  , ContextMenuComponent
  , ViewParticularBooking                                                                                                                                                                                                                    
  , ViewLoadingComponent
  , DeliverySlipConfComponent 
  , MasterSettingsComponent
  , OrganizationComponent
  , MarketTrendComponent
  , OnlyNumber
  , StockDetailsComponent
  , ProductSpecificationMaster
  , LoadingConfiguratorComponent
  , LoadingQuotaComponent
  , BookingMenuComponent
  , LoadingMenuComponent
  , ViewInOutLoadingComponent
  , HelpComponent
  , ViewLoadingQuota
  ,parityComponent

  ],

  providers:[  
    { provide: APP_BASE_HREF, useValue: '/' }
    ,QuotaDeclarationService
    ,CommonServices
    ,AgentsServices
    ,bookingServices
    ,ConfirmService
    ,LoadingServices
    ,AuthGuard
    ,AuthenticationService
    ,stockYardService
    ,ContextMenuService
    ,MarketTrendServices
    ,sharedService
    ,StockDetailsServices
    ,productSpecService
    ,LoadingConfiguratorService
    ,ParityService
    ],
  bootstrap: [ AppComponent ]
})


export class AppModule { }

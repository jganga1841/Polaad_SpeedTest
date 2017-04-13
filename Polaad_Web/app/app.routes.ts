
import{DashBoardComponent} from 'app/dashboard/component/dashboard.component';
import{QuotaDeclarationComponent}from'app/quota_declaration/component/quota_declaration.component';
import { Routes } from '@angular/router';

import{BookingComponent} from 'app/booking/component/booking.component';
import{ViewBookinComponent,ViewParticularBooking} from 'app/booking/component/viewBooking.component';
import{LoadingSlipComponent}from 'app/loading_slip/component/loading_slip.component';
import{LoadingQuotaComponent}from 'app/loading_slip/component/loading_quota.component';
import {AuthGuard} from './gaurds/auth.guard';
import {LoginComponent} from './login/login.component';
import{ViewLoadingComponent} from './loading_slip/component/view_loading_slips.component';
import{DeliverySlipConfComponent} from './loading_slip/component/delivery_slip_confirmation.component';
import myGlobalVal = require('app/global');
import{StockYardMaster} from'app/Masters/component/stockYardMaster';
import{MasterSettingsComponent} from'app/Masters/component/mastersettings.component';
import{OrganizationComponent} from'app/Masters/component/organization.component';
import{MarketTrendComponent} from 'app/market_trend/component/market_trend.component';
import {StockDetailsComponent} from 'app/stock_details/components/stock_component';
import{LoadingConfiguratorComponent} from'app/Masters/component/loading_configurator.component';
import{ProductSpecificationMaster} from'app/Masters/component/productSpecification.component';
import{BookingMenuComponent} from'app/booking/component/bookingMenuComponent';
import{LoadingMenuComponent} from'app/loading_slip/component/loadingMenuComponent';
import{ViewInOutLoadingComponent} from'app/loading_slip/component/view_inOut_loading_slip.component';
import {HelpComponent} from 'app/help/component/help.component'
import{ViewLoadingQuota} from'app/loading_slip/component/view_loading_quota.component'

export const routeConfig:Routes =  [
    { path: '', component:DashBoardComponent,canActivate: [AuthGuard]},    
    { path: 'Dashboard', component:DashBoardComponent,canActivate: [AuthGuard]},
    { path: 'QuotaDeclaration', component:QuotaDeclarationComponent,canActivate: [AuthGuard]},
     { path: 'NewBooking', component:BookingComponent,canActivate: [AuthGuard]},
    {path :'ViewBooking', component:ViewBookinComponent,data: [{ScreenName: myGlobalVal.ScreenName.ViewBooking}],canActivate: [AuthGuard]},
    {path :'NewLoadingSlips', component:LoadingSlipComponent },//,canActivate: [AuthGuard]
    {path :'BookingConfirmation', component:ViewBookinComponent,data: [{ScreenName: myGlobalVal.ScreenName.BookingConfirmation}],canActivate: [AuthGuard] },
    {path :'BookingConfirmationByCnF', component:ViewBookinComponent,data: [{ScreenName: myGlobalVal.ScreenName.BookingConfirmationByCnF}],canActivate: [AuthGuard] },
    {path :'MasterSetting', component:MasterSettingsComponent,canActivate: [AuthGuard] },
    {path:'ViewParticularBooking',component:ViewParticularBooking,canActivate: [AuthGuard]},
    {path :'EditBooking', component:BookingComponent },
    { path: 'Login', component:LoginComponent ,data: {
        hideTopbar: true,
        hideSidebar: true
    }},
    {path :'DeliverySlipConfirmation', component:DeliverySlipConfComponent ,canActivate: [AuthGuard]} ,   
    {path :'StockYard', component:StockYardMaster,canActivate: [AuthGuard]}    ,
    {path :'ViewLoadingSlip', component:ViewLoadingComponent, data: [{ScreenName: myGlobalVal.ScreenName.LOADINGSLIP}],canActivate: [AuthGuard] },
    {path :'DeliverySlipConfirmation', component:DeliverySlipConfComponent } ,
    {path :'MarketTrend', component:MarketTrendComponent},
    {path :'LoadingSlipApproval', component:ViewLoadingComponent, data: [{ScreenName: myGlobalVal.ScreenName.DELIVERY}] ,canActivate: [AuthGuard]} ,   
    {path :'CnfAgent', component:OrganizationComponent,canActivate: [AuthGuard]} ,
    {path :'StockUpdate', component:StockDetailsComponent,canActivate: [AuthGuard]}  ,  
    {path :'ProductSpecification', component:ProductSpecificationMaster,canActivate: [AuthGuard]}    ,

    {path :'LoadingQuotaConfigurator', component:LoadingConfiguratorComponent,canActivate: [AuthGuard]}  ,
    {path :'LoadingQuota', component:LoadingQuotaComponent,canActivate: [AuthGuard]},   
    {path :'Booking', component:BookingMenuComponent,canActivate: [AuthGuard] },
    {path :'LoadingSlips', component:LoadingMenuComponent,canActivate: [AuthGuard] },
    {path :'GetIn', component:ViewInOutLoadingComponent,canActivate: [AuthGuard] },
    {path :'Help', component:HelpComponent,canActivate: [AuthGuard] },
    {path :'Feedback', component:HelpComponent,canActivate: [AuthGuard] },
    {path :'ViewLoadingQuota', component:ViewLoadingQuota,canActivate: [AuthGuard] },
     


];






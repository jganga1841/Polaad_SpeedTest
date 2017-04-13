"use strict";
var dashboard_component_1 = require("app/dashboard/component/dashboard.component");
var quota_declaration_component_1 = require("app/quota_declaration/component/quota_declaration.component");
var booking_component_1 = require("app/booking/component/booking.component");
var viewBooking_component_1 = require("app/booking/component/viewBooking.component");
var loading_slip_component_1 = require("app/loading_slip/component/loading_slip.component");
exports.routeConfig = [
    { path: 'Dashboard', component: dashboard_component_1.DashBoardComponent },
    { path: '', component: dashboard_component_1.DashBoardComponent },
    { path: 'QuotaDeclaration', component: quota_declaration_component_1.QuotaDeclarationComponent },
    { path: 'Booking', component: booking_component_1.BookingComponent },
    { path: 'ViewBooking', component: viewBooking_component_1.ViewBookinComponent },
    { path: 'LoadingSlips', component: loading_slip_component_1.LoadingSlipComponent }
];
// import{DashBoardComponent} from 'app/dashboard/component/dashboard.component'
// import{QuotaDeclarationComponent}from'app/quota_declaration/component/quota_declaration.component'
// import { Routes } from '@angular/router';
// export const routeConfig:Routes = [
//     { path: 'Dashboard', component:DashBoardComponent},
//     { path: 'QuotaDeclaration', component:QuotaDeclarationComponent},
//      {
//         path: '',
//         redirectTo: '/Dashboard',
//         pathMatch: 'full'
//     },
//     {
//         path: '**',
//         redirectTo: '/Dashboard',
//         pathMatch: 'full'
//     }
//];
//# sourceMappingURL=app.routes.js.map
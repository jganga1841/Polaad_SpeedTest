"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var app_component_1 = require("app/app.component");
var platform_browser_1 = require("@angular/platform-browser");
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var common_1 = require("@angular/common");
var menu_component_1 = require("app/common/component/menu.component");
var app_routes_1 = require("./app.routes");
var dashboard_component_1 = require("app/dashboard/component/dashboard.component");
var quota_declaration_component_1 = require("app/quota_declaration/component/quota_declaration.component");
var quota_declaration_service_1 = require("app/quota_declaration/services/quota_declaration_service");
var ng2_datetime_picker_1 = require("ng2-datetime-picker");
var booking_component_1 = require("app/booking/component/booking.component");
var common_services_1 = require("app/common/services/common.services");
var agents_services_1 = require("app/agent/services/agents_services");
var booking_service_1 = require("app/booking/services/booking_service");
var viewBooking_component_1 = require("app/booking/component/viewBooking.component");
var loading_slip_component_1 = require("app/loading_slip/component/loading_slip.component");
var errorMessage_1 = require("app/error/errorMessage");
var confirm_service_1 = require("app/error/confirm.service");
var confirm_component_1 = require("app/error/confirm.component");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [platform_browser_1.BrowserModule, http_1.HttpModule, router_1.RouterModule.forRoot(app_routes_1.routeConfig), forms_1.FormsModule, ng2_datetime_picker_1.Ng2DatetimePickerModule],
        declarations: [app_component_1.AppComponent, menu_component_1.MenuComponent, dashboard_component_1.DashBoardComponent, quota_declaration_component_1.QuotaDeclarationComponent, booking_component_1.BookingComponent,
            viewBooking_component_1.ViewBookinComponent, loading_slip_component_1.LoadingSlipComponent, errorMessage_1.ErrorMessage, confirm_component_1.ConfirmComponent],
        providers: [{ provide: common_1.APP_BASE_HREF, useValue: '/' }, quota_declaration_service_1.QuotaDeclarationService, common_services_1.CommonServices, agents_services_1.AgentsServices,
            booking_service_1.bookingServices, confirm_service_1.ConfirmService],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map
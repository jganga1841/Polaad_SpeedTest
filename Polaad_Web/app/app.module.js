"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var app_component_1 = require('app/app.component');
var platform_browser_1 = require('@angular/platform-browser');
var router_1 = require('@angular/router');
var forms_1 = require('@angular/forms');
var http_1 = require('@angular/http');
var common_1 = require('@angular/common');
var menu_component_1 = require('app/common/component/menu.component');
var app_routes_1 = require('./app.routes');
var dashboard_component_1 = require('app/dashboard/component/dashboard.component');
var quota_declaration_component_1 = require('app/quota_declaration/component/quota_declaration.component');
var quota_declaration_service_1 = require('app/quota_declaration/services/quota_declaration_service');
var ng2_datetime_picker_1 = require('ng2-datetime-picker');
var booking_component_1 = require('app/booking/component/booking.component');
var common_services_1 = require('app/common/services/common.services');
var agents_services_1 = require('app/agent/services/agents_services');
var booking_service_1 = require('app/booking/services/booking_service');
var viewBooking_component_1 = require('app/booking/component/viewBooking.component');
var loading_slip_component_1 = require('app/loading_slip/component/loading_slip.component');
var loading_quota_component_1 = require('app/loading_slip/component/loading_quota.component');
var errorMessage_1 = require('app/error/errorMessage');
var confirm_service_1 = require("app/error/confirm.service");
var confirm_component_1 = require("app/error/confirm.component");
var loading_service_1 = require('app/loading_slip/services/loading_service');
var squeezebox_1 = require('squeezebox');
var contextMenu_component_1 = require('angular2-contextmenu/src/contextMenu.component');
var contextMenu_service_1 = require('angular2-contextmenu/src/contextMenu.service');
var view_loading_slips_component_1 = require('./loading_slip/component/view_loading_slips.component');
var delivery_slip_confirmation_component_1 = require('./loading_slip/component/delivery_slip_confirmation.component');
var stockYardMaster_1 = require('app/Masters/component/stockYardMaster');
var stockYardService_1 = require('app/Masters/services/stockYardService');
//[GJ] : 20170225 : Import the Login and authentication
var auth_guard_1 = require('./gaurds/auth.guard');
var login_component_1 = require('./login/login.component');
var login_services_1 = require('./login/login.services');
// import { CustomFormsModule } from 'ng2-validation'
var sharedService_1 = require('app/common/services/sharedService');
var mastersettings_component_1 = require('app/Masters/component/mastersettings.component');
var ng2_auto_complete_1 = require('ng2-auto-complete');
var organization_component_1 = require('app/Masters/component/organization.component');
var market_trend_component_1 = require('app/market_trend/component/market_trend.component');
var market_trend_service_1 = require('app/market_trend/service/market_trend_service');
var onlyNumber_directive_1 = require('app/directive/onlyNumber.directive');
var stock_component_1 = require('app/stock_details/components/stock_component');
var stock_services_1 = require('app/stock_details/services/stock_services');
var productSpecification_component_1 = require('app/Masters/component/productSpecification.component');
var productSpecificationService_1 = require('app/Masters/services/productSpecificationService');
var loading_configurator_component_1 = require('app/Masters/component/loading_configurator.component');
var loading_configurator_service_1 = require('app/Masters/services/loading_configurator.service');
var bookingMenuComponent_1 = require('app/booking/component/bookingMenuComponent');
var loadingMenuComponent_1 = require('app/loading_slip/component/loadingMenuComponent');
var view_inOut_loading_slip_component_1 = require('app/loading_slip/component/view_inOut_loading_slip.component');
var help_component_1 = require('app/help/component/help.component');
var view_loading_quota_component_1 = require('app/loading_slip/component/view_loading_quota.component');
// Services.
//import { GeolocationService } from 'app/common/services/geolocation.service';
//import { MapsService } from 'app/common/services/maps.service';
//import { GeocodingService } from 'app/common/services/geocoding.service';
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule, http_1.HttpModule,
                router_1.RouterModule.forRoot(app_routes_1.routeConfig),
                ng2_datetime_picker_1.Ng2DatetimePickerModule,
                squeezebox_1.SqueezeBoxModule,
                ng2_auto_complete_1.Ng2AutoCompleteModule,
                forms_1.ReactiveFormsModule, forms_1.FormsModule
            ],
            declarations: [app_component_1.AppComponent, menu_component_1.MenuComponent,
                dashboard_component_1.DashBoardComponent,
                quota_declaration_component_1.QuotaDeclarationComponent,
                booking_component_1.BookingComponent,
                viewBooking_component_1.ViewBookinComponent,
                loading_slip_component_1.LoadingSlipComponent,
                errorMessage_1.ErrorMessage,
                confirm_component_1.ConfirmComponent,
                login_component_1.LoginComponent,
                stockYardMaster_1.StockYardMaster,
                contextMenu_component_1.ContextMenuComponent,
                viewBooking_component_1.ViewParticularBooking,
                view_loading_slips_component_1.ViewLoadingComponent,
                delivery_slip_confirmation_component_1.DeliverySlipConfComponent,
                mastersettings_component_1.MasterSettingsComponent,
                organization_component_1.OrganizationComponent,
                market_trend_component_1.MarketTrendComponent,
                onlyNumber_directive_1.OnlyNumber,
                stock_component_1.StockDetailsComponent,
                productSpecification_component_1.ProductSpecificationMaster,
                loading_configurator_component_1.LoadingConfiguratorComponent,
                loading_quota_component_1.LoadingQuotaComponent,
                bookingMenuComponent_1.BookingMenuComponent,
                loadingMenuComponent_1.LoadingMenuComponent,
                view_inOut_loading_slip_component_1.ViewInOutLoadingComponent,
                help_component_1.HelpComponent,
                view_loading_quota_component_1.ViewLoadingQuota
            ],
            providers: [
                { provide: common_1.APP_BASE_HREF, useValue: '/' },
                quota_declaration_service_1.QuotaDeclarationService,
                common_services_1.CommonServices,
                agents_services_1.AgentsServices,
                booking_service_1.bookingServices,
                confirm_service_1.ConfirmService,
                loading_service_1.LoadingServices,
                auth_guard_1.AuthGuard,
                login_services_1.AuthenticationService,
                stockYardService_1.stockYardService,
                contextMenu_service_1.ContextMenuService,
                market_trend_service_1.MarketTrendServices,
                sharedService_1.sharedService,
                stock_services_1.StockDetailsServices,
                productSpecificationService_1.productSpecService,
                loading_configurator_service_1.LoadingConfiguratorService
            ],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map
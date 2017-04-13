"use strict";
var dashboard_component_1 = require("app/dashboard/component/dashboard.component");
var quota_declaration_component_1 = require("app/quota_declaration/component/quota_declaration.component");
var booking_component_1 = require("app/booking/component/booking.component");
var viewBooking_component_1 = require("app/booking/component/viewBooking.component");
var loading_slip_component_1 = require("app/loading_slip/component/loading_slip.component");
var loading_quota_component_1 = require("app/loading_slip/component/loading_quota.component");
var auth_guard_1 = require("./gaurds/auth.guard");
var login_component_1 = require("./login/login.component");
var view_loading_slips_component_1 = require("./loading_slip/component/view_loading_slips.component");
var delivery_slip_confirmation_component_1 = require("./loading_slip/component/delivery_slip_confirmation.component");
var myGlobalVal = require("app/global");
var stockYardMaster_1 = require("app/Masters/component/stockYardMaster");
var mastersettings_component_1 = require("app/Masters/component/mastersettings.component");
var organization_component_1 = require("app/Masters/component/organization.component");
var market_trend_component_1 = require("app/market_trend/component/market_trend.component");
var stock_component_1 = require("app/stock_details/components/stock_component");
var loading_configurator_component_1 = require("app/Masters/component/loading_configurator.component");
var productSpecification_component_1 = require("app/Masters/component/productSpecification.component");
var bookingMenuComponent_1 = require("app/booking/component/bookingMenuComponent");
var loadingMenuComponent_1 = require("app/loading_slip/component/loadingMenuComponent");
var view_inOut_loading_slip_component_1 = require("app/loading_slip/component/view_inOut_loading_slip.component");
var help_component_1 = require("app/help/component/help.component");
var view_loading_quota_component_1 = require("app/loading_slip/component/view_loading_quota.component");
exports.routeConfig = [
    { path: '', component: dashboard_component_1.DashBoardComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'Dashboard', component: dashboard_component_1.DashBoardComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'QuotaDeclaration', component: quota_declaration_component_1.QuotaDeclarationComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'NewBooking', component: booking_component_1.BookingComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'ViewBooking', component: viewBooking_component_1.ViewBookinComponent, data: [{ ScreenName: myGlobalVal.ScreenName.ViewBooking }], canActivate: [auth_guard_1.AuthGuard] },
    { path: 'NewLoadingSlips', component: loading_slip_component_1.LoadingSlipComponent },
    { path: 'BookingConfirmation', component: viewBooking_component_1.ViewBookinComponent, data: [{ ScreenName: myGlobalVal.ScreenName.BookingConfirmation }], canActivate: [auth_guard_1.AuthGuard] },
    { path: 'BookingConfirmationByCnF', component: viewBooking_component_1.ViewBookinComponent, data: [{ ScreenName: myGlobalVal.ScreenName.BookingConfirmationByCnF }], canActivate: [auth_guard_1.AuthGuard] },
    { path: 'MasterSetting', component: mastersettings_component_1.MasterSettingsComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'ViewParticularBooking', component: viewBooking_component_1.ViewParticularBooking, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'EditBooking', component: booking_component_1.BookingComponent },
    { path: 'Login', component: login_component_1.LoginComponent, data: {
            hideTopbar: true,
            hideSidebar: true
        } },
    { path: 'DeliverySlipConfirmation', component: delivery_slip_confirmation_component_1.DeliverySlipConfComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'StockYard', component: stockYardMaster_1.StockYardMaster, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'ViewLoadingSlip', component: view_loading_slips_component_1.ViewLoadingComponent, data: [{ ScreenName: myGlobalVal.ScreenName.LOADINGSLIP }], canActivate: [auth_guard_1.AuthGuard] },
    { path: 'DeliverySlipConfirmation', component: delivery_slip_confirmation_component_1.DeliverySlipConfComponent },
    { path: 'MarketTrend', component: market_trend_component_1.MarketTrendComponent },
    { path: 'LoadingSlipApproval', component: view_loading_slips_component_1.ViewLoadingComponent, data: [{ ScreenName: myGlobalVal.ScreenName.DELIVERY }], canActivate: [auth_guard_1.AuthGuard] },
    { path: 'CnfAgent', component: organization_component_1.OrganizationComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'StockUpdate', component: stock_component_1.StockDetailsComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'ProductSpecification', component: productSpecification_component_1.ProductSpecificationMaster, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'LoadingQuotaConfigurator', component: loading_configurator_component_1.LoadingConfiguratorComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'LoadingQuota', component: loading_quota_component_1.LoadingQuotaComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'Booking', component: bookingMenuComponent_1.BookingMenuComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'LoadingSlips', component: loadingMenuComponent_1.LoadingMenuComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'GetIn', component: view_inOut_loading_slip_component_1.ViewInOutLoadingComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'Help', component: help_component_1.HelpComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'Feedback', component: help_component_1.HelpComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'ViewLoadingQuota', component: view_loading_quota_component_1.ViewLoadingQuota, canActivate: [auth_guard_1.AuthGuard] },
];
//# sourceMappingURL=app.routes.js.map
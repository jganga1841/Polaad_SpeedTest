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
var common_services_1 = require('app/common/services/common.services');
var common_Information_1 = require('app/common/model/common_Information');
var confirm_service_1 = require('app/error/confirm.service');
var market_trend_service_1 = require('../service/market_trend_service');
var errorMessage_1 = require('app/error/errorMessage');
var myGlobalVal = require('app/global');
var market_trend_information_1 = require('../model/market_trend_information');
var login_services_1 = require('app/login/login.services');
var sharedService_1 = require('app/common/services/sharedService');
var router_1 = require('@angular/router');
var MarketTrendComponent = (function () {
    function MarketTrendComponent(ss, commonServices, marketTrendServices, _confirmService, loginService, route, router) {
        this.ss = ss;
        this.commonServices = commonServices;
        this.marketTrendServices = marketTrendServices;
        this._confirmService = _confirmService;
        this.loginService = loginService;
        this.route = route;
        this.router = router;
        this.competitorQuotaList = [];
        this.dealerList = [];
        this.marketTrendList = [];
        this.marketTrendTO = {};
        this.competitorTO = {};
        this.dealerTO = {};
        this.competitorUpdatesTOList = [];
        // ScreenName : string
        this.headMessage = "";
        this.panelheading = "";
        this.isByCF = false;
        this.isByMarketingPerson = false;
        this.isByDirector = false;
        this.isShowForCnF = false;
        this.isDisplayView = false;
        this.marketTrendClass = "active";
        this.fromDate = (new Date(new Date("YYYY-MM-DD").setDate(new Date("YYYY-MM-DD").getDate() - 7)));
        this.toDate = new Date("YYYY-MM-DD");
        this.ignoredFirstEvent = false;
        this.initvalue = this.fromDate;
    }
    MarketTrendComponent.prototype.ngOnInit = function () {
        componentHandler.upgradeDom();
        this.userTO = this.loginService.getUserTOFromLocalStorage();
        //this.viewMarketTrendCall();
        this.marketTrendUpdateCall();
        this.dealerTO = 0;
        if (this.userTO.UserRoleList[0].RoleId == myGlobalVal.UserRole.C_AND_F_AGENT || this.userTO.UserRoleList[0].RoleId == myGlobalVal.UserRole.LOADING_PERSON) {
            this.isDisplayView = false;
            this.ss.hideLoader();
            this.marketTrendClass = "active";
        }
        else {
            this.marketTrendClass = "inactive";
            this.isDisplayView = true;
            this.viewMarketTrendCall();
            this.ss.hideLoader();
        }
    };
    MarketTrendComponent.prototype.marketTrendUpdateCall = function () {
        this.ss.showLoader();
        this.getCompetitorList(3 /* COMPETITORID */);
        this.getDealerList(2 /* DEALERTYPEID */);
        this.dealerTO = new common_Information_1.CommonInformation();
        this.marketTrendTO = new market_trend_information_1.CompetitorUpdatesTOList();
        this.marketTrendList = [];
        this.competitorTO = this.competitorQuotaList[1];
    };
    MarketTrendComponent.prototype.viewMarketTrendCall = function () {
        this.ss.showLoader();
        this.getMarketUpdate(this.fromDate.toString(), this.toDate.toString());
        this.competitorTO = new common_Information_1.CommonInformation();
    };
    MarketTrendComponent.prototype.getCompetitorList = function (OrgTypeId) {
        var _this = this;
        this.competitorQuotaList = [];
        this.commonServices.getOrgList(OrgTypeId)
            .subscribe(function (commonInfoList) { return _this.competitorQuotaList = commonInfoList; }, function (err) {
            // Log errors if any
            console.log(err);
        });
        // return this.commonInfoList;
    };
    MarketTrendComponent.prototype.getDealerList = function (OrgTypeId) {
        var _this = this;
        this.competitorQuotaList = [];
        this.commonServices.getOrgList(OrgTypeId)
            .subscribe(function (commonInfoList) {
            _this.dealerList = commonInfoList,
                _this.ss.hideLoader();
        }, function (err) {
            _this.ss.hideLoader();
            // Log errors if any
            console.log(err);
        });
        // return this.commonInfoList;
    };
    MarketTrendComponent.prototype.addMarketTrend = function (marketTrendTO, competitorTO, dealerTO) {
        // if(marketTrendTO.Price==undefined)
        // {
        //     return ;
        // }
        this.marketTrendList.push({
            'FirmName': competitorTO.Text,
            'Price': marketTrendTO.Price,
            'DealerName': dealerTO.Text,
            'DealerId': dealerTO.Value,
            'CompetitorExtId': competitorTO.Value
        });
        this.marketTrendTO = new market_trend_information_1.CompetitorUpdatesTOList();
    };
    MarketTrendComponent.prototype.showConfirmDialog = function () {
        var _this = this;
        var warningmsg;
        warningmsg = "Do You Want To Update The Market Trend?";
        this._confirmService.activate(warningmsg, "Confirmation")
            .then(function (res) {
            if (res) {
                _this.postMarketTrend();
            }
            else {
            }
        });
        return false;
    };
    MarketTrendComponent.prototype.postMarketTrend = function () {
        var _this = this;
        var MarketTrendOperation;
        //   if(this.isByCF)
        //   {
        //     this.marketTrendTO.StatusId=myGlobalVal.MarketTrendStatus.MarketTrenByCF;
        //     this.marketTrendTO.TranStatusE=myGlobalVal.MarketTrendStatus.MarketTrenByCF;
        //   }
        //   else if(this.isByMarketingPerson)
        //   {
        //        this.marketTrendTO.StatusId=myGlobalVal.MarketTrendStatus.MarketTrenByMarketingPerson;
        //     this.marketTrendTO.TranStatusE=myGlobalVal.MarketTrendStatus.MarketTrenByMarketingPerson;
        //   }
        this.loginUserId = this.userTO.IdUser;
        MarketTrendOperation = this.marketTrendServices.addMarketTrendUpdate(this.marketTrendList, this.loginUserId);
        MarketTrendOperation.subscribe(function (result) {
            if (result.Result == 1 || result.MessageType == myGlobalVal.ResultMessageE.Information) {
                _this.errorMsg.showErrorMessage("Market Trend Confirmed Successfully", "Information");
                _this.marketTrendList = [];
            }
            else
                _this.errorMsg.showErrorMessage("Market Trend Not Confirmed ", "Error");
        }, function (err) { });
    };
    MarketTrendComponent.prototype.getMarketUpdate = function (fromDate, toDate) {
        var _this = this;
        // Bind User List
        if (this.ignoredFirstEvent || this.initvalue === undefined) {
            this.marketTrendServices.getMarketUpdate(fromDate, toDate)
                .subscribe(function (competitorUpdatesTOList) {
                _this.competitorUpdatesTOList = competitorUpdatesTOList,
                    _this.ss.hideLoader();
            }, function (err) {
                _this.ss.hideLoader();
                // Log errors if any
                console.log(err);
            });
        }
        this.ignoredFirstEvent = true;
        // return this.commonInfoList;
    };
    MarketTrendComponent.prototype.backquota = function () {
        this.router.navigate(['\QuotaDeclaration']);
    };
    __decorate([
        core_1.ViewChild(errorMessage_1.ErrorMessage), 
        __metadata('design:type', errorMessage_1.ErrorMessage)
    ], MarketTrendComponent.prototype, "errorMsg", void 0);
    MarketTrendComponent = __decorate([
        core_1.Component({
            selector: 'my-market-trend',
            // template:'<h1>Hello</h1>'
            templateUrl: 'app/market_trend/market_trend.html'
        }), 
        __metadata('design:paramtypes', [sharedService_1.sharedService, common_services_1.CommonServices, market_trend_service_1.MarketTrendServices, confirm_service_1.ConfirmService, login_services_1.AuthenticationService, router_1.ActivatedRoute, router_1.Router])
    ], MarketTrendComponent);
    return MarketTrendComponent;
}());
exports.MarketTrendComponent = MarketTrendComponent;
//# sourceMappingURL=market_trend.component.js.map
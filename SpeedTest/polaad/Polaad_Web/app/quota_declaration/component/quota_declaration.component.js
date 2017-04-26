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
var core_1 = require("@angular/core");
var quota_declaration_service_1 = require("../services/quota_declaration_service");
var firm_information_1 = require("app/quota_declaration/model/firm_information");
var firm_information_2 = require("app/quota_declaration/model/firm_information");
var confirm_service_1 = require("app/error/confirm.service");
var errorMessage_1 = require("app/error/errorMessage");
var common_services_1 = require("app/common/services/common.services");
var sharedService_1 = require("app/common/services/sharedService");
var router_1 = require("@angular/router");
var QuotaDeclarationComponent = (function () {
    function QuotaDeclarationComponent(ss, quotaDeclarationService, _confirmService, commonServices, route, router) {
        this.ss = ss;
        this.quotaDeclarationService = quotaDeclarationService;
        this._confirmService = _confirmService;
        this.commonServices = commonServices;
        this.route = route;
        this.router = router;
        this.toDate = new Date();
        this.fromDate = (new Date(new Date().setDate(new Date().getDate() - 7)));
        this.ignoredFirstEvent = false;
        this.competicompetitor = new firm_information_2.CompetitorTO();
        this.model = new firm_information_1.OrganizationTO();
        this.isOther = false;
        this.rateBand = 0;
        this.isQuotaGreater = false;
        this.sum = 0;
        this.total = 0;
        this.initvalue = this.fromDate;
    }
    QuotaDeclarationComponent.prototype.getCompanyQuotaList = function (fromDate, toDate) {
        var _this = this;
        // Bind User List
        if (this.ignoredFirstEvent || this.initvalue === undefined) {
            this.quotaDeclarationService.getCompanyQuotaList(fromDate, toDate)
                .subscribe(function (companyQuotaList) { return _this.companyQuotaList = companyQuotaList; }, function (err) {
                // Log errors if any
                _this.ss.hideLoader();
                console.log(err);
            });
        }
        this.ignoredFirstEvent = true;
    };
    QuotaDeclarationComponent.prototype.ngOnInit = function () {
        componentHandler.upgradeDom();
        this.rateReasonList = [];
        this.competicompetitor = new firm_information_2.CompetitorTO();
        this.competitorQuotaList = [];
        this.callPriceHistoryTab();
    };
    QuotaDeclarationComponent.prototype.callPriceHistoryTab = function () {
        this.ss.showLoader();
        this.getCompanyQuotaList(this.fromDate.toString(), this.toDate.toString());
        this.getCompetitorQuotaList();
    };
    QuotaDeclarationComponent.prototype.callRateAnnouncementTab = function () {
        this.ss.showLoader();
        this.getCFQuotaList();
        this.getRateReason();
        this.validDurationLst = this.commonServices.getQuotaValidDurationList();
    };
    //service to call competitorList and bind to view
    QuotaDeclarationComponent.prototype.getCompetitorQuotaList = function () {
        var _this = this;
        // Bind User List
        this.quotaDeclarationService.getCompetitorQuotaList()
            .subscribe(function (competitorQuotaList) {
            _this.competitorQuotaList = competitorQuotaList,
                _this.ss.hideLoader();
        }, function (err) {
            // Log errors if any
            console.log(err);
            _this.ss.hideLoader();
        });
    };
    QuotaDeclarationComponent.prototype.getCFQuotaList = function () {
        var _this = this;
        // Bind User List
        this.quotaDeclarationService.getCFQuotaList()
            .subscribe(function (CfQuotaList) {
            _this.CfQuotaList = CfQuotaList;
            _this.declaredRate = CfQuotaList[0].DeclaredRate,
                _this.sum = 0;
            _this.CfQuotaList.forEach(function (s) {
                _this.sum = +_this.sum + +s.LastAllocQty;
            });
            _this.totalAllocatedQty = _this.sum;
            _this.ss.hideLoader();
        }, 
        //    CfQuotaList => this.CfQuotaList = CfQuotaList, //Bind to view
        function (err) {
            // Log errors if any
            console.log(err);
            _this.ss.hideLoader();
        });
    };
    QuotaDeclarationComponent.prototype.showConfirmDialog = function () {
        var _this = this;
        this._confirmService.activate("Are you sure to this announce Quota?", "Confirmation")
            .then(function (res) {
            if (res) {
                _this.ss.showLoader();
                _this.announceRate();
            }
            else {
            }
        });
    };
    QuotaDeclarationComponent.prototype.announceRate = function () {
        var _this = this;
        if (localStorage.getItem("currentUser") != null) {
            this.userTO = JSON.parse(localStorage.getItem("currentUser"));
            this.loginUserId = this.userTO.IdUser;
        }
        // Variable to hold a reference of addComment/updateComment
        var announceRateperation;
        // Create a new comment
        announceRateperation = this.quotaDeclarationService.announceQuota(this.loginUserId, this.CfQuotaList, this.declaredRate, this.comments, this.rateReason.Value, this.rateReason.Text);
        // Subscribe to observable
        announceRateperation.subscribe(function (announceRate) {
            if (announceRate.Result == 1) {
                _this.ss.hideLoader();
                _this.errorMsg.showErrorMessage("Quota and Rate Band announce Successfully", "Information");
            }
            else {
                _this.ss.hideLoader();
                _this.errorMsg.showErrorMessage("Quota and Rate not announce.", "Error");
            }
        }, function (err) {
            _this.ss.hideLoader();
            // Log errors if any
            console.log(err);
        });
    };
    //GJ[20170209] : get Company today's quota
    QuotaDeclarationComponent.prototype.getRateReason = function () {
        var _this = this;
        this.commonServices.getRateReason().subscribe(function (p) {
            _this.rateReasonList = p;
            _this.ss.hideLoader();
        }, function (err) {
            console.log(err);
            _this.ss.hideLoader();
        }),
            function () {
                console.log("Done");
                _this.ss.hideLoader();
                //return this.companyQuotInfo;
            };
    };
    QuotaDeclarationComponent.prototype.onddlRateChage = function () {
        if (this.rateReason.Text == "Other") {
            this.isOther = true;
            this.comments = "";
        }
        else {
            this.isOther = false;
            this.comments = this.rateReason.Text;
        }
    };
    QuotaDeclarationComponent.prototype.selectOnClick = function ($event) {
        $event.target.select();
    };
    QuotaDeclarationComponent.prototype.calculateTotal = function (CfQuotaList) {
        var _this = this;
        this.sum = 0;
        CfQuotaList.forEach(function (s) { return _this.sum = +_this.sum + +s.LastAllocQty; });
        this.totalAllocatedQty = this.sum;
    };
    QuotaDeclarationComponent.prototype.checkNumber = function ($event) {
        this.rateBand = $event.target.value;
        if (this.rateBand > 499) {
            this.errorMsg.showErrorMessage("Rate Band must be less than 500", "Warning");
            $event.target.value = null;
            this.isQuotaGreater = true;
        }
    };
    QuotaDeclarationComponent.prototype.backMarketTrend = function () {
        this.router.navigate(['\MarketTrend']);
    };
    return QuotaDeclarationComponent;
}());
__decorate([
    core_1.ViewChild(errorMessage_1.ErrorMessage),
    __metadata("design:type", errorMessage_1.ErrorMessage)
], QuotaDeclarationComponent.prototype, "errorMsg", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], QuotaDeclarationComponent.prototype, "listId", void 0);
QuotaDeclarationComponent = __decorate([
    core_1.Component({
        selector: 'my-quota',
        templateUrl: 'app/quota_declaration/quota_declaration.html'
    }),
    __metadata("design:paramtypes", [sharedService_1.sharedService,
        quota_declaration_service_1.QuotaDeclarationService,
        confirm_service_1.ConfirmService,
        common_services_1.CommonServices, typeof (_a = typeof router_1.ActivatedRoute !== "undefined" && router_1.ActivatedRoute) === "function" && _a || Object, typeof (_b = typeof router_1.Router !== "undefined" && router_1.Router) === "function" && _b || Object])
], QuotaDeclarationComponent);
exports.QuotaDeclarationComponent = QuotaDeclarationComponent;
var _a, _b;
//# sourceMappingURL=quota_declaration.component.js.map
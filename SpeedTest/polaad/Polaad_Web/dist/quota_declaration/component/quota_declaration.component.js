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
var QuotaDeclarationComponent = (function () {
    function QuotaDeclarationComponent(quotaDeclarationService) {
        this.quotaDeclarationService = quotaDeclarationService;
        this.newItem = {
            EndTime: Date,
            StartTime: Date
        };
        this.competicompetitor = new firm_information_2.CompetitorTO();
        this.model = new firm_information_1.OrganizationTO();
    }
    QuotaDeclarationComponent.prototype.getCompanyQuotaList = function () {
        var _this = this;
        // Bind User List
        this.quotaDeclarationService.getCompanyQuotaList()
            .subscribe(function (companyQuotaList) { return _this.companyQuotaList = companyQuotaList; }, //Bind to view
        function (//Bind to view
            err) {
            // Log errors if any
            console.log(err);
        });
    };
    //GJ[20170209] : get Company today's quota
    QuotaDeclarationComponent.prototype.getCompanyRate = function () {
        var _this = this;
        this.quotaDeclarationService.getCompanyQuota(3).subscribe(function (p) { return _this.companyQuotInfo = p; }, function (err) { console.log(err); });
        //return this.companyQuotInfo;
    };
    QuotaDeclarationComponent.prototype.ngOnInit = function () {
        // Load comments
        this.getCompanyQuotaList();
        this.quotaDeclarationService.getCompanyQuota(3);
        //this.CfQuotaList :OrganizationTO[];
        this.getCompetitorQuotaList();
        this.getCFQuotaList();
        this.competicompetitor = new firm_information_2.CompetitorTO();
        this.competitorQuotaList = [];
    };
    //service to call competitorList and bind to view
    QuotaDeclarationComponent.prototype.getCompetitorQuotaList = function () {
        var _this = this;
        // Bind User List
        this.quotaDeclarationService.getCompetitorQuotaList()
            .subscribe(function (competitorQuotaList) { return _this.competitorQuotaList = competitorQuotaList; }, //Bind to view
        function (//Bind to view
            err) {
            // Log errors if any
            console.log(err);
        });
    };
    QuotaDeclarationComponent.prototype.getCFQuotaList = function () {
        var _this = this;
        // Bind User List
        this.quotaDeclarationService.getCFQuotaList()
            .subscribe(function (CfQuotaList) { return _this.CfQuotaList = CfQuotaList; }, //Bind to view
        function (//Bind to view
            err) {
            // Log errors if any
            console.log(err);
        });
    };
    QuotaDeclarationComponent.prototype.announceRate = function () {
        // Variable to hold a reference of addComment/updateComment
        var announceRateperation;
        // Create a new comment
        announceRateperation = this.quotaDeclarationService.announceQuota(this.CfQuotaList);
        // Subscribe to observable
        announceRateperation.subscribe(function (announceRate) {
            alert('C&F  Quota Allocated Successfully');
        }, function (err) {
            // Log errors if any
            console.log(err);
        });
    };
    return QuotaDeclarationComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], QuotaDeclarationComponent.prototype, "listId", void 0);
QuotaDeclarationComponent = __decorate([
    core_1.Component({
        selector: 'my-dashboard',
        // template:'<h1>Hello</h1>'
        templateUrl: 'app/quota_declaration/quota_declaration.html'
    }),
    __metadata("design:paramtypes", [quota_declaration_service_1.QuotaDeclarationService])
], QuotaDeclarationComponent);
exports.QuotaDeclarationComponent = QuotaDeclarationComponent;
//# sourceMappingURL=quota_declaration.component.js.map
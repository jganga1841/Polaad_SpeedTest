"use strict";
var CommonFunctions = (function () {
    function CommonFunctions() {
    }
    CommonFunctions.prototype.getMaterialList = function () {
        var _this = this;
        this.commonInfoList = [];
        this.commonServices.getMaterial()
            .subscribe(function (commonInfoList) { return _this.commonInfoList = commonInfoList; }, function (err) {
            // Log errors if any
            console.log(err);
        });
        return this.commonInfoList;
    };
    CommonFunctions.prototype.getOrgList = function (OrgTypeId) {
        var _this = this;
        this.commonInfoList = [];
        this.commonServices.getOrgList(OrgTypeId)
            .subscribe(function (commonInfoList) { return _this.commonInfoList = commonInfoList; }, function (err) {
            // Log errors if any
            console.log(err);
        });
        return this.commonInfoList;
    };
    return CommonFunctions;
}());
exports.CommonFunctions = CommonFunctions;
//# sourceMappingURL=commonFunctions.js.map
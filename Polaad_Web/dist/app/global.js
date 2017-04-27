'use strict';
exports.sep = '/';
//For Windows Azure server
//export const gnBaseURL: string="http://salestrackerapi20170215061336.azurewebsites.net/api/";    
//For Local Test server
exports.gnBaseURL = "http://192.168.0.189:64945/api/";
exports.gnOrderBooking = exports.gnBaseURL + "booking/PostNewBooking";
exports.gnViewBooking = exports.gnBaseURL + "booking/GetPendingBookingList";
exports.gnGetOrgListForDDL = exports.gnBaseURL + "Organization/GetOrganizationDropDownList?orgTypeId=";
exports.gnGetMaterilaForDDL = exports.gnBaseURL + "Material/GetMaterialDropDownList";
exports.gnGetRateDeclartionHist = exports.gnBaseURL + "QuotaAndRate/GetRateDeclarationHistory";
exports.gnGetOrgList = exports.gnBaseURL + "Organization/GetOrganizationList?orgTypeId=";
exports.gnGetOrgAddrInfo = exports.gnBaseURL + "Address/GetOrgAddressDetails?orgId=";
exports.gnGetPendingBookingList = exports.gnBaseURL + "Booking/GetPendingBookingList?dealerId=";
exports.gnGetTodayQuotaAndRateInfo = exports.gnBaseURL + "QuotaAndRate/GetLatestQuotaAndRateInfo?cnfId=";
exports.gnLoadingSlip = exports.gnBaseURL + "";
exports.gnAnnounceRateAndQuota = exports.gnBaseURL + "QuotaAndRate/AnnounceRateAndQuota";
exports.gnGetDealerBookingHist = exports.gnBaseURL + "Booking/GetDealerBookingHistory?dealerId=";
//# sourceMappingURL=global.js.map
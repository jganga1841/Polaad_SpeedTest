'use strict';
exports.sep = '/';
//For Windows Azure server
exports.gnBaseURL = "http://stapiservice.azurewebsites.net/api/";
//For Local Test server
//export const gnBaseURL: string="http://192.168.0.189:64945/api/";      
//export const gnBaseURL: string="http://localhost:64942/api/";    
exports.gnOrderBooking = exports.gnBaseURL + "booking/PostNewBooking";
exports.gnViewBooking = exports.gnBaseURL + "booking/GetPendingBookingList";
exports.gnGetOrgListForDDL = exports.gnBaseURL + "Organization/GetOrganizationDropDownList?orgTypeId=";
exports.gnGetMaterilaForDDL = exports.gnBaseURL + "Material/GetMaterialDropDownList";
//Quota and Rate Declaration get company quota
exports.gnGetRateDeclartionHist = exports.gnBaseURL + "QuotaAndRate/GetRateDeclarationHistory?fromDate=";
exports.gnGetOrgList = exports.gnBaseURL + "Organization/GetOrganizationList?orgTypeId=";
exports.gnGetOrgAddrInfo = exports.gnBaseURL + "Address/GetOrgAddressDetails?orgId=";
exports.gnGetPendingBookingList = exports.gnBaseURL + "Booking/GetPendingBookingList?dealerId=";
exports.gnGetTodayQuotaAndRateInfo = exports.gnBaseURL + "QuotaAndRate/GetLatestQuotaAndRateInfo?cnfId=";
exports.gnLoadingSlip = exports.gnBaseURL + "";
exports.gnAnnounceRateAndQuota = exports.gnBaseURL + "QuotaAndRate/AnnounceRateAndQuota";
exports.gnGetDealerBookingHist = exports.gnBaseURL + "Booking/GetDealerBookingHistory?dealerId=";
exports.gnNewLoadingSlip = exports.gnBaseURL + "LoadSlip/PostNewLoadingSlip";
//[27/02/2017]Vijaymala added to get booking list beyond quota and rate band for director confirmation
exports.gnViewConfirmationBooking = exports.gnBaseURL + "booking/GetPendingBookingsForApproval";
exports.gnBookingConfirmation = exports.gnBaseURL + "booking/PostBookingAcceptance";
exports.gnAddStockYard = exports.gnBaseURL + "Masters/AddNewStockYard";
exports.gnLoginApi = exports.gnBaseURL + "User/PostLogin";
exports.gnLogoutApi = exports.gnBaseURL + "User/PostLogout";
exports.gnGetStockYard = exports.gnBaseURL + "Masters/GetStockYardList";
exports.gnBookingListById = exports.gnBaseURL + "booking/GetBookingDetails";
//[28/02/2017]Vijaymala added to get booking list beyond quota and rate band for c&f confirmation
exports.gnViewConfirmationBookingByCF = exports.gnBaseURL + "Booking/GetPendingBookingsForAcceptance";
exports.gnGetLoadingSlipList = exports.gnBaseURL + "LoadSlip/GetAllPendingLoadingList?cnfId=";
//[06/03/2017]Vijaymala added to call service to delete booking order
exports.gnDeleteBookingOrder = exports.gnBaseURL + "booking/PostBookingAcceptance?cnfId​=";
exports.gnEditOrderBooking = exports.gnBaseURL + "booking/PostBookingUpdate";
exports.gnLoadingToById = exports.gnBaseURL + "LoadSlip/GetLoadingslipDetails?loadingId=";
exports.gnDeliveryAddrList = exports.gnBaseURL + "Booking/GetBookingAddressDetails?bookingId=";
//[07/03/2017]Vijaymala added to get booking status list
exports.gnGetBookingStatus = exports.gnBaseURL + "Masters/GetStatusListForDropDown";
exports.gnGetAllBooking = exports.gnBaseURL + "booking/GetAllBookingList";
//[GJ]@20170307 : To get the Dealer list againest C&F
exports.gnDealerList = exports.gnBaseURL + "Organization/GetDealerDropDownList?cnfId=";
/*[GJ]@20170307 : Added the Url for the Loading Status*/
exports.gnGetStatusReasons = exports.gnBaseURL + "LoadSlip/GetLoadStsReasonsForDropDown?statusId=";
exports.gnPostStatusWithReason = exports.gnBaseURL + "LoadSlip/PostDeliverySlipConfirmations";
//[08/03/2017]Vijaymala added to getQuota Rate reason List
exports.gnGetReasonList = exports.gnBaseURL + "QuotaAndRate/GetRateReasonsForDropDown";
//[23/03/2017]Vijaya added to post market trend list
exports.gnPostMarketTrend = exports.gnBaseURL + "Competitor/PostMarketUpdate";
exports.gnGetMarketUpdate = exports.gnBaseURL + "Competitor/GetMarketUpdate?fromDate=";
//[17/03/2017]Vijaya added to get cdStructure list,delivery period list,district list
exports.gnGetCdStructureList = exports.gnBaseURL + "Masters/GetCDStructureForDropDown";
exports.gnGetDeliveryPeriodList = exports.gnBaseURL + "Masters/GetDeliveryPeriodForDropDown";
exports.gnGetDistrictList = exports.gnBaseURL + "Masters/GetDistrictForDropDown";
//[17/03/2017]Vijaya added to post close booking
exports.gnPostBookingClosure = exports.gnBaseURL + "booking/PostBookingClosure";
//[17/03/2017]Vijaya added to post close booking
exports.gnGetBookinOpenCloseInfo = exports.gnBaseURL + "booking/GetBookinOpenCloseInfo";
exports.gnIpInfo = "http://ipinfo.io/json";
exports.gnLocationList = exports.gnBaseURL + "Stock/GetStockLocationsForDropDown";
exports.gnCompartmentList = exports.gnBaseURL + "Stock/GetCompartmentsForDropDown?locationId=";
exports.gnMaterialTypeList = exports.gnBaseURL + "Stock/GetProdCategoryForDropDown";
exports.gnStockMatAndSpecList = exports.gnBaseURL + "Stock/GetMateAndSpecsList?locationId=";
exports.gnPostMateAndSpecsList = exports.gnBaseURL + "Stock/PostDailyStockUpdate";
exports.gnLoadingConfiguratorList = exports.gnBaseURL + "LoadSlip/GetCnfLoadingCofiguration?prodSpecId=";
exports.gnPostLoadingQuotaConfig = exports.gnBaseURL + "LoadSlip/PostLoadingConfiguration";
//[17/03/2017]Vijaya added to post Product Specification
exports.gnAddProductSpec = exports.gnBaseURL + "Material/PostProductInformation";
exports.gnGetProductSpecList = exports.gnBaseURL + "Material/GetProductAndSpecsList?prodCatId=";
exports.gnGetStockSummaryDetails = exports.gnBaseURL + "Stock/GetStockSummaryDetails?stockDate=";
exports.gnGetLoadingQuota = exports.gnBaseURL + "LoadSlip/GetCnfLoadingQuotaDeclaration?prodSpecId=";
exports.gnIsLoadingQuotaDeclaredToday = exports.gnBaseURL + "LoadSlip/IsLoadingQuotaDeclaredToday";
//[23/03/2017]Vijaya added to post stock summarylist
exports.gnPostStockSummaryConfirmation = exports.gnBaseURL + "Stock/PostStockSummaryConfirmation";
exports.gnPostRunningSizeList = exports.gnBaseURL + "Stock/PostDailyRunningSize";
exports.gnPostLoadingQuotaDeclaration = exports.gnBaseURL + "LoadSlip/PostLoadingQuotaDeclaration";
exports.gnMaterialSpecList = exports.gnBaseURL + "Stock/GetProdSepcificationsForDropDown";
exports.gnGetStockSummaryAgainestCatSpec = exports.gnBaseURL + "Stock/GetStockDtlsByCategAndSpecs?prodSpecId=";
exports.gnIsLoadingQuotaConfirmed = exports.gnBaseURL + "Stock/IsStockUpdateConfirmed";
exports.gnGetLoadingSlipExtList = exports.gnBaseURL + "LoadSlip/GetEmptySizeAndProdLstForNewLoading?boookingId=";
exports.gnGetBookingMaterialExtList = exports.gnBaseURL + "Booking/GetEmptySizeAndProductListForBooking";
//Sanjay [2017-03-27] For All dimension of Country,States and Taluka
exports.gnGetCountryListForDDL = exports.gnBaseURL + "Masters/GetCountriesForDropDown";
exports.gnGetStateListForDDL = exports.gnBaseURL + "Masters/GetStatesForDropDown?countryId=";
exports.gnGetTalukaListForDDL = exports.gnBaseURL + "Masters/GetTalukasForDropDown?districtId=";
//Vijaylala[30-03-2017]For gettting Confirmed loading details 
exports.getInOutloadingSlipList = exports.gnBaseURL + "LoadSlip/GetLoadingSlipsByStatus?statusId=";
exports.gnGetCnfDecLoadingQuota = exports.gnBaseURL + "LoadSlip/GetAvailableLoadingQuotaForCnf?cnfId=";
exports.gnGetDatewiseRunningSizeDtls = exports.gnBaseURL + "Stock/GetDatewiseRunningSizeDtls?stockDate=";
exports.gnGetAllPendingLoadingList = exports.gnBaseURL + "LoadSlip/GetAllPendingLoadingList?cnfId=";
exports.gnGetSuperwisorListForDropDown = exports.gnBaseURL + "LoadSlip/GetSuperwisorListForDropDown";
exports.gnPostAllocateSupervisor = exports.gnBaseURL + "LoadSlip/PostLoadingSuperwisorDtl";
exports.gnGetLastUpdatedStockDate = exports.gnBaseURL + "Stock/GetLastUpdatedStockDate?compartmentId=";
exports.gnIsDeclaredTodayLoadingQuota = exports.gnBaseURL + "LoadSlip/IsLoadingQuotaDeclaredForTheDate";
exports.gnGetVehicleNumberList = exports.gnBaseURL + "LoadSlip/GetVehicleNumberList";
exports.gnGetParityDetails = exports.gnBaseURL + "Material/GetParityDetails";
exports.gnSetParityDetails = exports.gnBaseURL + "Material/PostParityDetails";
exports.gnGetBookingStatusHistory = exports.gnBaseURL + "Booking/GetBookingStatusHistory";
var loadingSequenceName;
(function (loadingSequenceName) {
    loadingSequenceName[loadingSequenceName["BOTTOM"] = "Bottom"] = "BOTTOM";
    loadingSequenceName[loadingSequenceName["MIDDLE1"] = "Middle1"] = "MIDDLE1";
    loadingSequenceName[loadingSequenceName["MIDDLE2"] = "Middle2"] = "MIDDLE2";
    loadingSequenceName[loadingSequenceName["MIDDLE3"] = "Middle3"] = "MIDDLE3";
    loadingSequenceName[loadingSequenceName["TOP"] = "Top"] = "TOP";
})(loadingSequenceName = exports.loadingSequenceName || (exports.loadingSequenceName = {}));
var ScreenName;
(function (ScreenName) {
    ScreenName[ScreenName["LOADINGSLIP"] = "LoadingSlip"] = "LOADINGSLIP";
    ScreenName[ScreenName["DELIVERY"] = "Delivery"] = "DELIVERY";
    ScreenName[ScreenName["ViewBooking"] = "ViewBooking"] = "ViewBooking";
    ScreenName[ScreenName["BookingConfirmation"] = "BookingConfirmation"] = "BookingConfirmation";
    ScreenName[ScreenName["BookingConfirmationByCnF"] = "BookingConfirmationByCnF"] = "BookingConfirmationByCnF";
})(ScreenName = exports.ScreenName || (exports.ScreenName = {}));
/*[GJ]@20170307 : Added the enum for the Loading Status*/
var LoadingStatus;
(function (LoadingStatus) {
    LoadingStatus[LoadingStatus["LOADING_NEW"] = 4] = "LOADING_NEW";
    LoadingStatus[LoadingStatus["LOADING_NOT_CONFIRM"] = 5] = "LOADING_NOT_CONFIRM";
    LoadingStatus[LoadingStatus["LOADING_WAITING"] = 6] = "LOADING_WAITING";
    LoadingStatus[LoadingStatus["LOADING_CONFIRM"] = 7] = "LOADING_CONFIRM";
    LoadingStatus[LoadingStatus["LOADING_REPORTED_FOR_LOADING"] = 14] = "LOADING_REPORTED_FOR_LOADING";
    LoadingStatus[LoadingStatus["LOADING_GATE_IN"] = 15] = "LOADING_GATE_IN";
    LoadingStatus[LoadingStatus["LOADING_COMPLETED"] = 16] = "LOADING_COMPLETED";
    LoadingStatus[LoadingStatus["DELIVERED"] = 17] = "DELIVERED";
    LoadingStatus[LoadingStatus["LOADING_CANCEL"] = 18] = "LOADING_CANCEL";
})(LoadingStatus = exports.LoadingStatus || (exports.LoadingStatus = {}));
/*[Vijaymala]@2017/03/11 : Added the enum for the Market Trend Status*/
var MarketTrendStatus;
(function (MarketTrendStatus) {
    MarketTrendStatus[MarketTrendStatus["MarketTrenByCF"] = 4] = "MarketTrenByCF";
    MarketTrendStatus[MarketTrendStatus["MarketTrenByMarketingPerson"] = 5] = "MarketTrenByMarketingPerson";
})(MarketTrendStatus = exports.MarketTrendStatus || (exports.MarketTrendStatus = {}));
/*[Vijaymala]@2017/03/17 : Added the enum for the Role*/
var UserRole;
(function (UserRole) {
    UserRole[UserRole["SYSTEM_ADMIN"] = 1] = "SYSTEM_ADMIN";
    UserRole[UserRole["DIRECTOR"] = 2] = "DIRECTOR";
    UserRole[UserRole["C_AND_F_AGENT"] = 3] = "C_AND_F_AGENT";
    UserRole[UserRole["LOADING_PERSON"] = 4] = "LOADING_PERSON";
    UserRole[UserRole["MARKETING_FRONTIER"] = 5] = "MARKETING_FRONTIER";
    UserRole[UserRole["MARKETING_BACK_OFFICE"] = 6] = "MARKETING_BACK_OFFICE";
    UserRole[UserRole["FIELD_OFFICER"] = 7] = "FIELD_OFFICER";
    UserRole[UserRole["REGIONAL_MANAGER"] = 8] = "REGIONAL_MANAGER";
    UserRole[UserRole["VICE_PRESIDENT_MARKETING"] = 9] = "VICE_PRESIDENT_MARKETING";
})(UserRole = exports.UserRole || (exports.UserRole = {}));
/*[Vijaymala]@2017/03/22 : Added the enum for the MEssageTypeE*/
var ResultMessageE;
(function (ResultMessageE) {
    ResultMessageE[ResultMessageE["None"] = 0] = "None";
    ResultMessageE[ResultMessageE["Information"] = 1] = "Information";
    ResultMessageE[ResultMessageE["Error"] = 2] = "Error";
})(ResultMessageE = exports.ResultMessageE || (exports.ResultMessageE = {}));
var ProductCatE;
(function (ProductCatE) {
    ProductCatE[ProductCatE["TMT"] = 1] = "TMT";
    ProductCatE[ProductCatE["Plain"] = 2] = "Plain";
})(ProductCatE = exports.ProductCatE || (exports.ProductCatE = {}));
var ProductSpecsE;
(function (ProductSpecsE) {
    ProductSpecsE[ProductSpecsE["STRAIGHT"] = "Straight"] = "STRAIGHT";
    ProductSpecsE[ProductSpecsE["BEND"] = "Bend"] = "BEND";
    ProductSpecsE[ProductSpecsE["RKSHORT"] = "RKShort"] = "RKSHORT";
    ProductSpecsE[ProductSpecsE["RKLONG"] = "RKLong"] = "RKLONG";
    ProductSpecsE[ProductSpecsE["TUKADA"] = "Tukada"] = "TUKADA";
    ProductSpecsE[ProductSpecsE["COIL"] = "Coil"] = "COIL";
})(ProductSpecsE = exports.ProductSpecsE || (exports.ProductSpecsE = {}));
var ProductSpecsIdE;
(function (ProductSpecsIdE) {
    ProductSpecsIdE[ProductSpecsIdE["STRAIGHT"] = 1] = "STRAIGHT";
    ProductSpecsIdE[ProductSpecsIdE["BEND"] = 2] = "BEND";
    ProductSpecsIdE[ProductSpecsIdE["RKSHORT"] = 3] = "RKSHORT";
    ProductSpecsIdE[ProductSpecsIdE["RKLONG"] = 4] = "RKLONG";
    ProductSpecsIdE[ProductSpecsIdE["TUKADA"] = 5] = "TUKADA";
    ProductSpecsIdE[ProductSpecsIdE["COIL"] = 6] = "COIL";
})(ProductSpecsIdE = exports.ProductSpecsIdE || (exports.ProductSpecsIdE = {}));
var ColorValidE;
(function (ColorValidE) {
    ColorValidE[ColorValidE["RED"] = "red"] = "RED";
    ColorValidE[ColorValidE["WHITE"] = "white"] = "WHITE";
    ColorValidE[ColorValidE["BLACK"] = "black"] = "BLACK";
    ColorValidE[ColorValidE["GREEN"] = "green"] = "GREEN";
})(ColorValidE = exports.ColorValidE || (exports.ColorValidE = {}));
//# sourceMappingURL=global.js.map
'use strict';


export const sep='/';
//For Windows Azure server
export const gnBaseURL: string="http://stapiservice.azurewebsites.net/api/";    
//For Local Test server

//export const gnBaseURL: string="http://192.168.0.189:64945/api/";      

//export const gnBaseURL: string="http://localhost:64942/api/";    

export const gnOrderBooking = gnBaseURL + "booking/PostNewBooking";
export const gnViewBooking = gnBaseURL + "booking/GetPendingBookingList";
export const gnGetOrgListForDDL = gnBaseURL + "Organization/GetOrganizationDropDownList?orgTypeId=";
export const gnGetMaterilaForDDL = gnBaseURL + "Material/GetMaterialDropDownList";
//Quota and Rate Declaration get company quota
export const gnGetRateDeclartionHist = gnBaseURL + "QuotaAndRate/GetRateDeclarationHistory?fromDate=";

export const gnGetOrgList = gnBaseURL + "Organization/GetOrganizationList?orgTypeId=";
export const gnGetOrgAddrInfo = gnBaseURL + "Address/GetOrgAddressDetails?orgId=";
export const gnGetPendingBookingList = gnBaseURL + "Booking/GetPendingBookingList?dealerId=";
export const gnGetTodayQuotaAndRateInfo = gnBaseURL + "QuotaAndRate/GetLatestQuotaAndRateInfo?cnfId=";
export const gnLoadingSlip = gnBaseURL + "";
export const gnAnnounceRateAndQuota = gnBaseURL + "QuotaAndRate/AnnounceRateAndQuota";
export const gnGetDealerBookingHist = gnBaseURL + "Booking/GetDealerBookingHistory?dealerId=";
export const gnNewLoadingSlip = gnBaseURL + "LoadSlip/PostNewLoadingSlip";
//[27/02/2017]Vijaymala added to get booking list beyond quota and rate band for director confirmation
export const gnViewConfirmationBooking = gnBaseURL + "booking/GetPendingBookingsForApproval";
export const gnBookingConfirmation = gnBaseURL + "booking/PostBookingAcceptance";
export const gnAddStockYard = gnBaseURL + "Masters/AddNewStockYard";
export const gnLoginApi = gnBaseURL + "User/PostLogin";
export const gnLogoutApi = gnBaseURL + "User/PostLogout";

export const gnGetStockYard = gnBaseURL + "Masters/GetStockYardList";
export const gnBookingListById = gnBaseURL + "booking/GetBookingDetails";

//[28/02/2017]Vijaymala added to get booking list beyond quota and rate band for c&f confirmation
export const gnViewConfirmationBookingByCF = gnBaseURL + "Booking/GetPendingBookingsForAcceptance";


export const gnGetLoadingSlipList = gnBaseURL + "LoadSlip/GetAllPendingLoadingList?cnfId=";

//[06/03/2017]Vijaymala added to call service to delete booking order
export const gnDeleteBookingOrder= gnBaseURL + "booking/PostBookingAcceptance?cnfId​=";
export const gnEditOrderBooking = gnBaseURL + "booking/PostBookingUpdate";

export const gnLoadingToById = gnBaseURL + "LoadSlip/GetLoadingslipDetails?loadingId=";
export const gnDeliveryAddrList = gnBaseURL + "Booking/GetBookingAddressDetails?bookingId=";

//[07/03/2017]Vijaymala added to get booking status list
export const gnGetBookingStatus = gnBaseURL + "Masters/GetStatusListForDropDown";
export const gnGetAllBooking = gnBaseURL + "booking/GetAllBookingList";

//[GJ]@20170307 : To get the Dealer list againest C&F
export const gnDealerList = gnBaseURL + "Organization/GetDealerDropDownList?cnfId=";
/*[GJ]@20170307 : Added the Url for the Loading Status*/
export const gnGetStatusReasons = gnBaseURL + "LoadSlip/GetLoadStsReasonsForDropDown?statusId=";
export const gnPostStatusWithReason = gnBaseURL + "LoadSlip/PostDeliverySlipConfirmations";

//[08/03/2017]Vijaymala added to getQuota Rate reason List
export const gnGetReasonList = gnBaseURL + "QuotaAndRate/GetRateReasonsForDropDown";

//[23/03/2017]Vijaya added to post market trend list
export const gnPostMarketTrend = gnBaseURL+ "Competitor/PostMarketUpdate"
export const gnGetMarketUpdate = gnBaseURL + "Competitor/GetMarketUpdate?fromDate=";

//[17/03/2017]Vijaya added to get cdStructure list,delivery period list,district list
export const gnGetCdStructureList= gnBaseURL + "Masters/GetCDStructureForDropDown";
export const gnGetDeliveryPeriodList= gnBaseURL + "Masters/GetDeliveryPeriodForDropDown";
export const gnGetDistrictList= gnBaseURL + "Masters/GetDistrictForDropDown";

//[17/03/2017]Vijaya added to post close booking
export const gnPostBookingClosure= gnBaseURL + "booking/PostBookingClosure";

//[17/03/2017]Vijaya added to post close booking
export const gnGetBookinOpenCloseInfo= gnBaseURL + "booking/GetBookinOpenCloseInfo";

export const gnIpInfo = "http://ipinfo.io/json"

export const gnLocationList = gnBaseURL + "Stock/GetStockLocationsForDropDown";
export const gnCompartmentList = gnBaseURL + "Stock/GetCompartmentsForDropDown?locationId=";
export const gnMaterialTypeList = gnBaseURL + "Stock/GetProdCategoryForDropDown";
export const gnStockMatAndSpecList = gnBaseURL + "Stock/GetMateAndSpecsList?locationId=";
export const gnPostMateAndSpecsList = gnBaseURL + "Stock/PostDailyStockUpdate";
export const gnLoadingConfiguratorList = gnBaseURL + "LoadSlip/GetCnfLoadingCofiguration?prodSpecId=";
export const gnPostLoadingQuotaConfig = gnBaseURL + "LoadSlip/PostLoadingConfiguration";

//[17/03/2017]Vijaya added to post Product Specification
export const gnAddProductSpec= gnBaseURL + "Material/PostProductInformation";
export const gnGetProductSpecList= gnBaseURL + "Material/GetProductAndSpecsList?prodCatId=";
export const gnGetStockSummaryDetails= gnBaseURL + "Stock/GetStockSummaryDetails?stockDate=";
export const gnGetLoadingQuota= gnBaseURL + "LoadSlip/GetCnfLoadingQuotaDeclaration?prodSpecId=";
export const gnIsLoadingQuotaDeclaredToday= gnBaseURL + "LoadSlip/IsLoadingQuotaDeclaredToday";

//[23/03/2017]Vijaya added to post stock summarylist
export const gnPostStockSummaryConfirmation= gnBaseURL + "Stock/PostStockSummaryConfirmation";
export const gnPostRunningSizeList= gnBaseURL + "Stock/PostDailyRunningSize";
export const gnPostLoadingQuotaDeclaration = gnBaseURL + "LoadSlip/PostLoadingQuotaDeclaration";
export const gnMaterialSpecList = gnBaseURL + "Stock/GetProdSepcificationsForDropDown";
export const gnGetStockSummaryAgainestCatSpec = gnBaseURL + "Stock/GetStockDtlsByCategAndSpecs?prodSpecId=";
export const gnIsLoadingQuotaConfirmed= gnBaseURL + "Stock/IsStockUpdateConfirmed";
export const gnGetLoadingSlipExtList= gnBaseURL + "LoadSlip/GetEmptySizeAndProdLstForNewLoading?boookingId=";

export const gnGetBookingMaterialExtList= gnBaseURL + "Booking/GetEmptySizeAndProductListForBooking";

//Sanjay [2017-03-27] For All dimension of Country,States and Taluka
export const gnGetCountryListForDDL= gnBaseURL + "Masters/GetCountriesForDropDown";
export const gnGetStateListForDDL= gnBaseURL + "Masters/GetStatesForDropDown?countryId=";
export const gnGetTalukaListForDDL= gnBaseURL + "Masters/GetTalukasForDropDown?districtId="

//Vijaylala[30-03-2017]For gettting Confirmed loading details 

export const getInOutloadingSlipList = gnBaseURL + "LoadSlip/GetLoadingSlipsByStatus?statusId=";

export const gnGetCnfDecLoadingQuota = gnBaseURL + "LoadSlip/GetAvailableLoadingQuotaForCnf?cnfId="

export const gnGetDatewiseRunningSizeDtls= gnBaseURL + "Stock/GetDatewiseRunningSizeDtls?stockDate=";
export const gnGetAllPendingLoadingList= gnBaseURL + "LoadSlip/GetAllPendingLoadingList?cnfId=";
export const gnGetSuperwisorListForDropDown= gnBaseURL + "LoadSlip/GetSuperwisorListForDropDown";
export const gnPostAllocateSupervisor = gnBaseURL + "LoadSlip/PostLoadingSuperwisorDtl";
export const gnGetLastUpdatedStockDate = gnBaseURL + "Stock/GetLastUpdatedStockDate?compartmentId=";
export const gnIsDeclaredTodayLoadingQuota= gnBaseURL + "LoadSlip/IsLoadingQuotaDeclaredForTheDate";
export const gnGetVehicleNumberList= gnBaseURL + "LoadSlip/GetVehicleNumberList";

export const gnGetParityDetails= gnBaseURL + "Material/GetParityDetails";
export const gnSetParityDetails = gnBaseURL + "Material/PostParityDetails";
export const gnGetBookingStatusHistory = gnBaseURL + "Booking/GetBookingStatusHistory";

export declare const enum orgTypeEnum {
    //AGENTTYPEID = 1,
    CNFTYPEID = 1,
    COMPETITORID = 3,
    DEALERTYPEID =2,
    LOADERTYPEID =5,
    TRANSPORTER = 4,
    OTHERTYPEID =6 
}

export  declare const enum statusTypeEnum {
New=1,
Approved=2,
ApprovedByDirectors=3,
RejectedByDirectors=8,//8
ApprovedByMarketing	=9,//9
RejectedByMarketing=10, //10
AcceptedByCAndF	=11 ,//11
RejectedByCAndF=12 ,//12
Delete =13
}

export declare const enum txnTypeEnum {
      BOOKING = 1,
      LOADING = 2,
      DELIVERY = 3,
      SPECIAL_REQUIREMENT = 4
}

export enum loadingSequenceName{
    BOTTOM = <any> "Bottom",
    MIDDLE1 = <any> "Middle1", 
    MIDDLE2 = <any>"Middle2",
    MIDDLE3 = <any>"Middle3",
    TOP = <any>"Top",
}

export enum ScreenName{
    LOADINGSLIP = <any> "LoadingSlip",
    DELIVERY = <any> "Delivery", 
    ViewBooking=<any>"ViewBooking",
    BookingConfirmation=<any>"BookingConfirmation",
    BookingConfirmationByCnF=<any>"BookingConfirmationByCnF",
}

/*[GJ]@20170307 : Added the enum for the Loading Status*/
export enum LoadingStatus {
    LOADING_NEW = 4,
    LOADING_NOT_CONFIRM = 5,
    LOADING_WAITING = 6,
    LOADING_CONFIRM = 7,
    LOADING_REPORTED_FOR_LOADING=14,
    LOADING_GATE_IN=15,
    LOADING_COMPLETED=16,
    DELIVERED=17,
    LOADING_CANCEL=18
}

/*[Vijaymala]@2017/03/11 : Added the enum for the Market Trend Status*/
export enum MarketTrendStatus {
    MarketTrenByCF = 4,
    MarketTrenByMarketingPerson = 5,
}


/*[Vijaymala]@2017/03/17 : Added the enum for the Role*/
export enum UserRole {
            SYSTEM_ADMIN = 1,
            DIRECTOR = 2,
            C_AND_F_AGENT = 3,
            LOADING_PERSON = 4,
            MARKETING_FRONTIER = 5,
            MARKETING_BACK_OFFICE = 6,
            FIELD_OFFICER = 7,
            REGIONAL_MANAGER = 8,
            VICE_PRESIDENT_MARKETING = 9
}

/*[Vijaymala]@2017/03/22 : Added the enum for the MEssageTypeE*/
export enum ResultMessageE
    {
        None=0,
        Information=1,
        Error=2
    }

export enum ProductCatE
    {
        TMT=1,
        Plain=2
    }

export enum ProductSpecsE{
    STRAIGHT = <any> "Straight",
    BEND = <any> "Bend", 
    RKSHORT = <any>"RKShort",
    RKLONG = <any>"RKLong",
    TUKADA = <any>"Tukada",
    COIL = <any>"Coil",
}
export enum ProductSpecsIdE{
    STRAIGHT = 1,
    BEND = 2, 
    RKSHORT = 3,
    RKLONG = 4,
    TUKADA = 5,
    COIL = 6,
}

export enum ColorValidE{
    RED = <any> "red",
    WHITE = <any> "white", 
    BLACK = <any>"black",
    GREEN = <any>"green",
   
}
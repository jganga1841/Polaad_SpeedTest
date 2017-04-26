"use strict";
// export class LoadingInformation
// {
//   constructor(){}
//   public StatusDate:Date;
//   public LoadingQty:number;
//   public Rate:number;
//   public Confirmed:Boolean;
//   public CdStructure:number;
// }
var LoadingTO = (function () {
    function LoadingTO() {
    }
    return LoadingTO;
}());
exports.LoadingTO = LoadingTO;
var LoadingSlipTO = (function () {
    function LoadingSlipTO() {
        this.CdStructureId = 0;
        this.LoadingSlipExtTOList = [];
        this.DeliveryAddressTOList = [];
        this.IsConfirmed = 0;
    }
    return LoadingSlipTO;
}());
exports.LoadingSlipTO = LoadingSlipTO;
var LoadingSlipDtlTO = (function () {
    function LoadingSlipDtlTO() {
    }
    return LoadingSlipDtlTO;
}());
exports.LoadingSlipDtlTO = LoadingSlipDtlTO;
var LoadingSlipExtTO = (function () {
    function LoadingSlipExtTO() {
        this.IdLoadingSlipExt = 0;
        this.BookingId = 0;
        this.LoadingSlipId = 0;
        this.BookingExtId = 0;
        this.MaterialDesc = null;
        this.ProdCatId = 0;
        this.ProdSpecId = 0;
        this.LoadingQuotaId = 0;
    }
    return LoadingSlipExtTO;
}());
exports.LoadingSlipExtTO = LoadingSlipExtTO;
var MaterialProdSpecsvsSizeTO = (function () {
    function MaterialProdSpecsvsSizeTO() {
    }
    return MaterialProdSpecsvsSizeTO;
}());
exports.MaterialProdSpecsvsSizeTO = MaterialProdSpecsvsSizeTO;
//# sourceMappingURL=loading_information.js.map
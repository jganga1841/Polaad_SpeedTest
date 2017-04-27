"use strict";
var BookingTO = (function () {
    function BookingTO() {
        this.CnFOrgId = 0;
        //public BookingDate : Date
        this.BookingQty = 0;
        this.OrderDetailsLst = [];
        this.DeliveryAddressLst = [];
        this.IsConfirmed = 0;
        this.IsJointDelivery = 0;
        this.IsSpecialRequirement = 0;
        this.CdStructure = 0;
    }
    return BookingTO;
}());
exports.BookingTO = BookingTO;
var OrderDetailsTO = (function () {
    function OrderDetailsTO() {
    }
    return OrderDetailsTO;
}());
exports.OrderDetailsTO = OrderDetailsTO;
var DeliveryAddressTO = (function () {
    function DeliveryAddressTO() {
    }
    return DeliveryAddressTO;
}());
exports.DeliveryAddressTO = DeliveryAddressTO;
var LoadingMaterialSequenceTO = (function () {
    function LoadingMaterialSequenceTO() {
    }
    return LoadingMaterialSequenceTO;
}());
exports.LoadingMaterialSequenceTO = LoadingMaterialSequenceTO;
//# sourceMappingURL=booking_information.js.map
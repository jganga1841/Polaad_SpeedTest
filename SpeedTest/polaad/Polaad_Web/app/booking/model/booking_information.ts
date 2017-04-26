import {AddressTO} from 'app/agent/model/address_information'
import {CommonInformation} from 'app/common/model/common_Information'

export class BookingTO{
    public IdBooking : number = 0
    public CnFOrgId :number =0
    public DealerOrgId : number
    //public BookingDate : Date
    public BookingQty? : number
    public PendingQty? : number
    public BookingRate : number    
    public DeliveryDays : number
    public NoOfDeliveries : number
    public OrderDetailsLst : OrderDetailsTO[] = []
    public DeliveryAddressLst : DeliveryAddressTO[] = []
    public IsConfirmed :number = 0
    public IsJointDelivery :number =0
    public IsSpecialRequirement :number =0
    public CdStructure :number=0
    public DealerName :string
    public CnfName :string
    public BookingDatetime :String
    public Status : string
    public QuotaDeclarationId:number
    public GlobalRateId:number
    //vijaymala added[27/02/2017]
    public CreatedOn:Date
    public StatusId:number
    public TranStatusE:number
    public IsSelect : boolean
    public IsDeleted:number
    public StatusDate:string
    public CreatedOnStr:string
    public StatusDateStr:string
    public LoadingQty : number
    public createdDate:Date
    public AuthReasons:string
    public CdStructureId :number=0
    public BalQty? : number = 0
}

export class OrderDetailsTO{
    public MaterialSubType? : string
    public BookedQty? : number
    public Rate? : number
    public MaterialId? : number
    public ProdCatId? : number
    public ProdSpecId?: number
    public ProdCatDesc?:string
    public ProdSpecDesc?: string
    public IdBookingExt? : number
}

export class DeliveryAddressTO{
     public Address : string
    public VillageName : string
    public TalukaName : string
    public DistrictName : string
    public Pincode : number
    public IdBookingDelAddr:number
    public BookingId? : number
    public IsSelected? : boolean
    public LoadingLayerId? : number
}

export class LoadingMaterialSequenceTO{
   public LoadingItem : string
   public SeqLoadingQty  : number
   public MaterialId : number
   public SequenceNo : number
   //public MaterialTO:CommonInformation=new CommonInformation()
}

export class BookingActionsTO  {
   public IdBookingAction? : number
   public IsAuto?  : number
   public StatusBy? : number
   public StatusDate? : Date
   public BookingStatus?:string
   //public MaterialTO:CommonInformation=new CommonInformation()
}

export class BookingHistoryTO
{
    public IdBookingAuth : number
    public BookingId : number
    public StatusId : number
    public StatusDesc : string
    public StatusDateStr : string
    public Rate : number
    public Quantity : number
    public DeliveryPeriod : number
    public TranStatusE : number 
    public CreatedUserName : string 
}
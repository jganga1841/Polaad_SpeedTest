import { DeliveryAddressTO } from 'app/booking/model/booking_information'

// export class LoadingInformation
// {
//   constructor(){}
//   public StatusDate:Date;
//   public LoadingQty:number;
//   public Rate:number;
//   public Confirmed:Boolean;
//   public CdStructure:number;
// }

export class LoadingTO {
  public VehicleNo?: number;
  public IsJointDelivery?: number;
  public NoOfDeliveries?: number;
  public LoadingQtyTotal?: number
  public CnfOrgId?: number;
  public Qty?: number
  public LoadingSlipList?: LoadingSlipTO[]
  public StatusDesc?: string
  public LoadingSlipNo?: string
  public CnfOrgName?: string
  public IdLoading?: number
  public CreatedOn?: Date
  public StatusReasonId?: number
  public LoadingDatetime?: Date
  public StatusId?: number;
  public TranStatusE?: number
  public StatusReason?: string
  public LoadingDatetimeStr?: string
  public TransporterId? : number
  public TransporterName? : string
  public FreightChrg? : number
  public SuperwisorId?:number
  public SuperwisorName?:string
}

export class LoadingSlipTO {
  constructor() { }
  public DealerOrgId: number;
  public StatusId: number;
  public CreatedBy: number;
  public StatusDate: Date;
  public LoadingDatetime: Date;
  public CreatedOn: Date;
  public CdStructure: string;
  public CdStructureId?: number=0;
  public StatusReason: string;
  public DealerOrgName: string;
  // public TranStatusE:number; //uncomment after clearance
  public TblLoadingSlipDtlTO: LoadingSlipDtlTO;
  public LoadingSlipExtTOList: ​LoadingSlipExtTO[] = [];
  public DeliveryAddressTOList: DeliveryAddressTO[] = []
  public SequenceLoading: string
  public LoadingLayerId: number
  public cnfOrgName: string;
  public IsConfirmed :number = 0

  public StatusDesc: string
  public LoadingSlipNo: string

}

export class LoadingSlipDtlTO {
  constructor() { }
  public IdLoadSlipDtl?: number;
  public LoadingSlipId?: number;
  public IdBooking: number;
  public BookingExtId?: number;
  public LoadingQty?: number;
  public BookingRate: number;
  public BookingQty?: number;
  public DealerName?: string;
}

export class LoadingSlipExtTO {
  constructor() { }
  public IdLoadingSlipExt?: number = 0;
  public BookingId?: number = 0;
  public LoadingSlipId?: number = 0;
  public LoadingLayerid?: number;
  public MaterialId?: number;
  public BookingExtId?: number = 0;
  public LoadingQty?: number;
  public MaterialDesc?: string = null;
  //  public LoadingLayerE:number; 
  public LoadingItem?: string;
  public LoadingLayerDesc?: string
  public ProdCatId?: number = 0;
  public ProdSpecId?: number = 0;
  public LoadingQuotaId?: number = 0;
  public QuotaAfterLoading?: number;
  public QuotaBforeLoading?: number;
  public LoadingLayerE?: number;
  public ProdCatDesc? :  string;
  public ProdSpecDesc? : string;
  public IsConfirm? : number;
  public AvlQuota? : number;
}

export class MaterialProdSpecsvsSizeTO{
  public MaterialCategory? : string
     public StraightQty? : number
     public BendQty? : number
     public RKShortQty? :  number
     public RKLongQty? : number
     public TukadaQty? :  number
     public CoilQty? :  number
     public TotalValue? :  number
}


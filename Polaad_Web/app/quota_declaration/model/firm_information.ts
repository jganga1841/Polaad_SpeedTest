export class OrganizationTO{
    
    
     public FirmName: string
     public LastAllocQty: number 
     public Price: number;
     public LastPrice: number;
     public InformerName:string;
     public UpdateDatetime:Date;
     public DeclaredRate:number;
     public IdOrganization:number;
     public LastRateBand:number;
     public Rate:number;//for company quota
     public CreatedOn:Date;//for company quota
     public CompetitorUpdatesTO:CompetitorTO;
       //VD[2017/22/02] to balance quota and valid time
     public ValidUpto:number
     public BalanceQuota  :number      
     public QuotaDeclarationId :number;
     //Vijaymala [23/02/2017]added to avgprice & qty
     public AvgPrice:number
     public Quantity:number
}

export class CompetitorTO{
    public IdCompeUpdate : Date
    public CompetitorExtId : number
    public UpdateDatetime : Date
    public Price : Date
    public InformerName : String
    public AlternateInformerName : string
    public FirmName : string
    public LastPrice : number
    
}
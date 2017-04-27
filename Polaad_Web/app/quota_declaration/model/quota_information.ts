//Vijaymala added [8-feb-2017] to declare model for Quota Declare information

export class QuotaInformation{
    constructor(){}
    public QuotaAllocDate:Date;
    public RateBand:number;
    public AllocatedQty:number;     
    public FromDate:Date = null;
    public ToDate:Date = null;
    public PreviousRate:number = null;
    public CurrentRate:number = null;
    //GJ[20160902]: To display on the Booking Screen
    public BalanceQty : number
    public DeclaredRate:number
    public CreatedOn:Date
    public IdQuotaDeclaration:number
    public GlobalRateId:number
    public ValidUpto:number
    public CreatedOnStr:string
    public QuotaAllocDateStr:string
    public ValidUptoDateStr:string
    //Vijaymala[8-3-2012]added to reason
  
}


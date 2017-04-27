
export class LoadingQuotaTO{
     public IdLoadingQuota?  : number
     public LoadQuotaConfigId?  : number
     public CnfOrgId?  : number
     public MaterialId?  : number
     public IsActive?  : number
     public AllocQuota?  : number
     public BalanceQuota?  : number
     public CreatedBy? :number
     public UpdatedBy? :number
     public CreatedOn? :Date
     public UpdatedOn? :Date
     public Remark? : string="New Quota Declaration"
     public CnfOrgName? :  string
     public MaterialDesc? :  string
      public ProdCatId?  : number
     public ProdSpecId?  : number
      public ProdCatDesc? :  string
     public ProdSpecDesc? :  string

}

export class MaterialLoadingTO{
      public cnfId? : number
      public cnfName? : string      
      public SixMM? : number
      public EightMM? : number
      public TenMM? :  number
      public TweleveMM? : number
      public OneSixMM? :  number
      public TwoZeroMM? :  number
      public TwoFiveMM? :  number
      public TwoEightMM? :  number
      public ThreeTwoMM? :  number      

}

//Sanjay[2017-03-27] Model for Loading Quota Transfer Note
export class LoadingQuotaTransferTO
{
      public IdTransferNote?:Number
      public FromCnfOrgId?:Number
      public ToCnfOrgId?:Number
      public AgainstLoadingQuotaId?:Number
      public CreatedBy?:Number
      public UpdatedBy?:Number
      public TransferQty?:Number
      public TransferDesc?:string
      public CreatedOn?:Date
      public UpdatedOn?:Date
}
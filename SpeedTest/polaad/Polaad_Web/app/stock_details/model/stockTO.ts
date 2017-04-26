
export class StockSummaryTO{
     public IdStockSummary?  : number
     public ConfirmedBy?  : number
     public CreatedBy?  : number
     public UpdatedBy?  : number
     public StockDate? :Date
     public ConfirmedOn? :Date
     public CreatedOn? :Date
     public UpdatedOn? :Date
     public MaterialDesc? :  string
     public NoOfBundles?  : number
     public TotalStock?  : number
     public StockDetailsTOList : StockDetailsTO[]
}

export class StockDetailsTO{
     public IdStockDtl?  : number
     public StockSummaryId?  : number
     public LocationId?  : number
     public CompartmentId?  : number
     public ProdCatId?  : number
     public MaterialId?  : number
     public ProdSpecId?  : number
     public CreatedBy? :number
     public UpdatedBy? :number
     public CreatedOn? :Date
     public UpdatedOn? :Date
     public NoOfBundles?  : number
     public TotalStock? : number
     public LoadedStock?:number;
     public BalanceStock? : number
     public LocationName? : string
     public ProdCatDesc? :  string
     public ProdSpecDesc? : string
     public MaterialDesc? :  string
     public RunningStockQty? :number
}

export class StockProdSpecTO{
     public MaterialCategory? : string
     public StraightQty? : number
     public BendQty? : number
     public RKShortQty? :  number
     public RKLongQty? : number
     public TukadaQty? :  number
     public CoilQty? :  number
     public TotalValue? :  number
     
     
}

export class RunningSize{

    public IdRunningSize? : number
    public LocationId? : number
    public ProdCatId? : number
    public MaterialId? : number
    public ProdSpecId? : number
    public CreatedBy? : number
    public UpdatedBy? : number
    public StockDate? : Date
    public CreatedOn? : Date
    public UpdatedOn? : Date
    public NoOfBundles? : number
    public TotalStock? : number
    public LocationName? : string
    public MaterialDesc? :  string
}

export class SizeAndSpecWiseStock{

    public StockSummaryId? : number
    public MaterialId? : number
    public ProdSpecId? : number
    public NoOfBundles? : number
    public TotalStock? : number
    public LoadedStock? : number
    public BalanceStock? : number
    public ProdSpecDesc? : string
    public MaterialDesc? : string
    public StockDate? : Date
    public ConfirmedBy? : number
    public ConfirmedOn? : Date
 
}

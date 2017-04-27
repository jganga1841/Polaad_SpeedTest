
export class ParitySummaryTO {
    public IdParity?: number
    public CreatedBy?: number
    public IsActive?: number
    public CreatedOn?: Date
    public Remark?: string
    public ParityDetailList?: ParityDetailsTO[]
}

export class ParityDetailsTO {
    public IdParityDtl?: number
    public ParityId?: number
    public MaterialId?: number
    public CreatedBy?: number
    public CreatedOn?: Date
    public ParityAmt?: number
    public NonConfParityAmt?: number
    public Remark?: string
    public ProdCatId?: number
    public ProdCatDesc?: string
    public MaterialDesc?: string
    public CreatedOnStr?: string
}

export class UserTO{
    public UserLogin? : string
    public IdUser? : number
    public IsActive? : number
    public UserPasswd? : string
    public UserRoleList? : UserRoleTO[]
    public LoginTO? : LoginTO
    public PersonId? : number
    public AddressId? : number
    public OrganizationId? : number
    public OrganizationName? : string
    public DisplayName? : string
}

export class UserRoleTO{
    public IdUserRole : string
    public UserId : number
    public RoleId : number
    public IsActive : number
    public CreatedBy : number
    public CreatedOn : Date
    public RoleDesc : string
}
export class LoginTO{
    public IdLogin? : string
    public UserId? : number
    public LoginDate? : number
    public LogoutDate? : string
    public LoginIP? : string
    
}
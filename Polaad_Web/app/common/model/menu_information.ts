
 export class  MenuInformation
{
    constructor(
       public MenuId:number,
       public MenuName:string,
       public ParentId:number,
       public SubMenuList : MenuInformation[] ,
       public Path:string,
       public MenuClass:string,
      // public ImgPath:string
       
        ){}

}
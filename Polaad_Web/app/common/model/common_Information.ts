import myGlobalVal = require('app/global')
export class CommonInformation{
    constructor(){}
    public Text? : string
    public Value? : number
}

export class ResultMessage
{
  public  Exception:Error
  public  Tag:Object
  public  MessageType:myGlobalVal.ResultMessageE
  public  Text:string
  public  Result:number

}
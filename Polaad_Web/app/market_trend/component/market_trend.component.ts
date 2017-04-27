import {Component,OnInit,ViewChild} from '@angular/core';
import {CommonServices} from 'app/common/services/common.services'
import {CommonInformation} from 'app/common/model/common_Information'
import {Observable} from 'rxjs/Rx';
import {ConfirmService} from 'app/error/confirm.service'
import {MarketTrendServices} from '../service/market_trend_service'
import {ErrorMessage} from 'app/error/errorMessage'
import myGlobalVal = require('app/global')
import {CompetitorUpdatesTOList} from '../model/market_trend_information'
import {UserTO} from 'app/user/model/userTO'
import {AuthenticationService} from 'app/login/login.services'
import {ResultMessage} from 'app/common/model/common_Information'
import { sharedService } from 'app/common/services/sharedService';
import { Router, ActivatedRoute } from '@angular/router';
declare var componentHandler: any;
@Component({
    selector:'my-market-trend',
    // template:'<h1>Hello</h1>'
    templateUrl:'app/market_trend/market_trend.html'
})  

//Vijaymala Added For Market Trend [11-03-2017]
export class MarketTrendComponent implements OnInit{

    competitorQuotaList:CommonInformation[]=[];
    dealerList:CommonInformation[]=[];
    marketTrendList:CompetitorUpdatesTOList[]=[];
    marketTrendTO:CompetitorUpdatesTOList={};
    competitorTO:CommonInformation={};
    dealerTO:CommonInformation={};
    competitorUpdatesTOList:CompetitorUpdatesTOList[]=[];
    // ScreenName : string
    private headMessage : string= "";
    private panelheading : string="";
    private isByCF: boolean = false;
    private isByMarketingPerson : boolean = false;
    private isByDirector: boolean = false;
    isShowForCnF:boolean=false;
    isDisplayView:boolean=false;
    marketTrendClass:string="active"
    userTO:UserTO;
    fromDate:Date = (new Date(new Date("YYYY-MM-DD").setDate(new Date("YYYY-MM-DD").getDate() - 7)));
    toDate:Date = new Date("YYYY-MM-DD");
    loginUserId:number;
      ignoredFirstEvent = false;
    initvalue: Date

    @ViewChild(ErrorMessage) errorMsg: ErrorMessage;
    
    constructor(
        private ss: sharedService,
        private commonServices:CommonServices,
        private marketTrendServices:MarketTrendServices,
        private _confirmService:ConfirmService,
        private loginService:AuthenticationService,
        private route: ActivatedRoute,
        private router: Router){
                    this.initvalue = this.fromDate;
        }

    ngOnInit()
    {
        componentHandler.upgradeDom();
        this.userTO=this.loginService.getUserTOFromLocalStorage();
        //this.viewMarketTrendCall();
        this.marketTrendUpdateCall();
        
        this.dealerTO=0;
         
            if ( this.userTO.UserRoleList[0].RoleId == myGlobalVal.UserRole.C_AND_F_AGENT || this.userTO.UserRoleList[0].RoleId == myGlobalVal.UserRole.LOADING_PERSON ) {
                this.isDisplayView = false
                this.ss.hideLoader();
                this.marketTrendClass="active"
            }
            else {
                  this.marketTrendClass="inactive"
                this.isDisplayView = true
                this.viewMarketTrendCall();
                this.ss.hideLoader();
            }
         
    }
marketTrendUpdateCall()
{
    this.ss.showLoader();
    this.getCompetitorList(myGlobalVal.orgTypeEnum.COMPETITORID);
    this.getDealerList(myGlobalVal.orgTypeEnum.DEALERTYPEID);
    this.dealerTO = new CommonInformation();
    this.marketTrendTO = new CompetitorUpdatesTOList();
    this.marketTrendList = []
    this.competitorTO=this.competitorQuotaList[1];

}
viewMarketTrendCall(){
     this.ss.showLoader();
     this.getMarketUpdate(this.fromDate.toString(),this.toDate.toString());
      this.competitorTO = new CommonInformation();
}
      getCompetitorList(OrgTypeId : number){
        this.competitorQuotaList= [];
        this.commonServices.getOrgList(OrgTypeId)
                           .subscribe(
                             commonInfoList=>this.competitorQuotaList=commonInfoList,
                             err => {
                            // Log errors if any
                            console.log(err);
                        });
           // return this.commonInfoList;
    }

    getDealerList(OrgTypeId : number){
        this.competitorQuotaList= [];
        this.commonServices.getOrgList(OrgTypeId)
                           .subscribe(
                            commonInfoList=>
                            {
                                this.dealerList=commonInfoList  ,
                                this.ss.hideLoader()
                            },
                             err => {
                            this.ss.hideLoader()
                            // Log errors if any
                            console.log(err);
                        });
           // return this.commonInfoList;
    }

     addMarketTrend(marketTrendTO: CompetitorUpdatesTOList,competitorTO : CommonInformation,dealerTO : CommonInformation){
        // if(marketTrendTO.Price==undefined)
        // {
        //     return ;
        // }
        this.marketTrendList.push({
            'FirmName': competitorTO.Text,
            'Price': marketTrendTO.Price,
            'DealerName': dealerTO.Text,
            'DealerId':dealerTO.Value,
            'CompetitorExtId':competitorTO.Value
        });
        this.marketTrendTO= new CompetitorUpdatesTOList()
    }

     showConfirmDialog(): boolean {
        var warningmsg: string
        warningmsg = "Do You Want To Update The Market Trend?";
        this._confirmService.activate(warningmsg, "Confirmation")
            .then(res => {
                if (res) {
                    this.postMarketTrend();
                } else {
                }
            });
        return false;

    }

    postMarketTrend()
    {
       
          let MarketTrendOperation:Observable<ResultMessage>; 
        //   if(this.isByCF)
        //   {
        //     this.marketTrendTO.StatusId=myGlobalVal.MarketTrendStatus.MarketTrenByCF;
        //     this.marketTrendTO.TranStatusE=myGlobalVal.MarketTrendStatus.MarketTrenByCF;
        //   }
        //   else if(this.isByMarketingPerson)
        //   {
        //        this.marketTrendTO.StatusId=myGlobalVal.MarketTrendStatus.MarketTrenByMarketingPerson;
        //     this.marketTrendTO.TranStatusE=myGlobalVal.MarketTrendStatus.MarketTrenByMarketingPerson;
        //   }
          this.loginUserId=this.userTO.IdUser;
          MarketTrendOperation = this.marketTrendServices.addMarketTrendUpdate(this.marketTrendList,this.loginUserId);
          MarketTrendOperation.subscribe(result=>{            
            if(result.Result == 1 ||  result.MessageType == myGlobalVal.ResultMessageE.Information)
                {
                     this.errorMsg.showErrorMessage("Market Trend Confirmed Successfully", "Information");
                     this.marketTrendList = []
                }
            else
                this.errorMsg.showErrorMessage("Market Trend Not Confirmed ", "Error");
      
        },
        err=>{});
        
    }

    getMarketUpdate(fromDate:string,toDate:string){
  
        // Bind User List
        if (this.ignoredFirstEvent || this.initvalue === undefined) {
         this.marketTrendServices.getMarketUpdate(fromDate,toDate)
                           .subscribe(
                             competitorUpdatesTOList=>
                             {
                                 this.competitorUpdatesTOList=competitorUpdatesTOList,
                                 this.ss.hideLoader()
                            },
                             err => {
                            this.ss.hideLoader()
                            // Log errors if any
                            console.log(err);
                        });
                    }
                            this.ignoredFirstEvent = true;

           // return this.commonInfoList;
    }
    
backquota()
{
    this.router.navigate(['\QuotaDeclaration']);
}
     

}
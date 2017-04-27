import {Component,OnInit,Input,ViewChild} from '@angular/core';
import {QuotaInformation} from '../model/quota_information'
import {QuotaDeclarationService} from '../services/quota_declaration_service'
import{AgentInformation}from'app/agent/model/agents_information'
import{OrganizationTO} from 'app/quota_declaration/model/firm_information'
import{CompetitorTO} from 'app/quota_declaration/model/firm_information'
import {ConfirmService} from 'app/error/confirm.service'
import {ConfirmComponent} from 'app/error/confirm.component'
import {ErrorMessage} from 'app/error/errorMessage'
import {CommonServices} from 'app/common/services/common.services'
import {CommonInformation} from 'app/common/model/common_Information'
declare var componentHandler:any;
import {sharedService} from 'app/common/services/sharedService';
import{Observable}from 'rxjs/Rx';
import { EmitterService } from 'app/common/services/emitter.service';
import {UserTO} from 'app/user/model/userTO'
import {ResultMessage} from 'app/common/model/common_Information'
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector:'my-quota',
    templateUrl:'app/quota_declaration/quota_declaration.html'
})  


export class QuotaDeclarationComponent implements OnInit {
    toDate: Date = new Date();
    fromDate: Date = (new Date(new Date().setDate(new Date().getDate() - 7)));
    ignoredFirstEvent = false;
    initvalue: Date
    @ViewChild(ErrorMessage) errorMsg: ErrorMessage;

    constructor(private ss: sharedService,
        private quotaDeclarationService: QuotaDeclarationService
        , private _confirmService: ConfirmService
        , private commonServices: CommonServices,
         private route: ActivatedRoute,
        private router: Router
    ) {
        this.initvalue = this.fromDate;
    }

    //Local Properties
    companyQuotaList: OrganizationTO[];
    competicompetitor: CompetitorTO = new CompetitorTO();
    competitorQuotaList: OrganizationTO[];
    CfQuotaList: OrganizationTO[];
    rateBandList: OrganizationTO[];
    companyQuotInfo: QuotaInformation;
    rateReasonList: CommonInformation[];
    rateReason: CommonInformation
    model: any = new OrganizationTO();
    declaredRate: number;
    isOther: boolean = false;
    comments: string;
    totalAllocatedQty: number;
    @Input() listId: string;
    validDurationLst: CommonInformation[];
    rateBand: number = 0;
    isQuotaGreater: boolean = false;
    loginUserId: number;
    userTO: UserTO;

    getCompanyQuotaList(fromDate: string, toDate: string) {

        // Bind User List
        if (this.ignoredFirstEvent || this.initvalue === undefined) {
            this.quotaDeclarationService.getCompanyQuotaList(fromDate, toDate)
                .subscribe(
                companyQuotaList => this.companyQuotaList = companyQuotaList,
                err => {
                    // Log errors if any
                    this.ss.hideLoader();
                    console.log(err);
                }
                );
        }
        this.ignoredFirstEvent = true;

    }

    ngOnInit() {

        componentHandler.upgradeDom();
        this.rateReasonList = [];
        this.competicompetitor = new CompetitorTO();
        this.competitorQuotaList = [];
        this.callPriceHistoryTab();
    }
    callPriceHistoryTab() {
        this.ss.showLoader();
        this.getCompanyQuotaList(this.fromDate.toString(), this.toDate.toString());
        this.getCompetitorQuotaList();
    }
    callRateAnnouncementTab() {
        this.ss.showLoader();
        this.getCFQuotaList();
        this.getRateReason();
        this.validDurationLst = this.commonServices.getQuotaValidDurationList();
    }

    //service to call competitorList and bind to view
    getCompetitorQuotaList() {
        // Bind User List
        this.quotaDeclarationService.getCompetitorQuotaList()
            .subscribe(
            competitorQuotaList => {
                this.competitorQuotaList = competitorQuotaList, //Bind to view
                this.ss.hideLoader()
            },
            err => {
                // Log errors if any
                console.log(err);
                this.ss.hideLoader();
            });
    }
    getCFQuotaList() {
        // Bind User List
        this.quotaDeclarationService.getCFQuotaList()
            .subscribe(
            CfQuotaList => {
                this.CfQuotaList = CfQuotaList
                this.declaredRate = CfQuotaList[0].DeclaredRate,
                this.sum = 0;
                this.CfQuotaList.forEach(s =>
                 {this.sum = + this.sum + + s.LastAllocQty
                   
                    }
                 );
               
                this.totalAllocatedQty = this.sum;
                this.ss.hideLoader();

            },
            //    CfQuotaList => this.CfQuotaList = CfQuotaList, //Bind to view
            err => {
                // Log errors if any
                console.log(err);
                this.ss.hideLoader();
            });
    }

    showConfirmDialog() {
        this._confirmService.activate("Are you sure to this announce Quota?", "Confirmation")
            .then(res => {
                if (res) {
                    this.ss.showLoader();
                    this.announceRate();
                } else {
                }
            });
    }
    announceRate() {
        if (localStorage.getItem("currentUser") != null) {
            this.userTO = JSON.parse(localStorage.getItem("currentUser"));
            this.loginUserId = this.userTO.IdUser;
        }
        // Variable to hold a reference of addComment/updateComment
        let announceRateperation: Observable<ResultMessage>;

        // Create a new comment
        announceRateperation = this.quotaDeclarationService.announceQuota(this.loginUserId, this.CfQuotaList, this.declaredRate, this.comments, this.rateReason.Value, this.rateReason.Text)
        // Subscribe to observable
        announceRateperation.subscribe(
            announceRate => {
                if (announceRate.Result == 1) {
                    this.ss.hideLoader()
                    this.errorMsg.showErrorMessage("Quota and Rate Band announce Successfully", "Information");
                }
                else {
                    this.ss.hideLoader()
                    this.errorMsg.showErrorMessage("Quota and Rate not announce.", "Error");
                }
            },
            err => {
                this.ss.hideLoader()
                // Log errors if any
                console.log(err);
            });
    }

    //GJ[20170209] : get Company today's quota
    getRateReason() {
        this.commonServices.getRateReason().subscribe(
            p => {
            this.rateReasonList = p
                this.ss.hideLoader();
            },
            err => {
                console.log(err);
                this.ss.hideLoader();
            }
        ),
            () => {
                console.log("Done")
                this.ss.hideLoader();
                //return this.companyQuotInfo;
            }
    }


    onddlRateChage() {
        if (this.rateReason.Text == "Other") {
            this.isOther = true;
            this.comments = "";
        }
        else {
            this.isOther = false;
            this.comments = this.rateReason.Text;
        }

    }
    selectOnClick($event: Event) {
        $event.target.select();
    }
    sum: number = 0;
    total: number = 0;
    calculateTotal(CfQuotaList: OrganizationTO[]) {
        this.sum = 0;
        CfQuotaList.forEach(s => this.sum = +this.sum + + s.LastAllocQty);
        this.totalAllocatedQty = this.sum;
    }

    checkNumber($event: Event) {
        this.rateBand = $event.target.value;
        if (this.rateBand > 499) {
            this.errorMsg.showErrorMessage("Rate Band must be less than 500", "Warning")
            $event.target.value = null;
            this.isQuotaGreater = true;
            // //or
            // this.rateBand = ' ';
        }
    }
 
backMarketTrend()
{
    this.router.navigate(['\MarketTrend']);
}
}

import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, ViewChild, Pipe, Injectable, PipeTransform } from '@angular/core';

import { ErrorMessage } from 'app/error/errorMessage'
import { ConfirmService } from 'app/error/confirm.service'
import { ConfirmComponent } from 'app/error/confirm.component'
import { AuthenticationService } from 'app/login/login.services'
import { UserTO } from 'app/user/model/userTO';
import { sharedService } from 'app/common/services/sharedService';

import { ParitySummaryTO } from 'app/Masters/model/parityTO';
import { ParityDetailsTO } from 'app/Masters/model/parityTO';
import { ParityService } from 'app/Masters/services/parityService'
import { ResultMessage } from 'app/common/model/common_Information'
declare var componentHandler: any;

@Component({
    selector: 'parity',
    templateUrl: 'app/Masters/parity.html',
    providers: [ConfirmService]
})

export class parityComponent implements OnInit {
    originalTime: any;
    reTime: any;
    @ViewChild(ErrorMessage) errorMsg: ErrorMessage;
    userTo: UserTO = {}
    constructor(
        private ss: sharedService
        , private parityService: ParityService
        , private authLoginServices: AuthenticationService
        , private _confirmService: ConfirmService

    ) {
        this.userTo = authLoginServices.getUserTOFromLocalStorage();
    }
    paritySummaryTOObj: ParitySummaryTO = {};
    parityList: ParityDetailsTO[] = []
    lblMessage: string
    allParityList: any = [];
    keys: String[];
    parityDetailsTo: ParityDetailsTO = new ParityDetailsTO();
    resultMessage: ResultMessage = new ResultMessage();
    lastUpdatedParityDate: string;
    isEmpty: boolean;
    ngOnInit() {
        componentHandler.upgradeDom();
        this.getParityList();
    }

    getParityList() {
        debugger;
        this.ss.showLoader();
        this.allParityList = {};
        //debugger;
        this.parityService.getParityList().subscribe(
            data => {
                this.parityList = data;
                // console.log(JSON.stringify(this.parityList));
                if (this.parityList.length > 0 && this.parityList != undefined) {
                    this.configureParity();
                }
                else
                    this.errorMsg.showErrorMessage("Data not found for Loading configuration.", "Error");
                // this.lblMessage = "Data not found for Loading configuration."
                this.ss.hideLoader();
            },
            err => {
                this.ss.hideLoader();
                console.log("Server error : " + err);
            }
        )
    }

    configureParity() {
        var i = 0
        this.lastUpdatedParityDate = this.parityList[0].CreatedOnStr;
        for (var i = 0; i < this.parityList.length; ++i) {
            var obj = this.parityList[i];
            //If a property for this DtmStamp does not exist yet, create
            if (this.allParityList[obj.MaterialDesc] === undefined)
                this.allParityList[obj.MaterialDesc] = [{ 'key': obj.MaterialDesc, value: [obj.MaterialDesc] }];
            //x will always be the array corresponding to the current DtmStamp. Push a value the current value to it.
            this.allParityList[obj.MaterialDesc].push({ 'key': 'ParityAmt_' + obj.ProdCatDesc, 'value': obj.ParityAmt });
            this.allParityList[obj.MaterialDesc].push({ 'key': 'NonConfParityAmt_' + obj.ProdCatDesc, 'value': obj.NonConfParityAmt });
        }
        this.keys = Object.keys(this.allParityList);
    }

    submitParityValues() {
        this.keys.forEach(ele => {
            this.allParityList[ele].forEach(
                element => {
                    if (element.key != ele) {
                        var str = element.key;
                        var n = str.lastIndexOf('_');
                        var result = str.substring(n + 1);

                        var i = 0
                        for (var i = 0; i < this.parityList.length; ++i) {
                            var obj = this.parityList[i];
                            if (obj.ProdCatDesc == result && obj.MaterialDesc.toString() == ele) {

                                if (element.key == 'ParityAmt_TMT') {
                                    obj.ParityAmt = element.value;
                                }
                                if (element.key == 'ParityAmt_PLAIN') {
                                    obj.ParityAmt = element.value;
                                }
                                if (element.key == 'NonConfParityAmt_TMT') {
                                    obj.NonConfParityAmt = element.value;
                                }
                                if (element.key == 'NonConfParityAmt_PLAIN') {
                                    obj.NonConfParityAmt = element.value;
                                }
                            }
                        }
                    }
                }
            )
        })

    }
    setParityDetails() {
        this.parityDetailsTo = this.parityList;
        this.paritySummaryTOObj.ParityDetailList = this.parityList;
        this.submitParityValues();
        if (this.paritySummaryTOObj.Remark == null || this.paritySummaryTOObj.Remark == null) {
            this.errorMsg.showErrorMessage("Please enter Comment", "Error");
            return;
        }
        else {

            this._confirmService.activate("Have you confirm to load Stock details?", "Confirmation")
                .then(res => {
                    if (res) {
                        this.ss.showLoader();
                        this.parityService.postParityDetails(this.paritySummaryTOObj, this.userTo.IdUser)
                            .subscribe(postData => {
                                this.resultMessage = postData
                                this.ss.hideLoader();
                                if (this.resultMessage.Result == 1) {
                                    this.errorMsg.showErrorMessage(this.resultMessage.Text, "Information");
                                    this.parityList = [];
                                    this.allParityList = {};
                                    this.getParityList();
                                }
                                else
                                    this.errorMsg.showErrorMessage(this.resultMessage.Text, "Error");
                            },
                            err => {
                                console.log('Server side error : ' + err)
                                this.ss.hideLoader();
                            })
                    }
                })
        }
    }

    updateValues(keyValue: number, aValue: any) {
        if (aValue.key == 'ParityAmt_TMT' || aValue.key == 'NonConfParityAmt_TMT') {
            var tempTMT;
            var tempPlain;
            this.allParityList[keyValue].forEach(
                element => {

                    if (element.value == null || element.value == '') {
                        element.value = 0;
                    }
                    if (element.key == 'ParityAmt_TMT' && aValue.key == 'ParityAmt_TMT') {
                        tempTMT = element.value;
                    }
                    if (element.key == 'ParityAmt_PLAIN' && aValue.key == 'ParityAmt_TMT') {
                        element.value = tempTMT;
                    }
                    if (element.key == 'NonConfParityAmt_TMT' && aValue.key == 'NonConfParityAmt_TMT') {
                        tempPlain = element.value;
                    }
                    if (element.key == 'NonConfParityAmt_PLAIN' && aValue.key == 'NonConfParityAmt_TMT') {
                        element.value = tempPlain;
                    }
                }
            )
        }
    }
}
import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {AddressInformation} from '../model/address_information';
import {AgentsServices} from '../services/agents_services'

export class AgentsComponent implements OnInit{

dealerAddrInfo : AddressInformation
private agentServices : AgentsServices

getDealerAddrInfo(dealerId : number){
    this.dealerAddrInfo = this.agentServices.getDealerAddrInfo(dealerId);
}


    ngOnInit(){

    }
}


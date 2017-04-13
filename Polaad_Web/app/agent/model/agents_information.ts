//Vijaymala added [8-feb-2017] to declare model for agents information
//like C & F agent,competitor,loader

import{QuotaInformation} from 'app/quota_declaration/model/quota_information'

export class AgentInformation{
    constructor(){}
    public FirstName:string;
    public MidName:string;
    public LastName:string;
    public QuotaInformation:QuotaInformation;//vijaya added to get QuotaInformation model
}

import{Component} from '@angular/core' 
import {Observable} from 'rxjs/Rx';
import {CommonServices} from 'app/common/services/common.services'
import {CommonInformation} from '../common/model/common_Information'

@Component({
    template:''
})
export class CommonFunctions{
constructor (){}
private commonServices:CommonServices
commonInfoList:CommonInformation[]

 getMaterialList() : CommonInformation[]{
     this.commonInfoList= [];
       this.commonServices.getMaterial()
                           .subscribe(
                             commonInfoList=>this.commonInfoList=commonInfoList,
                             err => {
                            // Log errors if any
                            console.log(err);
                        });
                        return this.commonInfoList;
    }

    getOrgList(OrgTypeId : number):CommonInformation[]{
        this.commonInfoList= [];
          this.commonServices.getOrgList(OrgTypeId)
                           .subscribe(
                             commonInfoList=>this.commonInfoList=commonInfoList,
                             err => {
                            // Log errors if any
                            console.log(err);
                        });
            return this.commonInfoList;
    }

    
 }
  

}
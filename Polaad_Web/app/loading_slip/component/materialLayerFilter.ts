import {Component, OnInit,ViewChild, Pipe,Injectable, PipeTransform} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {​LoadingSlipExtTO} from '../model/loading_information'


@Pipe({
  name: 'materialLayerFilter'
})
@Injectable()
export class MaterialLayerFilter implements PipeTransform {
  transform(customers: ​LoadingSlipExtTO[], args: any[]): any {
    return customers.filter(element => element.LoadingLayerid !== -1);
  }
}
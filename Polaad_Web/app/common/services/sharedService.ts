import {Component, Injectable} from '@angular/core'

export interface ILoader {
   isLoading:boolean;
}

@Injectable()
export class sharedService { 
  loader:ILoader={isLoading:false}; 
  showLoader()
  {
    console.log('showloader started');
    this.loader.isLoading=true;
  }
  hideLoader()
  {
    this.loader.isLoading=false;
  }
} 
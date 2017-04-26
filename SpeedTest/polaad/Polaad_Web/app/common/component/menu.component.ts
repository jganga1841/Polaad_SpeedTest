import {Component,Output,OnInit , Input} from '@angular/core';
import { NgFor } from '@angular/common';
import {MenuInformation} from 'app/common/model/menu_information';
import { Router, ActivatedRoute } from '@angular/router';
import {UserTO} from 'app/user/model/userTO'
import {AuthenticationService} from 'app/login/login.services'
import myGlobalVal = require('app/global')
@Component({
 selector:'my-menu',
 template : '<ul  >'+
               '<li class="has-subnav" *ngFor="let myMenu of mySet" attr.id ="{{myMenu.MenuId}}">'+
                '<a [routerLink]="[myMenu.Path]" >'+
                    '<i class="{{myMenu.MenuClass}}"></i>'+
                     '<span class="nav-text">{{myMenu.MenuName}}</span>'+
                    '<b class="arrow fa fa-angle-right" style="padding-top: 12px;"></b> '+
                '</a>'+
                '<b class="arrow"></b>'+  
                '<ul>'+
                    '<li *ngFor="let mySubMenu of myMenu.SubMenuList" attr.id ="{{mySubMenu.MenuId}}">'+
                    ' <a [routerLink]="[mySubMenu.Path]">'+
                         '<i class="{{mySubMenu.MenuClass}}"></i>'+
                         '<span class="nav-text">{{mySubMenu.MenuName}}</span>'+
                       '</a>'+ 
                        '<b class="arrow"></b>'+ 
                     '</li>'+
                    '</ul>'+
                '</li></ul>'
})
  

export class MenuComponent implements OnInit
{
    
    mySet :MenuInformation[];
    mySubMenu:MenuInformation[];
    userTO:UserTO;
    
     constructor(private current: ActivatedRoute
     ,public router : Router
     ,private loginService:AuthenticationService) {

  }
    public getlist()
    {
        
        //to get list from service
         // Get all comments
        //  this.commonService.getMenu()
        //  .subscribe(
        //   mySet => this.mySet = mySet, //Bind to view
        //   err => {
        //   // Log errors if any
        //    console.log(err);
        // });
   
     this.mySet=[
    //  {MenuId:0,MenuName:'Home',ParentId:0, SubMenuList : this.getSubMenuList(0),Path:'',MenuClass:'fa fa-bars fa-fw i-menu '}  ,   
     {MenuId:1,MenuName:'Dashboard',ParentId:0, SubMenuList : this.getSubMenuList(1),Path:'Dashboard',MenuClass:'fa fa-dashboard fa-fw i-menu '}  ,   
     {MenuId:2,MenuName:'Quota',ParentId:0, SubMenuList : this.getSubMenuList(2),Path:'QuotaDeclaration',MenuClass:'fa fa-flask fa-fw i-menu '},
     {MenuId:3,MenuName:'Booking',ParentId:0, SubMenuList : this.getSubMenuList(3),Path:'Booking',MenuClass:'fa fa-pencil-square-o fa-fw i-menu '},   
     {MenuId:4,MenuName:'Loading Slips',ParentId:0, SubMenuList : this.getSubMenuList(4),Path:'LoadingSlips',MenuClass:'fa fa-cart-arrow-down fa-fw i-menu '},
     {MenuId:5,MenuName:'Stock Update',ParentId:0, SubMenuList : this.getSubMenuList(5),Path:'StockUpdate',MenuClass:'fa fa-archive fa-fw i-menu '},
     {MenuId:6,MenuName:'Market Trend',ParentId:0, SubMenuList : this.getSubMenuList(6),Path:'MarketTrend',MenuClass:'fa fa fa-line-chart fa-fw i-menu '},
     {MenuId:7,MenuName:'Freight Update',ParentId:0, SubMenuList : this.getSubMenuList(7),Path:'FreightUpdate',MenuClass:'fa fa-road fa-fw i-menu '},
     {MenuId:8,MenuName:'Masters Setting',ParentId:0, SubMenuList : this.getSubMenuList(8),Path:'MasterSetting',MenuClass:'fa fa-cogs fa-fw i-menu '},
     {MenuId:9,MenuName:'Help',ParentId:0, SubMenuList : this.getSubMenuList(9),Path:'Help',MenuClass:'fa fa-info-circle fa-fw i-menu '},
     {MenuId:10,MenuName:'Feedback',ParentId:0, SubMenuList : this.getSubMenuList(10),Path:'Feedback',MenuClass:'fa fa-comments-o fa-fw i-menu '},
    //  {MenuId:11,MenuName:'Notificaions',ParentId:0, SubMenuList : this.getSubMenuList(11),Path:'Notifications',MenuClass:'fa fa-bell fa-fw i-menu '},
     ];
     this.userTO = this.loginService.getUserTOFromLocalStorage();
     if(this.userTO!=null)
     {
          this.userTO.UserRoleList.forEach(c => {
         if (c.RoleId == myGlobalVal.UserRole.C_AND_F_AGENT) {
             this.mySet=this.mySet.filter(c=>c.MenuId!=2 && c.MenuId!=5 && c.MenuId!=7 && c.MenuId!=8)                  
         }
         if(c.RoleId==myGlobalVal.UserRole.LOADING_PERSON)
         {
             this.mySet=this.mySet.filter(c=>c.MenuId!=2 )                  
         }
        })
     }
    }
    
     public  getSubMenuList(ParentId:number) : MenuInformation[]
     {
        this.mySubMenu=[
         //{MenuId:5,MenuName:'Booking Confirmation By Director',ParentId:5,SubMenuList:null,Path:'BookingConfirmation',MenuClass:'fa fa-tasks fa-fw i-menu '},
        //  {MenuId:6,MenuName:'Change Password',ParentId:1,SubMenuList:null,Path:'ChangePassword'},
        //  {MenuId:6,MenuName:'Active User',ParentId:2,SubMenuList:null,Path:'ActiveUser'},
        //  {MenuId:6,MenuName:'Add User',ParentId:2,SubMenuList:null,Path:'AddUser'},
        //  {MenuId:6,MenuName:'Assign Task',ParentId:3,SubMenuList:null,Path:'AssignTask'},
        //  {MenuId:6,MenuName:'Add Timesheet',ParentId:3,SubMenuList:null,Path:'AddTimesheet'},
        //  {MenuId:6,MenuName:'Projectwise Reports',ParentId:4,SubMenuList:null,Path:'ProjectwiseReports'},
        //  {MenuId:6,MenuName:'Resourcewise Reports',ParentId:4,SubMenuList:null,Path:'ResourcewiseReports'},
        //  {MenuId:6,MenuName:'Timesheet Reports',ParentId:4,SubMenuList:null,Path:'TimesheetReports'},
         ];
            return this.mySubMenu = this.mySubMenu.filter(
            s => s.ParentId === ParentId);
            
     }
    ngOnInit(){
            // Load comments
            this.getlist();
            
    }
   
   

    
 
}

 

      
    
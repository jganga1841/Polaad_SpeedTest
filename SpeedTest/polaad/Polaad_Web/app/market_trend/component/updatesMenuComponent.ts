import{Component,ViewChild,OnInit} from '@angular/core';
import{MenuComponent} from'app/common/component/menu.component'
@Component({
    selector:'my-updatesMenus',
    // template:'<h1>Hello</h1>'
    templateUrl:'app/market_trend/updatesMenusUI.html'
})  



export class UpdatesMenuMenuComponent implements OnInit{
// @ViewChild(MenuComponent)
// public menuComponent:MenuComponent;
ngOnInit()
{
   // this.menuComponent.getlist();
}

}
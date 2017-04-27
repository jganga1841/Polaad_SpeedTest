import{Component,ViewChild,OnInit} from '@angular/core';
import{MenuComponent} from'app/common/component/menu.component'
@Component({
    selector:'my-mastersettings',
    // template:'<h1>Hello</h1>'
    templateUrl:'app/Masters/mastersettings.html'
})  



export class MasterSettingsComponent implements OnInit{
// @ViewChild(MenuComponent)
// public menuComponent:MenuComponent;
ngOnInit()
{
   // this.menuComponent.getlist();
}

}
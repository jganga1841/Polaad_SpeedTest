import { Component ,ElementRef, OnInit} from '@angular/core';
import {bookingServices} from 'app/booking/services/booking_service'
import {CommonServices} from 'app/common/services/common.services'
import {CommonInformation} from 'app/common/model/common_Information'


@Component({
  //moduleId: module.id,
  selector: 'autocomplete-demo',
   host: {
        '(document:click)': 'handleClick($event)',
    },
  templateUrl: 'app/autocomplete/autocomplete-demo.html'
})
export class AutocompleteDemo implements OnInit{

    ngOnInit(){
        this.getBookingLsit()
      //  this.getcdstructureList()
    }
  

getBookingLsit(){
        this.commonServices.getOrgList(2)
                           .subscribe(
                             commonInfoList=>{this.items=commonInfoList
                                },
                             err => {
                            // Log errors if any
                            console.log(err);
                        });
                
                         
        //this.items= this.commonServices.getOrgList(2).then();
}
getcdstructureList(){

     this.commonServices.getMaterial()
                           .subscribe(
                             commonInfoList=>{this.items=commonInfoList
                                },
                             err => {
                            // Log errors if any
                            console.log(err);
                        });
                
                
}
        
query: string = '';
  filteredList: any[] = [];
  elementRef: ElementRef;
  pos: number = -1;
  opened: boolean = false;
  selectedItem: any;
  item: any;
  items: any[] = [{id:0, name: 'Select'}]
  //[
//     { id: 1, name: 'Darth Vader' },
//     { id: 2, name: 'Kylo Ren' },
//     { id: 3, name: 'Rey' },
//     { id: 4, name: 'Ahsoka Tano' },
//     { id: 5, name: 'Snoke' },
//     { id: 6, name: 'Yoda' },
//     { id: 7, name: 'Han Solo' },
//     { id: 8, name: 'Luke Skywalker' },
//     { id: 9, name: 'Obi-Wan Kenobi' },
//     { id: 10, name: 'Darth Maul' },
//     { id: 11, name: 'Chewbacca' },
//     { id: 12, name: 'Boba Fett' },
//     { id: 13, name: 'Darth Sidious' },
//     { id: 14, name: 'Jabba the Hutt' },
//     { id: 15, name: 'Qui-Gon Jinn' },
//     { id: 16, name: 'Finn' },
//     { id: 17, name: 'General Hux' },
//     { id: 18, name: 'Poe Dameron' },
//     { id: 19, name: 'Mace Windu'},
//     { id: 20, name: 'Jar Jar Binks'}
//   ];

  constructor(private el: ElementRef, private commonServices : CommonServices) {
    this.elementRef = el;
    
  }

  filterQuery() {
    this.filteredList = this.items.filter((el: any) => {
      return el.Text.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
    });
  }

  filter(event: any) {
    
    if (this.query !== '') {
      if (this.opened) {

        if ((event.keyCode >= 48 && event.keyCode <= 57) ||
          (event.keyCode >= 65 && event.keyCode <= 90) ||
          (event.keyCode == 8)) {

          this.pos = 0;
          this.filterQuery();

        } else if (event.keyCode != 38 && event.keyCode != 40 && event.keyCode != 13) {
          this.filteredList = this.items;
        }
      } else {
        this.filterQuery();
      }
    } else {
      if (this.opened) {
        this.filteredList = this.items;
      } else {
        this.filteredList = [];
      }
    }

    for (let i = 0; i < this.filteredList.length; i++) {
      this.filteredList[i].selected = false;
    }

    if (this.selectedItem) {
      this.filteredList.map((i) => {
        if (i.id == this.selectedItem.id) {
          this.pos = this.filteredList.indexOf(i);
        }
      })
      this.selectedItem = null;
    }

    // Arrow-key Down
    if (event.keyCode == 40) {
      if (this.pos + 1 != this.filteredList.length)
        this.pos++;
    }

    // Arrow-key Up
    if (event.keyCode == 38) {
      if (this.pos > 0)
        this.pos--;
    }

    if (this.filteredList[this.pos] !== undefined)
      this.filteredList[this.pos].selected = true;

    //enter
    if (event.keyCode == 13) {
      if (this.filteredList[this.pos] !== undefined) {
        this.select(this.filteredList[this.pos]);
      }
    }

    // Handle scroll position of item
    let listGroup = document.getElementById('list-group');
    let listItem = document.getElementById('true');
    if (listItem) {
      listGroup.scrollTop = (listItem.offsetTop - 200);
    }

  }

  select(item: any) {
    this.selectedItem = item;
    this.selectedItem.selected = true;
    this.query = item.Text;
    this.filteredList = [];
    //this.opened = false;
  }

  showAll(input: any) {
    input.select();

    if (this.filteredList.length > 0) {
      this.opened = false;
      this.filteredList = [];
    } else {
      this.opened = true;
      this.filteredList = this.items;
    }
    if (this.query === '') {
      this.clearAll();
    }

    this.clearSelects();
  }

  handleKeyDown(event: any) {
    // Prevent default actions of arrows
    if (event.keyCode == 40 || event.keyCode == 38) {
      event.preventDefault();
    }
  }

  clearAll() {
    if (this.filteredList) {
      for (let i = 0; i < this.filteredList.length; i++)
        this.filteredList[i].selected = false;
    }
  }

  /** Remove selected from all items of the list **/
  clearSelects() {
    if (this.selectedItem) {
      for (let i = 0; i < this.filteredList.length; i++) {
        if (this.filteredList[i].id != this.selectedItem.id)
          this.filteredList[i].selected = false;
      }
    }
  }

  /** Handle outside click to close suggestions**/
  handleClick(event: any) {
    debugger;
    let clickedComponent = event.target;
    let inside = false;
    do {
      if (clickedComponent === this.elementRef.nativeElement) {
        inside = true;
      }
      clickedComponent = clickedComponent.parentNode;
    } while (clickedComponent);
    if (!inside) {
      this.filteredList = [];
      this.opened = false;
    }
  }


}
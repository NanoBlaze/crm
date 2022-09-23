import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/interfaces/Contact';
import { ContactsService } from 'src/app/services/contacts.service';
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState,
  LayoutModule,
} from '@angular/cdk/layout';
@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
})
export class ContactsComponent implements OnInit {
  contacts: Contact[] = [];
  searchText: any;
  tableClass = 'd-none';
  btnClass!: string;
  arrowLeft!: string;
  arrowRight!: string;
  btnClass2!: string;
  htmlStyles!: string;
  tableDisplay: boolean = false;
  cardDisplay: boolean = true;
  constructor(
    private cs: ContactsService,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit(): void {
    

    this.contacts = this.cs.getAll();
    this.tableClass = 'd-none';
    this.btnClass = 'btn-green';
    this.arrowLeft = 'arrowGreen';
    this.arrowRight = 'arrowPrimary';
         this.breakpointObserver.observe(['(max-width: 1200px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.htmlStyles = 'd-none';
        } 
      });
  }
  
  toggleShowTable() {
    if ((this.tableDisplay = !this.tableDisplay)) {
      this.cardDisplay = !this.cardDisplay;
    } else {
      this.tableDisplay = !this.tableDisplay;
    }
    if ((this.btnClass2 = 'btn-green')) {
      this.btnClass = 'btn-primary';
    }
    if ((this.arrowRight = 'arrowGreen')) {
      this.arrowLeft = 'arrowPrimary';
    }
  }
  toggleShowCard() {
    if ((this.cardDisplay = !this.cardDisplay)) {
      this.tableDisplay = !this.tableDisplay;
    } else {
      this.cardDisplay = !this.cardDisplay;
    }
    
        if ((this.btnClass = 'btn-green')) {
      this.btnClass2 = 'btn-primary';
    }
        if ((this.arrowRight = 'arrowPrimary')) {
      this.arrowLeft = 'arrowGreen';
    }
    
  }
}

import { Component, HostListener, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Customer } from 'src/app/interfaces/Customer';
import { CustomersService } from 'src/app/services/customers.service';
import { EditCustomerComponent } from '../edit-customer/edit-customer.component';
import { ViewCustomerComponent } from '../view-customer/view-customer.component';
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState,
  LayoutModule,
} from '@angular/cdk/layout';

@Component({
  selector: 'app-show-customers',
  templateUrl: './show-customer.component.html',
  styleUrls: ['./show-customer.component.css'],
})
export class ShowCustomerComponent implements OnInit {
  customers: Customer[] = [];
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
    private cs: CustomersService,
    private modal: NgbModal,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit(): void {
    this.cs.getCustomers().subscribe((customersData: Customer[]) => {
      this.customers = customersData;
      
    });

    this.breakpointObserver
      .observe([Breakpoints.Small])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.htmlStyles = 'd-none';
        }
      });

    this.tableClass = 'd-none';
    this.btnClass = 'btn-green';
    this.arrowLeft = 'arrowGreen';
    this.arrowRight = 'arrowPrimary';
  }

  // showCardClass() {
  //   this.cardClass = '';

  //   if ((this.btnClass = 'btn-green')) {
  //     this.btnClass2 = 'btn-primary';
  //     this.tableClass = 'd-none';
  //   } else if ((this.arrowLeft = 'arrowGreen')) {
  //     this.arrowRight = 'arrowPrimary';
  //   }

  //   if ((this.arrowLeft = 'arrowGreen')) {
  //     this.arrowRight = 'arrowPrimary';
  //   }
  // }

  // showTableClass() {
  //   this.cardClass = 'd-none';

  //   if ((this.btnClass2 = 'btn-green')) {
  //     this.btnClass = 'btn-primary';
  //     this.tableClass = '';
  //   }

  //   if ((this.arrowRight = 'arrowGreen')) {
  //     this.arrowLeft = 'arrowPrimary';
  //   }
  // }

  deleteCustomer(customer: Customer): void {
    if (confirm('Are you sure?')) {
      this.cs
        .deleteCustomer(customer)
        .then(() => console.log(('Customer deleted successfully!')))
        .catch((err) => console.log(err));
    }
   

  }

  updateCustomer(customer: Customer): void {
    // open the modal
    const modalRef = this.modal.open(EditCustomerComponent, {
      size: 'lg',
      centered: true,
      windowClass: 'dark-modal',
    });
    // pass the id
    modalRef.componentInstance.id = customer.id;
  }

  viewCustomer(customer: Customer): void {
    const modalRef = this.modal.open(ViewCustomerComponent, {
      size: 'lg',
      centered: true,
      windowClass: 'dark-modal',
    });
    modalRef.componentInstance.id = customer.id;
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

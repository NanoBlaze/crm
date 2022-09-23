import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Customer } from 'src/app/interfaces/Customer';
import { CustomersService } from 'src/app/services/customers.service';

@Component({
  selector: 'app-view-customer',
  templateUrl: './view-customer.component.html',
  styleUrls: ['./view-customer.component.css'],
})
export class ViewCustomerComponent implements OnInit {
  @Input() id?: string;
  customer: Customer = { firstName: '', lastName: '', phone: 0, email: '', address:'', notes:'', };
  firstName: string = '';
  customers: any = [];
  constructor(
    private actRoute: ActivatedRoute,
    private cs: CustomersService,
    private activeModal: NgbActiveModal,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.id) {
      this.cs.getCustomerById(this.id).subscribe((customerData: Customer) => {
        this.customer = customerData;
      });
    }
  }

  viewCustomer(): void {
    this.cs.viewCustomer(this.customer).then(() => {
      this.activeModal.close();
    });
  }
}
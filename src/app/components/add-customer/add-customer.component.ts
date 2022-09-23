import { Component, Input, OnInit } from '@angular/core';;
import { Customer } from 'src/app/interfaces/Customer';
import { CustomersService } from 'src/app/services/customers.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {

  customer: Customer = { firstName: '', lastName: '', phone: 0, email: '' , address:'', notes:'', };

  constructor(private cs: CustomersService) { }

  ngOnInit(): void {
  }

  onSubmit(){
    this.cs.addCustomer(this.customer).then(() => {
      alert("Customer was added successfully!");
      this.reset();
    })
    .catch((err) => console.log(err));
  }

  reset(): void {
    this.customer = { firstName: '', lastName: '', phone: 0, email: '', address:'', notes:'', };
  }


}

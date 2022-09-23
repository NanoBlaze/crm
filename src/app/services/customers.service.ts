import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, deleteDoc, doc, docData, DocumentReference, Firestore, setDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Customer } from '../interfaces/Customer';


@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  customersRef = collection(this.firestore, 'customers')

  constructor(private firestore: Firestore) { 

  }

  addCustomer(customer: Customer) : Promise<DocumentReference<Customer>> {
    return addDoc(this.customersRef, customer) as Promise<DocumentReference<Customer>> ;
  }

  getCustomers(): Observable<Customer[]>{
    return collectionData(this.customersRef, {idField:'id'}) as Observable<Customer[]>
  }

  deleteCustomer(customer: Customer): Promise<void> {
    const customerRef = doc(this.firestore, `customers/${customer.id}`)
    return deleteDoc(customerRef) as Promise<void>
  }

  updateCustomer(customer: Customer): Promise<void> {
    const customerRef = doc(this.firestore, `customers/${customer.id}`)
    return setDoc(customerRef, customer) as Promise<void>
  }

  getCustomerById(id: string): Observable<Customer> {
    const customerRef = doc(this.firestore, `customers/${id}`)
    return docData(customerRef, {idField: 'id'}) as Observable<Customer>
  }

  viewCustomer(customer: Customer): Promise<void> {
    const customerRef = doc(this.firestore, `customers/${customer.id}`);
    return setDoc(customerRef, customer) as Promise<void>;
  }
}

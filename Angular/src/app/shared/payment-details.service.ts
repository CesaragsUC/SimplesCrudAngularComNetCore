import { Injectable } from '@angular/core';
import { PaymentDetails } from './payment-details.model';
import{HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PaymentDetailsService {
formData:PaymentDetails
  constructor(private http:HttpClient) { }
  readonly rootUrl ="http://localhost:50922/api";
  list: PaymentDetails[];

  postPaymentDetail(){
   return this.http.post(this.rootUrl+'/PaymentDetail',this.formData)
  }
  putPaymentDetail(){
   return this.http.put(this.rootUrl+'/PaymentDetail/'+this.formData.Id,this.formData)
  }
  deletePaymentDetail(id){
    return this.http.delete(this.rootUrl+'/PaymentDetail/'+id)
   }
   


  refreshList(){
    this.http.get(this.rootUrl+'/PaymentDetail').toPromise().then(res=> this.list = res as PaymentDetails[])
  }
}

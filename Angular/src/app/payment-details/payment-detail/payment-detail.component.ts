import { Component, OnInit } from '@angular/core';
import { PaymentDetailsService } from 'src/app/shared/payment-details.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment-detail',
  templateUrl: './payment-detail.component.html',
  styles: []
})
export class PaymentDetailComponent implements OnInit {

  constructor(private service:PaymentDetailsService,private toastr:ToastrService) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?:NgForm){
    if(form != null) //se formulario estiver vazio reseta todos campos
    form.resetForm();

    this.service.formData={
      Id:0,
      CardOwnerName:'',
      CardNumber:'',
      CVV:'',
      ExpirationDate:''
    }
  }

  onSubmit(form:NgForm){
    if(this.service.formData.Id == 0) 
     this.insertRecord(form);//insert
    else
    this.updateRecord(form);//update
  }

  insertRecord(form:NgForm){
    this.service.postPaymentDetail().subscribe(
      res=>{
        this.resetForm(form);
        this.toastr.success('Cadastrado com sucesso.','Registro Pagamento')
        this.service.refreshList();
      },
      err=>{ 
        console.log(err);
        this.toastr.error('Erro ao cadastrar.','Registro Pagamento')
      }
    )
  }
  updateRecord(form:NgForm){
    this.service.putPaymentDetail().subscribe(
      res=>{
        this.resetForm(form);
        this.toastr.info('Atualizado com  sucesso.','Atualização Pagamento')
        this.service.refreshList();
      },
      err=>{ 
        console.log(err);
        this.toastr.error('Erro ao tentar atualziar pagamento.','Atualização Pagamento')
      }
    )
  }
  deleteData(Id){
    this.service.deletePaymentDetail(Id).subscribe(
      res=>{
        this.toastr.info('Atualizado com  sucesso.','Atualização Pagamento')
        this.service.refreshList();
      },
      err=>{ 
        console.log(err);
        this.toastr.error('Erro ao tentar atualziar pagamento.','Atualização Pagamento')
      }
    )
  }

}

import { Component, OnInit } from '@angular/core';
import { PaymentDetails } from 'src/app/shared/payment-details.model';
import { PaymentDetailsService } from 'src/app/shared/payment-details.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-paymet-detail-list',
  templateUrl: './paymet-detail-list.component.html',
  styles: []
})
export class PaymetDetailListComponent implements OnInit {

  constructor(private service:PaymentDetailsService,private toastr:ToastrService) { }

  ngOnInit() {
    this.service.refreshList();
  }
  populateForm(pd:PaymentDetails){
    //this.service.formData = pd; // modifica a lista em tempo real se alterar no formulario
    this.service.formData = Object.assign({},pd);//evita alterar a lista na tabela caso altere alguma coisa
  }

  onDelete(Id){
    if(confirm('Você tem certeza que deseja deletar esse registro?')){
      this.service.deletePaymentDetail(Id)
      .subscribe(
        res=>{
          this.service.refreshList();//se der certo a deleção
          this.toastr.warning('Deletado com sucesso','Deletar pagamento')
        },err=>{
          console.log(err)
        }
      )
    }

  }

}

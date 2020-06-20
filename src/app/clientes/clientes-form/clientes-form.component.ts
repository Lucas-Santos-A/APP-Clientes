import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Cliente } from '../cliente';
import { ClientesService } from '../../clientes.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-clientes-form',
  templateUrl: './clientes-form.component.html',
  styleUrls: ['./clientes-form.component.css']
})
export class ClientesFormComponent implements OnInit {

  cliente: Cliente;
  success: boolean = false;
  errors: String[];
  id: number;

  constructor(
      private service: ClientesService, 
      private router: Router,
      private activatedRoute: ActivatedRoute
    ) { 
    this.cliente = new Cliente();
  }
  //Se colocar private service: ClientesService no construtor
  //ele já vai ser declarado como atributo da classe 

  ngOnInit(){
    let params : Observable<Params> = this.activatedRoute.params;
    params.subscribe(urlParams => {
      this.id = urlParams['id']; // esse 'id' é referente ao parametro da rota, olhar roteamento de clientes
      if(this.id){
        this.service
        .getClienteById(this.id)
        .subscribe(
          response => this.cliente = response,
          errorResponse => this.cliente = new Cliente()
        );
      }
    })
  }


  voltarParaListagem(){
    this.router.navigate(['/clientes-lista'])
  }
  

  onSubmit(){
    if(this.id){

      this.service
        .atualizar(this.cliente)
        .subscribe(response => {
          this.success = true;
          this.errors = null;
        }, errorResponse => {
          this.errors = ['Erro ao atualizar clientes',errorResponse.error.errors]
          this.success = false;
        }
        )

    }else{
      this.service
        .salvar(this.cliente)
        .subscribe( response => {
          this.success = true;
          this.errors = null;
          this.cliente = response;
        }, errorResponse => {
          this.success = false;
          this.errors = errorResponse.error.errors;
        } 
        )
    }
}

//.subscribe significa que me subescrevi na observable da chamada api no service
//ou seja, a partir desse momento eu recebo notificações de mudanças de estado.
}

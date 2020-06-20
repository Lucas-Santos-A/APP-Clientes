import { Injectable } from '@angular/core';
//Injectable significa que eu posso injetá-lo em outros componentes
//ou em outros serviços
import { Cliente } from './clientes/cliente';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor(private http: HttpClient) {
      
  }

  //Observable é para fazer uma requisição assíncrona
  //Essa requisição ficará sendo observada e quando terminar
  //Podemos reagir no front quando recebermos uma resposta do server
  salvar(cliente: Cliente): Observable<Cliente>{
    return this.http.post<Cliente>('http://localhost:8081/api/clientes', cliente);
  }

  atualizar(cliente: Cliente) : Observable<any>{
    return this.http.put<Cliente>(`http://localhost:8081/api/clientes/${cliente.id}`, cliente);
  }

  getClientes() : Observable<Cliente[]>{
    return this.http.get<Cliente[]>('http://localhost:8081/api/clientes');
  }

  getClienteById(id : number) : Observable<Cliente>{
    return this.http.get<Cliente>(`http://localhost:8081/api/clientes/${id}`);
  }

  deletar(cliente: Cliente) : Observable<any> {
    return this.http.delete<any>(`http://localhost:8081/api/clientes/${cliente.id}`);
  }
  
}

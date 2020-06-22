import { Injectable } from '@angular/core';
//Injectable significa que eu posso injetá-lo em outros componentes
//ou em outros serviços
import { Cliente } from './clientes/cliente';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  apiURL: string = environment.apiURLBase + 'clientes';

  constructor(private http: HttpClient) {
      
  }

  //Observable é para fazer uma requisição assíncrona
  //Essa requisição ficará sendo observada e quando terminar
  //Podemos reagir no front quando recebermos uma resposta do server
  salvar(cliente: Cliente): Observable<Cliente>{
    return this.http.post<Cliente>(`${this.apiURL}`, cliente);
  }

  atualizar(cliente: Cliente) : Observable<any>{
    return this.http.put<Cliente>(`${this.apiURL}/${cliente.id}`, cliente);
  }

  getClientes() : Observable<Cliente[]>{
    return this.http.get<Cliente[]>(this.apiURL);
  }

  getClienteById(id : number) : Observable<Cliente>{
    return this.http.get<Cliente>(`${this.apiURL}/${id}`);
  }

  deletar(cliente: Cliente) : Observable<any> {
    return this.http.delete<any>(`${this.apiURL}/${cliente.id}`);
  }
  
}

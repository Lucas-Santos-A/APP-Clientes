import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from './usuario';
import { AuthService } from '../auth.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username: string;
  password: string;
  cadastrando: boolean;
  mensagemSucesso: string;
  errors: String[];

  constructor(
    private router: Router,
    private authService: AuthService
    ) { }

  onSubmit() {
    this.router.navigate(['/home'])
  }

  preparaCadastrar(event){
    event.preventDefault();
    this.cadastrando = true;
    this.mensagemSucesso = null;
  }

  cancelaCadastro(){
    this.cadastrando = false;
    this.errors = [];
  }

  cadastrar(){
    const usuario: Usuario = new Usuario();
    usuario.username = this.username;
    usuario.password = this.password;
    this.authService.salvar(usuario)
    .subscribe(response => {
      this.mensagemSucesso = "Cadastro realizado com sucesso! Efetue o login"
      this.errors = [];
      this.cadastrando = false;
      this.username = '';
      this.password = '';
    }, errorResponse => {
      this.errors = errorResponse.error.errors;
      this.mensagemSucesso = null;
    })
  }

}

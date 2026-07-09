import http from 'k6/http';
import { sleep } from 'k6';
import Login from '../request/login.js';
import data from '../data/usuario-adm.json'

export default function () {
    let login = new Login()
    group('realizar login e captar o token', () =>{
        login.acesso(data.usuarioOK.email, data.usuarioOK.password)

    })

    group('listar os usuários cadastrados', () =>{
        login.getToken()
    })
}
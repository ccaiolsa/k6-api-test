// import necessary module
import { check, group } from 'k6';
import http from 'k6/http';
import Utils from '../utils/utils.js';
import Clientes from '../request/clientes.js';

export default function(){
    let token_ADM
    let user_id
    const cliente = new Clientes()

    group('Realizar login', () =>{
        let resp = cliente.login("admin@biblioteca.com", "admin123")
        let parse = JSON.parse(resp.body)
        token_ADM = parse.token_for_swagger
        check(resp, {
            'status code: 200': (resp) => resp.status == 200
        })
    });

    group ('Cadastras um cliente', () =>{
        const num = Math.floor(Math.random() * 1000)
        let resp = cliente.cadastrar_usuario(`usuario${num}`, `test${num}@email.com`, `teste${num}`)
        let parse = JSON.parse(resp.body)
        user_id = parse.user.id
        check(resp, 
            {
            "status code: 201": (resp) => resp.status == 201
            });

    });

    group ('Listar usuarios', () =>{
        let resp = cliente.listar_usuarios(token_ADM)
        let parse = JSON.parse(resp.body)
        let users = parse.pagination.totalUsers
        //console.log(users)

        check(resp, {
            'status code: 200': (resp) => resp.status == 200
        })
    });

    group ('Escluir usuário', () =>{
        console.log(user_id)
        console.log(token_ADM)
        let resp = cliente.remover_usuario(token_ADM, user_id)
        //console.log(resp)
        check(resp, {
            'status code: 200': (resp) => resp.status == 200
        })
    })

}
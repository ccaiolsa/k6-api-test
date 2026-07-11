// import necessary module
import { check } from 'k6';
import http from 'k6/http';
import Utils from '../utils/utils.js';

export default class Clientes{

    login(email, senha)
    {
    let url = `${Utils.getBaseUrl()}/login`
    let payload = JSON.stringify
    (
        {
        "email": email,
        "password": senha
        }
    )
    let params ={ headers:{"Content-Type": "application/json", "Accept": "application/json"},
    };
    return http.post(url, payload, params)

    };

    cadastrar_usuario(nome, email, senha){
        let url = `${Utils.getBaseUrl()}/users` 
        let body = 
        {
            "name": nome,
            "email": email,
            "password": senha
        }

        let params ={
            headers:{"Content-Type": "application/json", "Accept": "application/json"}
        };
        return http.post(url, JSON.stringify(body), params);
        
    };

    listar_usuarios(token_ADM){

        // 'http://localhost:3000/api/users?page=1'
        const url = `${Utils.getBaseUrl()}/users?page=1`
        const params = { headers: 
            {
            "Content-Type": "application/json", 
            "Accept": "application/json",
            "Authorization": `Bearer ${token_ADM}`
        }}
        
        return http.get(url, params)
    };
    remover_usuario(token_ADM, user_id){
        const cod = encodeURIComponent(user_id)
        const url = `${Utils.getBaseUrl()}/users/${cod}`
        const params ={ headers:
            {
            "Content-Type": "application/json", 
            "Accept": "application/json",
            "Authorization": `Bearer ${token_ADM}` 
            }}
        
        return http.del(url, null, params)

    }

};
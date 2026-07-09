import http from 'k6/http';
import Utils from '../utils/utils.js';

export default class Login {
    #token

    acesso(email, senha) {
        let resp = http.post(`${Utils.getBaseUrl()}/login`, JSON.stringfy(
            {
            "email": email,
            "password": senha
            }
        ), {
            headers:{
                "Content-Type": "application/json", 
                "Accept": "application/json"
            }
        })
        this.#token = resp.json('token_for_swagger')
         check(request, {
                        "status: 201": (r) => r.status === 201
        });
    }

    getToken(){
        return this.#token
    }

}
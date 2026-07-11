// import necessary module
import { check } from 'k6';
import http from 'k6/http';
import Utils from '../utils/utils.js';

export default class Produtos{

    listar_produtos(categoria)
    {
        let cod = encodeURIComponent(categoria)
        // Deve guiar para o endereço http://localhost:3000/api/books?category=Literatura%20Brasileira&available=true&offset=0'
        let resp = http.get(`${Utils.getBaseUrl()}/books?page=1&limit=12&category=${cod}`)
    
        check(resp, 
        {
        "Status code: 200": (resp) => resp.status == 200,
        });


    return resp
    }

    buscar_Livro(nome){
        let cod = encodeURIComponent(nome)
        // 'http://localhost:3000/api/books?search=O%20senhor%20dos%20an%C3%A9is&offset=0&order=ASC
        let resp = http.get(`${Utils.getBaseUrl()}/books?search=${cod}`)

        check(resp, 
        {
        "Status code: 200": (resp) => resp.status == 200,
        });

    return resp
    }
    parse_body(nome){
        let cod = encodeURIComponent(nome)
        // 'http://localhost:3000/api/books?search=O%20senhor%20dos%20an%C3%A9is&offset=0&order=ASC
        let resp = http.get(`${Utils.getBaseUrl()}/books?search=${cod}`)

        // Parseando o body
        let parse = JSON.parse(resp.body)
        return parse.books[0].id
    }
    buscar_livro_ID(id){
        let cod = encodeURIComponent(id)

        let resp = http.get(`${Utils.getBaseUrl()}/books/${cod}`)

        check(resp, {
            'Status code: 200': (resp) => resp.status == 200
        })
        return resp
    }
    buscar_livro_ERR(id){
        let cod = encodeURIComponent(id)

        let resp = http.get(`${Utils.getBaseUrl()}/books/${cod}`)

        check(resp, {
            'Status Code: 400': (resp) => resp.status == 400
        })
        return resp
    }
};
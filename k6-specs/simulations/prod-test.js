// import necessary module
import { check, group } from 'k6';
import http from 'k6/http';
import Utils from '../utils/utils.js';
import Produtos from '../request/produtos.js';

export default function () {
    let id;

    let produtos = new Produtos()
    

    group('Listar livros por categorias', () =>{
        produtos.listar_produtos('Romance')

    });

    group('Buscar Livro pelo nome', () =>{
        const titulo = 'O Senhor dos Anéis';
        produtos.buscar_Livro(titulo)

        id = produtos.parse_body(titulo)
        
    });
    group('Buscar Livro pelo ID', () =>{
        produtos.buscar_livro_ID(id)
    });

    group('Falhar ao buscar um ID inexistente', () =>{
        produtos.buscar_livro_ERR(70)
    })


}
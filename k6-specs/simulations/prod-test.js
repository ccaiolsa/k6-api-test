// import necessary module
import { check, group } from 'k6';
import http from 'k6/http';
import Utils from '../utils/utils.js';
import Produtos from '../request/produtos.js';

export const options = {
    thresholds: {
        http_req_failed: ['rate<0.01'],
        http_req_duration: ['p(99)<1000'],
  },
    scenarios: {
        average_load: {
            executor: 'ramping-vus',
        stages: [
            // aumenta gradativamente para 20UV por 10s
            { duration: '10s', target: 20 },
            // Mantem a carga de 20UV por 50s
            { duration: '50s', target: 20 },
            // Reduz a carga para 0UV durante 5s
            { duration: '5s', target: 0 },
      ],
    },
  },
};


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
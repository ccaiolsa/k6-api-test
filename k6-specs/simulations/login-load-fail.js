import { check } from 'k6';
import http from 'k6/http';

export const options = {
  // define o objetivo de resposta ao fazer o teste de performance
  // Nesse caso rate<0.01 significa acertar 99% do teste
  // p(99)<1000 cada request deve demorar menos de 1s (1000ms)

  thresholds: {
    http_req_failed: [{threshold: 'rate<0.01', abortOnFail: true}],
    http_req_duration: ['p(99)<1000'],
  },
  scenarios: {
    Teste_falha: {
      executor: 'ramping-vus',
      stages: [
        { duration: '10s', target: 20 },
        { duration: '50s', target: 20 },
        { duration: '50s', target: 40 },
        { duration: '50s', target: 60 },
        { duration: '50s', target: 80 },
        { duration: '50s', target: 100 }
        
      ],
    },
  },
};

export default function () {
  const url = 'http://localhost:3000/api/login';
  const payload = JSON.stringify(
    {
    email: 'usuario@teste.com',
    password: 'user123',
    });

  const params = {
    headers: {
      "Content-Type": "application/json", "Accept": "application/json",
    },
  };


  const res = http.post(url, payload, params);


  check(res, {
    'response code was 200': (res) => res.status == 200,
  });
}
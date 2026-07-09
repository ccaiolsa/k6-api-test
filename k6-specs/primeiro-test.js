import http from 'k6/http';
import { sleep } from 'k6';
export const options = {
  vus: 10,
  duration: '30s',
};
export default function () {
  http.get('http://test.k6.io');
  sleep(1);
}

// Possibilita realizar um teste de carga com 10 usuários virtuais (VUs) durante 30 segundos, 
// enviando requisições GET para a URL 'http://test.k6.io' e aguardando 1 segundo entre cada requisição.
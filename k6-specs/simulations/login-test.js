// import necessary module
import { check } from 'k6';
import http from 'k6/http';

export default function () {
  // define URL and payload
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

  // send a post request and save response as a variable
  const res = http.post(url, payload, params);
  check(res, {
    'status code: 200': (res) => res.status == 200,
  })
}
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 20,
  duration: '60s',
  thresholds: {
    http_req_failed: ['rate<0.01'],
    http_req_duration: ['p(95)<500'],
  },
};

const URL = __ENV.URL || 'http://localhost:8083/api/clientes';

export default function () {
  const email = `carga_${__VU}_${__ITER}_${Date.now()}@test.com`;

  const registro = http.post(URL, JSON.stringify({ nombre: 'Prueba carga', email: email }), {
    headers: { 'Content-Type': 'application/json' },
  });
  check(registro, { 'registro 201': (r) => r.status === 201 });

  const lista = http.get(URL);
  check(lista, { 'listar 200': (r) => r.status === 200 });

  sleep(1);
}

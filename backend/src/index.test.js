import { test } from 'node:test';
import assert from 'node:assert/strict';
import app from './index.js';

let server;
let base;
const headers = { 'Content-Type': 'application/json' };

test.before(async () => {
  await new Promise((resolve) => {
    server = app.listen(0, resolve);
  });
  base = `http://localhost:${server.address().port}`;
});

test.after(() => server.close());

test('GET /api/health returns ok', async () => {
  const res = await fetch(`${base}/api/health`);
  assert.equal(res.status, 200);
  assert.equal((await res.json()).status, 'ok');
});

test('register succeeds, duplicate email is rejected', async () => {
  const body = JSON.stringify({ name: 'Asha', email: 'asha@example.com', password: 'pw123' });
  const first = await fetch(`${base}/api/auth/register`, { method: 'POST', headers, body });
  assert.equal(first.status, 201);
  const second = await fetch(`${base}/api/auth/register`, { method: 'POST', headers, body });
  assert.equal(second.status, 400);
});

test('login fails with wrong credentials', async () => {
  const res = await fetch(`${base}/api/auth/login`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ email: 'nobody@example.com', password: 'x' }),
  });
  assert.equal(res.status, 401);
});

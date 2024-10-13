import { Hono } from 'hono';
import { handle } from 'hono/vercel';

export const runtime = 'edge';

const app = new Hono().basePath('/api');

const routes = app.get('/hello', (ctx) => {
  return ctx.json({ hello: 'world!' });
});

export const GET = handle(app);
export type AppType = typeof routes;

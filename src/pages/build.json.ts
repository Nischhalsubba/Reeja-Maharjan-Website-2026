import process from 'node:process';
import type { APIRoute } from 'astro';

export const prerender = true;

const commit = process.env.CF_PAGES_COMMIT_SHA ?? process.env.GITHUB_SHA ?? 'local';
const branch = process.env.CF_PAGES_BRANCH ?? process.env.GITHUB_REF_NAME ?? 'local';
const builtAt = new Date().toISOString();

export const GET: APIRoute = () =>
  new Response(
    JSON.stringify(
      {
        commit,
        branch,
        builtAt
      },
      null,
      2
    ),
    {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'no-store, max-age=0'
      }
    }
  );

import type { APIRoute } from 'astro';

export const prerender = true;

const env = import.meta.env as Record<string, string | undefined>;
const commit = env.CF_PAGES_COMMIT_SHA ?? env.GITHUB_SHA ?? 'local';
const branch = env.CF_PAGES_BRANCH ?? env.GITHUB_REF_NAME ?? 'local';
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

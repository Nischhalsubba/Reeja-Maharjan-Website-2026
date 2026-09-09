#!/usr/bin/env bash
set -euo pipefail

: "${GH_TOKEN:?GH_TOKEN is required}"
: "${GITHUB_API_URL:?GITHUB_API_URL is required}"
: "${GITHUB_REPOSITORY:?GITHUB_REPOSITORY is required}"
: "${GITHUB_SHA:?GITHUB_SHA is required}"
: "${GITHUB_SERVER_URL:?GITHUB_SERVER_URL is required}"
: "${GITHUB_RUN_ID:?GITHUB_RUN_ID is required}"
: "${CLOUDFLARE_API_TOKEN:?CLOUDFLARE_API_TOKEN GitHub secret is required}"
: "${CLOUDFLARE_ACCOUNT_ID:?CLOUDFLARE_ACCOUNT_ID GitHub secret is required}"
: "${OLD_PROJECT:?OLD_PROJECT is required}"
: "${NEW_PROJECT:?NEW_PROJECT is required}"
: "${REPO_OWNER:?REPO_OWNER is required}"
: "${REPO_OWNER_ID:?REPO_OWNER_ID is required}"
: "${REPO_ID:?REPO_ID is required}"
: "${REPO_NAME:?REPO_NAME is required}"
: "${PRODUCTION_DOMAIN:?PRODUCTION_DOMAIN is required}"

RUN_URL="${GITHUB_SERVER_URL}/${GITHUB_REPOSITORY}/actions/runs/${GITHUB_RUN_ID}"
STATUS_URL="${GITHUB_API_URL}/repos/${GITHUB_REPOSITORY}/statuses/${GITHUB_SHA}"
CF_TOKEN="$CLOUDFLARE_API_TOKEN"
ACCOUNT_ID="$CLOUDFLARE_ACCOUNT_ID"
echo "::add-mask::${CF_TOKEN}"

publish_status() {
  local state="$1"
  local target_url="$2"
  local description="$3"
  local context="$4"
  curl --fail-with-body --silent --show-error \
    --request POST \
    --header "Authorization: Bearer ${GH_TOKEN}" \
    --header "Accept: application/vnd.github+json" \
    --header "X-GitHub-Api-Version: 2022-11-28" \
    "${STATUS_URL}" \
    --data "$(jq -nc \
      --arg state "$state" \
      --arg target_url "$target_url" \
      --arg description "$description" \
      --arg context "$context" \
      '{state:$state,target_url:$target_url,description:$description,context:$context}')" \
    >/dev/null
}

cf_call() {
  local method="$1"
  local url="$2"
  local body="${3:-}"
  if [ -n "$body" ]; then
    curl --silent --show-error \
      --request "$method" \
      --header "Authorization: Bearer ${CF_TOKEN}" \
      --header "Content-Type: application/json" \
      --data "$body" \
      "$url"
  else
    curl --silent --show-error \
      --request "$method" \
      --header "Authorization: Bearer ${CF_TOKEN}" \
      --header "Content-Type: application/json" \
      "$url"
  fi
}

api_success() {
  jq -e '.success == true' >/dev/null 2>&1
}

api_errors() {
  jq -c '[.errors[]? | {code,message}]'
}

echo 'Validating one-time Cloudflare API credentials.'
OLD_INFO="$(cf_call GET "https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/pages/projects/${OLD_PROJECT}")"
if ! printf '%s' "$OLD_INFO" | api_success; then
  echo "Unable to access Cloudflare Pages project ${OLD_PROJECT} with the supplied account ID/token."
  printf '%s' "$OLD_INFO" | api_errors
  exit 1
fi
publish_status pending "$RUN_URL" 'Cloudflare credentials accepted; preparing Git Pages project.' 'Cloudflare Cutover'

NEW_INFO="$(cf_call GET "https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/pages/projects/${NEW_PROJECT}")"
if printf '%s' "$NEW_INFO" | api_success; then
  SOURCE_TYPE="$(printf '%s' "$NEW_INFO" | jq -r '.result.source.type // ""')"
  SOURCE_REPO="$(printf '%s' "$NEW_INFO" | jq -r '.result.source.config.repo_name // ""')"
  if [ "$SOURCE_TYPE" != 'github' ] || [ "$SOURCE_REPO" != "$REPO_NAME" ]; then
    echo "Existing project ${NEW_PROJECT} is not the expected GitHub-backed project; refusing to reuse it."
    exit 1
  fi
else
  CREATE_PAYLOAD="$(jq -nc \
    --arg name "$NEW_PROJECT" \
    --arg owner "$REPO_OWNER" \
    --arg owner_id "$REPO_OWNER_ID" \
    --arg repo_id "$REPO_ID" \
    --arg repo_name "$REPO_NAME" \
    '{
      name:$name,
      production_branch:"main",
      build_config:{
        build_caching:true,
        build_command:"npm run build",
        destination_dir:"dist",
        root_dir:"site"
      },
      source:{
        type:"github",
        config:{
          deployments_enabled:true,
          owner:$owner,
          owner_id:$owner_id,
          repo_id:$repo_id,
          repo_name:$repo_name,
          production_branch:"main",
          production_deployments_enabled:true,
          preview_deployment_setting:"all",
          pr_comments_enabled:true,
          path_excludes:[],
          path_includes:["*"],
          preview_branch_excludes:[],
          preview_branch_includes:[]
        }
      }
    }')"
  NEW_INFO="$(cf_call POST "https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/pages/projects" "$CREATE_PAYLOAD")"
  if ! printf '%s' "$NEW_INFO" | api_success; then
    echo 'Unable to create the Git-integrated Cloudflare Pages project.'
    printf '%s' "$NEW_INFO" | api_errors
    exit 1
  fi
fi

SUBDOMAIN="$(printf '%s' "$NEW_INFO" | jq -r '.result.subdomain // empty')"
if [ -z "$SUBDOMAIN" ]; then
  NEW_INFO="$(cf_call GET "https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/pages/projects/${NEW_PROJECT}")"
  SUBDOMAIN="$(printf '%s' "$NEW_INFO" | jq -r '.result.subdomain // empty')"
fi
[ -n "$SUBDOMAIN" ] || { echo 'New Pages project did not return a pages.dev subdomain.'; exit 1; }

echo "CLOUDFLARE_PROJECT_READY project=${NEW_PROJECT} origin=https://${SUBDOMAIN}"
publish_status pending "$RUN_URL" 'Cloudflare Git project ready; waiting for finalization commit.' 'Cloudflare Cutover'
echo 'Waiting for the repository cleanup commit that removes the one-time cutover workflow and script.'

TARGET_SHA=''
for attempt in $(seq 1 144); do
  MAIN_JSON="$(curl --fail-with-body --silent --show-error \
    --header "Authorization: Bearer ${GH_TOKEN}" \
    --header 'Accept: application/vnd.github+json' \
    --header 'X-GitHub-Api-Version: 2022-11-28' \
    "${GITHUB_API_URL}/repos/${GITHUB_REPOSITORY}/branches/main")"
  MAIN_SHA="$(printf '%s' "$MAIN_JSON" | jq -r '.commit.sha')"
  if [ "$MAIN_SHA" != "$GITHUB_SHA" ]; then
    TARGET_SHA="$MAIN_SHA"
    break
  fi
  sleep 5
done
[ -n "$TARGET_SHA" ] || { echo 'Timed out waiting for the cutover finalization commit.'; exit 1; }
echo "Cutover target commit: ${TARGET_SHA}"

NEW_ORIGIN="https://${SUBDOMAIN}"
echo "Waiting for ${NEW_ORIGIN} to publish ${TARGET_SHA}."
NEW_DEPLOYED=0
for attempt in $(seq 1 120); do
  LIVE_SHA="$(curl --silent --show-error --max-time 10 "${NEW_ORIGIN}/build.json?cutover=${attempt}" \
    | node -e "let s='';process.stdin.on('data',d=>s+=d).on('end',()=>{try{process.stdout.write(JSON.parse(s).commit||'')}catch{}})" \
    || true)"
  if [ "$LIVE_SHA" = "$TARGET_SHA" ]; then
    NEW_DEPLOYED=1
    break
  fi
  sleep 5
done
[ "$NEW_DEPLOYED" = '1' ] || { echo "New Pages origin did not reach ${TARGET_SHA}."; exit 1; }
echo "New Pages origin is serving ${TARGET_SHA}."

OLD_DOMAINS="$(cf_call GET "https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/pages/projects/${OLD_PROJECT}/domains")"
if ! printf '%s' "$OLD_DOMAINS" | api_success; then
  echo 'Unable to read custom domains from the existing production project.'
  printf '%s' "$OLD_DOMAINS" | api_errors
  exit 1
fi

mapfile -t DOMAINS < <(printf '%s' "$OLD_DOMAINS" | jq -r '.result[].name')
if [ "${#DOMAINS[@]}" -eq 0 ]; then
  echo 'Existing Pages project has no custom domains to transfer.'
  exit 1
fi
if ! printf '%s\n' "${DOMAINS[@]}" | grep -Fxq "$PRODUCTION_DOMAIN"; then
  echo "Expected production domain ${PRODUCTION_DOMAIN} is not attached to ${OLD_PROJECT}."
  exit 1
fi

for domain in "${DOMAINS[@]}"; do
  echo "Transferring custom domain: ${domain}"
  DOMAIN_ESCAPED="$(node -p "encodeURIComponent(process.argv[1])" "$domain")"

  DELETE_OLD="$(cf_call DELETE "https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/pages/projects/${OLD_PROJECT}/domains/${DOMAIN_ESCAPED}")"
  if ! printf '%s' "$DELETE_OLD" | api_success; then
    echo "Failed to detach ${domain} from the old project."
    printf '%s' "$DELETE_OLD" | api_errors
    exit 1
  fi

  ADD_PAYLOAD="$(jq -nc --arg name "$domain" '{name:$name}')"
  ADD_NEW=''
  ADDED=0
  for add_attempt in $(seq 1 18); do
    ADD_NEW="$(cf_call POST "https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/pages/projects/${NEW_PROJECT}/domains" "$ADD_PAYLOAD")"
    if printf '%s' "$ADD_NEW" | api_success; then
      ADDED=1
      break
    fi
    sleep 5
  done

  if [ "$ADDED" != '1' ]; then
    echo "Failed to attach ${domain} to the new project; attempting rollback."
    cf_call POST "https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/pages/projects/${OLD_PROJECT}/domains" "$ADD_PAYLOAD" >/dev/null || true
    printf '%s' "$ADD_NEW" | api_errors
    exit 1
  fi

  ACTIVE=0
  for domain_attempt in $(seq 1 90); do
    DOMAIN_INFO="$(cf_call GET "https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/pages/projects/${NEW_PROJECT}/domains/${DOMAIN_ESCAPED}")"
    STATUS="$(printf '%s' "$DOMAIN_INFO" | jq -r '.result.status // empty')"
    if [ "$STATUS" = 'active' ]; then
      ACTIVE=1
      break
    fi
    if [ "$STATUS" = 'error' ] || [ "$STATUS" = 'blocked' ] || [ "$STATUS" = 'deactivated' ]; then
      break
    fi
    sleep 5
  done

  if [ "$ACTIVE" != '1' ]; then
    echo "${domain} did not become active on the new project; attempting rollback."
    cf_call DELETE "https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/pages/projects/${NEW_PROJECT}/domains/${DOMAIN_ESCAPED}" >/dev/null || true
    cf_call POST "https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/pages/projects/${OLD_PROJECT}/domains" "$ADD_PAYLOAD" >/dev/null || true
    exit 1
  fi
done

echo 'Waiting for the canonical production domain to serve the cutover commit.'
DOMAIN_READY=0
for attempt in $(seq 1 120); do
  LIVE_SHA="$(curl --silent --show-error --max-time 10 "https://${PRODUCTION_DOMAIN}/build.json?cutover=${attempt}" \
    | node -e "let s='';process.stdin.on('data',d=>s+=d).on('end',()=>{try{process.stdout.write(JSON.parse(s).commit||'')}catch{}})" \
    || true)"
  if [ "$LIVE_SHA" = "$TARGET_SHA" ]; then
    DOMAIN_READY=1
    break
  fi
  sleep 5
done
[ "$DOMAIN_READY" = '1' ] || { echo "Canonical domain did not reach ${TARGET_SHA}."; exit 1; }

npm ci --no-audit --no-fund
SITE_ORIGIN="https://${PRODUCTION_DOMAIN}" \
EXPECTED_COMMIT="$TARGET_SHA" \
SMOKE_ATTEMPTS='12' \
SMOKE_DELAY_MS='5000' \
PRODUCTION_REPORT='cloudflare-git-cutover-report.json' \
node scripts/smoke-production.mjs

npm install --no-save --no-package-lock @playwright/test@1.62.1
npx playwright install --with-deps chromium
BROWSER_TEST_ORIGIN="https://${PRODUCTION_DOMAIN}" npx playwright test tests/browser --reporter=line

echo "Cloudflare Git cutover completed successfully for ${TARGET_SHA}."

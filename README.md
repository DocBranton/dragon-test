# WDP DRAGON — Node.js Hello World

Minimal native Databricks App organized according to WDP's DRAGON-specific application layout.

## Repository structure

```
dragon-test/
├── .gitlab-ci.yml
├── databricks.yml
├── resources/
│   └── hello_world.app.yml
├── src/
│   └── app/
│       ├── app.yaml
│       ├── package.json
│       └── server.js
├── tests/
│   └── server.test.js
└── examples/
    └── container-only.gitlab-ci.yml
```

## WDP deployment target

- GitLab route: `platform/dragon/routes/databricks-app-deploy.yml`
- Databricks host: `https://advana-build-blade.cloud.databricks.mil`
- Intended workspace ID: `40275338454178` (verify in deployment log)
- Bundle target: `prod` with `mode: production`, as prescribed by WDP documentation
- App name: `dragon-test-hello-world`
- Source: `src/app/`
- DRAGON supplies workspace identity, credentials and managed deployment path. No credentials or `root_path` are stored here.
- The source is mirrored from GitHub into WDP GitLab. This project's pipeline uses **manual-only** `workflow: rules` to prevent deployments from mirror updates.
- Unlike the earlier deploy-only test, the configuration now performs **deploy and run** (`DATABRICKS_DEPLOY_ONLY=false`). **Running the pipeline can actually create and start an App**.

## Local smoke test

Requires Node.js 20+:

```bash
node --test tests/server.test.js
node src/app/server.js
# Browse http://localhost:8000 and http://localhost:8000/health
```

No npm dependencies or secrets required.

## First WDP test

1. Pull/mirror latest GitHub main into the WDP GitLab project.
2. Confirm `databricks.yml`, `resources/hello_world.app.yml`, and `src/app/app.yaml` exist.
3. Review and approve target workspace, app name and release/test authorization.
4. Validate the pipeline in GitLab CI editor.
5. Manually trigger the pipeline only when authorized, and inspect downstream DRAGON security scan and deployment logs.
6. Verify the logged workspace ID is `40275338454178` and locate the App in the `advana-build-blade` Apps page.
7. Validate that the homepage, `/health`, and source revision match the scanned commit.

## Known blocker

The previous DRAGON run reached `databricks bundle deploy` but failed with `default auth: cannot configure default credentials` using OAuth M2M. This is **not yet proven resolved** by the restructure. DRAGON's service principal and workspace authentication may require platform-team support. Do not embed credentials in this repository.

## Security

DRAGON documentation indicates TruffleHog, SonarQube, ClamAV, Checkov and bundle validation. Verify which gates actually execute and their results in the WDP pipeline. This application does not use SQL warehouses, Unity Catalog, or user API scopes. Application access groups should be configured as WDP-approved permissions in the app resource before broader release.

The Dockerfile and `examples/container-only.gitlab-ci.yml` are optional alternative assessment examples and are **not** used by the native Databricks Apps route.

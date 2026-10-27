# WDP / DRAGON Node.js Hello World

Minimal, dependency-free Node.js web app for validating **two separate gates**:

1. WDP GitLab to DRAGON container build, scanning, and evidence.
2. WDP Databricks Apps runtime deployment, after authorization and a verified handoff.

**This GitHub repository does not automatically deploy into WDP.**

## Contents

- `server.js`: HTTP app at `/` and `/health`.
- `package.json`: Node startup and tests; no external packages.
- `app.yaml`: Databricks Apps startup command.
- `Dockerfile`: example container; replace public base image with WDP-approved image when needed.
- `.gitlab-ci.yml`: **unverified candidate** DRAGON container-only route.
- `tests/server.test.js`: local smoke tests.

## Run locally

Requires Node.js 20+.

```bash
npm test
npm start
# Open http://localhost:8000/ and http://localhost:8000/health
```

## WDP GitLab onboarding

1. Create a new non-production project on https://gitlab.advana.data.mil/.
2. Import/mirror this GitHub source to WDP GitLab using your authorized process.
3. The screenshot confirms DRAGON lives at `platform/dragon` on WDP GitLab and exposes `routes/container-only.yml`. The test uses `ref: main` until an approved immutable version tag is verified. Validate with GitLab CI Lint before executing.
4. Check route rules, allowed registry/base images, CI/CD variables, project trigger permissions, and runners.
5. Validate YAML using GitLab CI Lint and initiate a non-production run under permitted branch/tag rules.
6. Collect commit SHA, pipeline/downstream IDs, Tekton run ID, build outcome, scan severities, SBOM reports, approval decisions, and failures/skips.
7. Treat `TRIVY_EXIT_CODE: "0"` as **report-only**, not an enforced vulnerability gate. Follow WDP Cyber guidance before enforcing security policy.

## Databricks-specific DRAGON routes visible in WDP

The WDP DRAGON repository screenshot also shows `routes/databricks-app-deploy.yml` and `routes/databricks-only.yml`. Review their contents and associated docs before attempting to automate Databricks Apps deployment. The container-only route remains the deliberately limited first test.

## Databricks Apps deployment is a separate gate

Target: https://advana-blade.cloud.databricks.mil/ (workspace `40275338454178`).

Confirm with WDP whether native Node.js Apps are authorized, how code is promoted into the workspace, and what ties the runtime source to a DRAGON-assessed commit. Deploy only via the authorized route. Verify home page, health endpoint, application logs, and matching source revision.

**DRAGON's container promotion and Helm/Kubernetes route does not by itself establish Databricks Apps deployment support.**

## Questions for WDP

- Is DRAGON mirrored/accessible on this GitLab host and which release/ref should we pin?
- Does container-only produce sufficient security evidence? Which scanner findings actually block a release?
- What approved Node base images and dependency registries can be used?
- Is there an approved DRAGON-to-Databricks Apps release handoff?
- How are findings, exceptions, approvals, and deployed revisions correlated?

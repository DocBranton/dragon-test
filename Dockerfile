# Optional container-only test; not used by the WDP native Databricks App DRAGON route.
# Replace public image with WDP-approved base image before container testing.
FROM node:22-alpine
WORKDIR /app
COPY src/app/package.json src/app/server.js ./
ENV NODE_ENV=production
ENV PORT=8000
USER node
EXPOSE 8000
CMD ["node", "server.js"]

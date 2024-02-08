const dotenv = require("dotenv");
dotenv.config({ path: "./.env.deploy" });

const {
  DEPLOY_USER,
  DEPLOY_HOST,
  DEPLOY_REF,
  DEPLOY_REPOSITORY,
  DEPLOY_PATH,
} = process.env;

module.exports = {
  apps: [{
    name: "mesto-frontend",
    script: "build/index.html",
    env_production: {
      NODE_ENV: "production"
    },
  }],
  deploy: {
    production: {
      key: "/c/Users/M2entertainment/.ssh/id_ed25519_yacloud",
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: DEPLOY_REPOSITORY,
      path: DEPLOY_PATH,
      'post-deploy': 'cd ~/mesto-project-frontend/current && pwd && npm i && npm run build',
    },
  },
}

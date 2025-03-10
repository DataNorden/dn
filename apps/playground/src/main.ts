process.env.TZ = 'UTC';
import cp from 'child_process';

const playground = process.argv[2];

if (!playground) {
  console.error('Please provide a playground name.');
  process.exit(1);
}

cp.execSync(`node /workspaces/RFMain/apps/playground/esbuild.mjs ${playground}`, {
  cwd: '/workspaces/RFMain/apps/playground',
  stdio: 'inherit',
  env: process.env,
});

cp.spawn(
  process.argv[0],
  [`/workspaces/RFMain/.dist/playground/${playground}.cjs`, ...process.argv.slice(3)],
  {
    cwd: '/workspaces/RFMain',
    stdio: 'inherit',
    env: process.env,
  },
);

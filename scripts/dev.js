const { spawn } = require('child_process');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const yarnCommand = process.platform === 'win32' ? 'yarn.cmd' : 'yarn';

const children = [];

function runApp(name, args, delay = 0) {
  setTimeout(() => {
    const child = spawn(yarnCommand, args, {
      cwd: repoRoot,
      stdio: 'inherit',
      shell: true,
      env: process.env,
    });

    children.push(child);

    child.on('exit', (code) => {
      if (code && code !== 0) {
        process.exit(code);
      }
    });
  }, delay);
}

function stopAll(signal) {
  children.forEach((child) => {
    if (!child.killed) {
      child.kill(signal);
    }
  });
}

process.on('SIGINT', () => {
  stopAll('SIGINT');
  process.exit(0);
});

process.on('SIGTERM', () => {
  stopAll('SIGTERM');
  process.exit(0);
});

runApp('web', ['workspace', 'web', 'dev']);
runApp('dashboard', ['workspace', 'dashboard', 'dev'], 1500);
runApp('transactions', ['workspace', 'transactions', 'dev'], 1500);

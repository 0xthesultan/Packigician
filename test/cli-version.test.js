const test = require('node:test');
const assert = require('node:assert/strict');
const { spawnSync } = require('node:child_process');
const path = require('node:path');

const packageJson = require('../package.json');

test('packigician --version prints the package version', () => {
  const result = spawnSync(process.execPath, [
    path.join(__dirname, '..', 'bin', 'cli.js'),
    '--version',
  ], {
    encoding: 'utf8',
  });

  assert.equal(result.status, 0, result.stderr);
  assert.equal(result.stdout.trim(), packageJson.version);
});

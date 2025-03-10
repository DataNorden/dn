import { describe, expect, it } from 'vitest';
import cp from 'child_process';
import { isCI } from '@rfmain/types';

describe.skipIf(isCI())('hello template', () => {
  it('should run without error', () => {
    const stdout = cp.execSync('yarn play hello');
    const lines = stdout.toString();
    expect(lines).includes('hello world');
  });
});

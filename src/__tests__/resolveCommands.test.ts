import { describe, expect, test } from 'vitest';
import { resolveCommands } from '../config/resolveCommands';
import type { ConfigCommands, Options } from '../types';

describe('resolveCommands', () => {
  test('should convert to regular commands', () => {
    // Arrange
    const configCommands: ConfigCommands = [
      'echo A',
      { command: 'echo B', wait: 100 },
      ['echo C', { command: 'echo D', cwd: '/home/path2' }],
    ];

    const options: Options = {
      cwd: '/home/path',
    };

    // Act
    const commands = resolveCommands(configCommands, options);

    // Asset
    expect(commands).toEqual([
      { command: 'echo A', wait: 0, cwd: '/home/path' },
      { command: 'echo B', wait: 100, cwd: '/home/path' },
      [
        { command: 'echo C', wait: 0, cwd: '/home/path' },
        { command: 'echo D', wait: 0, cwd: '/home/path2' },
      ],
    ]);
  });
});

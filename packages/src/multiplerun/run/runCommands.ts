import { Command, Commands } from '../types';

export const runCommands = (runner: (command: Command) => void) => (
  commands: Commands,
) => {
  for (const row of commands) {
    if (Array.isArray(row)) {
      for (const command of row) {
        runner(command);
      }
    } else if ('command' in row && 'cwd' in row && 'wait' in row) {
      runner(row);
    }
  }
};

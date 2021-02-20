import { exec } from 'child_process';
import { Command, Commands } from '../types';
import { timeout } from '../utils/timeout';
import { runCommands } from './runCommands';

async function runner({ command, cwd, wait }: Command) {
  if (wait > 0) await timeout(wait);

  switch (process.platform) {
    case 'darwin':
      exec(
        `osascript -e 'tell application "Terminal" to do script "cd ${cwd}; ${command};"'`,
      );
      break;
    case 'win32':
      exec(`start cmd /k "cd ${cwd} && ${command}"`);
      break;
  }
}

export function runTerminal(commands: Commands) {
  runCommands(runner)(commands);
}

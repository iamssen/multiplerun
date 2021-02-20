import { exec } from 'child_process';
import { Command, Commands } from '../types';
import { timeout } from '../utils/timeout';
import { runCommands } from './runCommands';

async function runner({ command, cwd, wait }: Command) {
  if (wait > 0) await timeout(wait);
  const proc = exec(`cd ${cwd}; ${command} &`);
  proc.stdout?.pipe(process.stdout);
}

export function runMerge(commands: Commands) {
  runCommands(runner)(commands);
}

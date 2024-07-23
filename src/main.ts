import type { ConfigCommands, Options } from 'types';
import { resolveCommands } from './config/resolveCommands';
import { runITerm } from './run/runITerm';
import { runMerge } from './run/runMerge';
import { runTerminal } from './run/runTerminal';

export default function multiplerun(
  configCommands: ConfigCommands,
  options: Options = {},
) {
  const commands = resolveCommands(configCommands, options);

  if (process.env.CI) {
    runMerge(commands);
  } else if (process.platform === 'darwin') {
    try {
      runITerm(commands);
    } catch (error) {
      console.error(error);
      runTerminal(commands);
    }
  } else if (process.platform === 'win32') {
    runTerminal(commands);
  } else {
    console.log(`Sorry! Only macOS and Windows are supported yet!`);
    runMerge(commands);
  }
}
